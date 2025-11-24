'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// n8n webhook для обработки сообщений чата через Gemini
const CHAT_BACKEND_URL = 'https://n8n-api.tradicia-k.ru/webhook/03e8b98b-893f-413b-aa3c-94782b5a02db';
// n8n webhook для отправки обратной связи
const FEEDBACK_WEBHOOK_URL = 'https://n8n-api.tradicia-k.ru/webhook-test/tradiciarevenuebot';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
  rating?: 'positive' | 'negative' | null;
  feedback?: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string>('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showFeedbackFor, setShowFeedbackFor] = useState<number | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [isFeedbackRecording, setIsFeedbackRecording] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [hasPhone, setHasPhone] = useState(false);
  const [pendingMessage, setPendingMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const feedbackRecognitionRef = useRef<any>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Инициализация: загрузка истории и conversation_id из localStorage
  useEffect(() => {
    const storedMessages = localStorage.getItem('chatMessages');
    const storedConversationId = localStorage.getItem('conversationId');
    const storedPhone = localStorage.getItem('userPhone');

    if (storedMessages) {
      try {
        setMessages(JSON.parse(storedMessages));
      } catch (e) {
        console.error('Ошибка загрузки истории чата:', e);
      }
    }

    if (storedConversationId) {
      setConversationId(storedConversationId);
    } else {
      // Генерация нового conversation_id
      const newId = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setConversationId(newId);
      localStorage.setItem('conversationId', newId);
    }

    // Проверка сохраненного телефона
    if (storedPhone) {
      setHasPhone(true);
      setPhoneNumber(storedPhone);
    }
  }, []);

  // Сохранение истории при изменении
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  // Автопрокрутка к последнему сообщению
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Инициализация Web Speech API
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        // Распознавание для основного поля ввода
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'ru-RU';

        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputValue(transcript);
          setIsRecording(false);
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error('Ошибка распознавания речи:', event.error);
          setIsRecording(false);
        };

        recognitionRef.current.onend = () => {
          setIsRecording(false);
        };

        // Распознавание для поля обратной связи
        feedbackRecognitionRef.current = new SpeechRecognition();
        feedbackRecognitionRef.current.continuous = false;
        feedbackRecognitionRef.current.interimResults = false;
        feedbackRecognitionRef.current.lang = 'ru-RU';

        feedbackRecognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setFeedbackText(transcript);
          setIsFeedbackRecording(false);
        };

        feedbackRecognitionRef.current.onerror = (event: any) => {
          console.error('Ошибка распознавания речи для обратной связи:', event.error);
          setIsFeedbackRecording(false);
        };

        feedbackRecognitionRef.current.onend = () => {
          setIsFeedbackRecording(false);
        };
      }
    }
  }, []);

  // Автоматическое изменение высоты textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [inputValue]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    // Проверяем, есть ли телефон пользователя
    if (!hasPhone) {
      setPendingMessage(inputValue.trim());
      setShowPhoneModal(true);
      return;
    }

    const userMessage: Message = {
      role: 'user',
      content: inputValue.trim(),
    };

    // Добавляем сообщение пользователя
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const requestBody: any = {
        conversation_id: conversationId,
        messages: updatedMessages,
      };
      
      // Добавляем телефон, если он есть
      if (hasPhone && phoneNumber) {
        requestBody.phone = phoneNumber;
      }
      
      console.log('Отправка запроса:', requestBody);

      const response = await fetch(CHAT_BACKEND_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('Статус ответа:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Ошибка ответа:', errorText);
        throw new Error(`Ошибка сети: ${response.status}`);
      }

      const responseText = await response.text();
      console.log('Ответ от сервера (текст):', responseText);
      
      let content = '';
      
      // Пробуем распарсить как JSON
      try {
        const data = JSON.parse(responseText);
        console.log('Ответ от сервера (JSON):', data);
        content = data.output || data.reply || data.response || data.message || '';
      } catch (e) {
        // Если не JSON, используем сам текст как ответ
        console.log('Ответ пришёл как обычный текст, используем его напрямую');
        content = responseText;
      }
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: content || 'Извините, не удалось получить ответ.',
      };

      setMessages([...updatedMessages, assistantMessage]);
    } catch (error) {
      console.error('Ошибка отправки сообщения:', error);
      
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Не удалось получить ответ, попробуйте ещё раз.',
      };

      setMessages([...updatedMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearHistory = () => {
    // Очищаем историю
    setMessages([]);
    localStorage.removeItem('chatMessages');
    
    // Генерируем новый conversation_id
    const newId = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setConversationId(newId);
    localStorage.setItem('conversationId', newId);
    
    console.log('История чата очищена');
    setShowClearConfirm(false);
  };

  const handleClearClick = () => {
    setShowClearConfirm(true);
  };

  const handleMicrophoneClick = () => {
    if (!recognitionRef.current) {
      alert('Распознавание речи не поддерживается в вашем браузере');
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      setIsRecording(true);
      recognitionRef.current.start();
    }
  };

  const handleFeedbackMicrophoneClick = () => {
    if (!feedbackRecognitionRef.current) {
      alert('Распознавание речи не поддерживается в вашем браузере');
      return;
    }

    if (isFeedbackRecording) {
      feedbackRecognitionRef.current.stop();
      setIsFeedbackRecording(false);
    } else {
      setIsFeedbackRecording(true);
      feedbackRecognitionRef.current.start();
    }
  };

  const handleRating = (messageIndex: number, rating: 'positive' | 'negative') => {
    const updatedMessages = [...messages];
    // Если текущая оценка совпадает с новой, убираем оценку (toggle)
    if (updatedMessages[messageIndex].rating === rating) {
      updatedMessages[messageIndex].rating = null;
      setShowFeedbackFor(null);
      setFeedbackText('');
      // Останавливаем запись, если она была активна
      if (isFeedbackRecording && feedbackRecognitionRef.current) {
        feedbackRecognitionRef.current.stop();
        setIsFeedbackRecording(false);
      }
    } else {
      updatedMessages[messageIndex].rating = rating;
      // Показываем поле обратной связи только для негативной оценки
      if (rating === 'negative') {
        setShowFeedbackFor(messageIndex);
        setFeedbackText(updatedMessages[messageIndex].feedback || '');
      } else {
        setShowFeedbackFor(null);
        setFeedbackText('');
        // Останавливаем запись, если она была активна
        if (isFeedbackRecording && feedbackRecognitionRef.current) {
          feedbackRecognitionRef.current.stop();
          setIsFeedbackRecording(false);
        }
      }
    }
    setMessages(updatedMessages);
    localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
  };

  const handleFeedbackSubmit = async (messageIndex: number) => {
    // Останавливаем запись, если она была активна
    if (isFeedbackRecording && feedbackRecognitionRef.current) {
      feedbackRecognitionRef.current.stop();
      setIsFeedbackRecording(false);
    }

    const updatedMessages = [...messages];
    updatedMessages[messageIndex].feedback = feedbackText;
    setMessages(updatedMessages);
    localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));

    // Отправка обратной связи на webhook
    try {
      const feedbackData = {
        conversation_id: conversationId,
        timestamp: new Date().toISOString(),
        assistant_message: updatedMessages[messageIndex].content,
        feedback: feedbackText,
        rating: 'negative'
      };

      console.log('Отправка обратной связи на webhook:', feedbackData);

      await fetch(FEEDBACK_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      console.log('Обратная связь успешно отправлена');
    } catch (error) {
      console.error('Ошибка при отправке обратной связи:', error);
      // Не показываем ошибку пользователю, просто логируем
    }

    setShowFeedbackFor(null);
    setFeedbackText('');
  };

  const handlePhoneSubmit = async () => {
    // Простая валидация телефона (можно улучшить)
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      alert('Пожалуйста, введите корректный номер телефона');
      return;
    }

    // Сохраняем телефон
    localStorage.setItem('userPhone', phoneNumber);
    setHasPhone(true);
    setShowPhoneModal(false);

    // Отправляем ожидающее сообщение
    if (pendingMessage) {
      const userMessage: Message = {
        role: 'user',
        content: pendingMessage,
      };

      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setInputValue('');
      setPendingMessage('');
      setIsLoading(true);

      try {
        const requestBody = {
          conversation_id: conversationId,
          messages: updatedMessages,
          phone: phoneNumber, // Добавляем телефон в запрос
        };
        
        console.log('Отправка запроса:', requestBody);

        const response = await fetch(CHAT_BACKEND_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        console.log('Статус ответа:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Ошибка ответа:', errorText);
          throw new Error(`Ошибка сети: ${response.status}`);
        }

        const responseText = await response.text();
        console.log('Ответ от сервера (текст):', responseText);
        
        let content = '';
        
        try {
          const data = JSON.parse(responseText);
          console.log('Ответ от сервера (JSON):', data);
          content = data.output || data.reply || data.response || data.message || '';
        } catch (e) {
          console.log('Ответ пришёл как обычный текст, используем его напрямую');
          content = responseText;
        }
        
        const assistantMessage: Message = {
          role: 'assistant',
          content: content || 'Извините, не удалось получить ответ.',
        };

        setMessages([...updatedMessages, assistantMessage]);
      } catch (error) {
        console.error('Ошибка отправки сообщения:', error);
        
        const errorMessage: Message = {
          role: 'assistant',
          content: 'Не удалось получить ответ, попробуйте ещё раз.',
        };

        setMessages([...updatedMessages, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handlePhoneCancel = () => {
    setShowPhoneModal(false);
    setPendingMessage('');
    setPhoneNumber('');
  };

  return (
    <>
      {/* Плавающая кнопка */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 left-5 z-[2147483647] w-16 h-16 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 bg-transparent hover:scale-105"
          aria-label="Открыть чат"
        >
          <Image 
            src="/aichat.png"
            alt="Чатбот"
            width={64}
            height={64}
            className="w-16 h-16 object-contain"
            quality={100}
            priority
            unoptimized
          />
        </button>
      )}

      {/* Панель чата */}
      {isOpen && (
        <div className="fixed bottom-5 left-5 right-24 md:right-auto z-[2147483647] md:w-96 h-[500px] max-h-[calc(100vh-3rem)] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden">
          {/* Заголовок */}
          <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
            <h3 className="font-semibold text-lg">ИИ-консультант</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={handleClearClick}
                className="hover:bg-blue-700 rounded p-1 transition-colors"
                aria-label="Очистить историю"
                title="Очистить историю"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-blue-700 rounded p-1 transition-colors"
                aria-label="Закрыть чат"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Область сообщений */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-gray-400">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-8">
                <p>Здравствуйте! Чем могу помочь?</p>
              </div>
            )}
            
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex flex-col w-full ${message.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-800 border border-gray-200'
                  }`}
                >
                  {message.role === 'user' ? (
                    <p className="text-sm whitespace-pre-wrap break-words text-right">{message.content}</p>
                  ) : (
                    <div className="text-sm markdown-content text-left">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({node, ...props}) => <p className="my-1" {...props} />,
                          strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                          em: ({node, ...props}) => <em className="italic" {...props} />,
                          ul: ({node, ...props}) => <ul className="list-disc ml-4 my-1" {...props} />,
                          ol: ({node, ...props}) => <ol className="list-decimal ml-4 my-1" {...props} />,
                          li: ({node, ...props}) => <li className="my-0" {...props} />,
                          a: ({node, ...props}) => <a className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                          code: ({node, inline, ...props}: any) => 
                            inline 
                              ? <code className="bg-gray-100 px-1 py-0.5 rounded text-xs" {...props} />
                              : <code className="block bg-gray-100 p-2 rounded my-1 text-xs overflow-x-auto" {...props} />,
                          h1: ({node, ...props}) => <h1 className="text-lg font-bold my-2" {...props} />,
                          h2: ({node, ...props}) => <h2 className="text-base font-bold my-2" {...props} />,
                          h3: ({node, ...props}) => <h3 className="text-sm font-bold my-2" {...props} />,
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
                
                {/* Кнопки оценки для сообщений ассистента */}
                {message.role === 'assistant' && (
                  <>
                    <div className="flex gap-1 mt-1 ml-2">
                      <button
                        onClick={() => handleRating(index, 'positive')}
                        className={`p-1 rounded transition-all ${
                          message.rating === 'positive'
                            ? 'bg-green-100 text-green-600'
                            : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                        }`}
                        aria-label="Полезный ответ"
                        title="Полезный ответ"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleRating(index, 'negative')}
                        className={`p-1 rounded transition-all ${
                          message.rating === 'negative'
                            ? 'bg-red-100 text-red-600'
                            : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                        }`}
                        aria-label="Бесполезный ответ"
                        title="Бесполезный ответ"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Поле обратной связи для негативной оценки */}
                    {message.rating === 'negative' && showFeedbackFor === index && (
                      <div className="mt-2 ml-2 max-w-[80%]">
                        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                          <p className="text-xs text-gray-600 mb-2">Расскажите подробнее:</p>
                          <textarea
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                            placeholder={isFeedbackRecording ? "Слушаю..." : "Что именно вам не понравилось?"}
                            disabled={isFeedbackRecording}
                            className="w-full px-2 py-1.5 text-xs text-gray-800 placeholder-gray-400 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none disabled:bg-gray-100"
                            rows={3}
                          />
                          <div className="flex gap-2 mt-2 justify-between items-center">
                            <button
                              onClick={() => {
                                setShowFeedbackFor(null);
                                setFeedbackText('');
                                // Останавливаем запись, если она была активна
                                if (isFeedbackRecording && feedbackRecognitionRef.current) {
                                  feedbackRecognitionRef.current.stop();
                                  setIsFeedbackRecording(false);
                                }
                              }}
                              className="px-3 py-1 text-xs text-gray-600 hover:text-gray-800 transition-colors"
                            >
                              Отмена
                            </button>
                            <div className="flex gap-1.5">
                              <button
                                onClick={handleFeedbackMicrophoneClick}
                                className={`p-1.5 rounded transition-all ${
                                  isFeedbackRecording 
                                    ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse' 
                                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                                }`}
                                aria-label="Голосовой ввод обратной связи"
                                title="Голосовой ввод"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleFeedbackSubmit(index)}
                                disabled={!feedbackText.trim()}
                                className="p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label="Отправить обратную связь"
                                title="Отправить"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Отображение сохранённой обратной связи */}
                    {message.rating === 'negative' && message.feedback && showFeedbackFor !== index && (
                      <div className="mt-2 ml-2 max-w-[80%]">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-2">
                          <p className="text-xs text-gray-500 mb-1">Ваш отзыв:</p>
                          <p className="text-xs text-gray-700">{message.feedback}</p>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex w-full justify-start">
                <div className="max-w-[80%] rounded-lg px-4 py-2 bg-white text-gray-800 border border-gray-200">
                  <p className="text-sm text-gray-500 text-left">Ассистент печатает...</p>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Поле ввода */}
          <div className="p-3 sm:p-4 bg-white border-t border-gray-200">
            <div className="flex gap-1.5 sm:gap-2 items-end">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isRecording ? "Слушаю..." : ""}
                disabled={isLoading || isRecording}
                rows={1}
                className="flex-1 min-w-0 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 text-gray-800 text-sm resize-none overflow-hidden leading-tight"
                style={{ minHeight: '40px', maxHeight: '150px' }}
              />
              <button
                onClick={handleMicrophoneClick}
                disabled={isLoading}
                className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
                  isRecording 
                    ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                aria-label="Голосовой ввод"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button>
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Отправить сообщение"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно подтверждения очистки */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-[2147483647] flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Подтверждение
            </h3>
            <p className="text-gray-600 mb-6">
              Вы точно хотите начать чат с нуля?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={handleClearHistory}
                className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Очистить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно запроса телефона */}
      {showPhoneModal && (
        <div className="fixed inset-0 z-[2147483648] flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Введите ваш телефон
            </h3>
            <p className="text-gray-600 mb-4 text-sm">
              Для продолжения работы с ИИ-консультантом, пожалуйста, укажите ваш номер телефона
            </p>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+7 (999) 999-99-99"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 mb-4"
              autoFocus
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handlePhoneSubmit();
                }
              }}
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={handlePhoneCancel}
                className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={handlePhoneSubmit}
                className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                Отправить
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


