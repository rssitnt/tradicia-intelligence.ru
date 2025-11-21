'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// n8n webhook для обработки сообщений чата через Gemini
const CHAT_BACKEND_URL = 'https://n8n-api.tradicia-k.ru/webhook/03e8b98b-893f-413b-aa3c-94782b5a02db';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Инициализация: загрузка истории и conversation_id из localStorage
  useEffect(() => {
    const storedMessages = localStorage.getItem('chatMessages');
    const storedConversationId = localStorage.getItem('conversationId');

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

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

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
      const requestBody = {
        conversation_id: conversationId,
        messages: updatedMessages,
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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
  };

  return (
    <>
      {/* Плавающая кнопка */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 left-6 z-50 w-20 h-20 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 ${
          isOpen ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-transparent hover:scale-105'
        }`}
        aria-label="Открыть чат"
      >
        {isOpen ? (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <Image 
            src="/aichat.png"
            alt="Чатбот"
            width={96}
            height={96}
            className="w-20 h-20 object-contain"
            quality={100}
            priority
            unoptimized
          />
        )}
      </button>

      {/* Панель чата */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 z-50 w-[calc(100%-3rem)] md:w-96 h-[400px] max-h-[70vh] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden">
          {/* Заголовок */}
          <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
            <h3 className="font-semibold text-lg">ИИ-консультант</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={handleClearHistory}
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
                className={`flex w-full ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-800 border border-gray-200'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex w-full justify-start">
                <div className="max-w-[80%] rounded-lg px-4 py-2 bg-white text-gray-800 border border-gray-200">
                  <p className="text-sm text-gray-500">Ассистент печатает...</p>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Поле ввода */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder=""
                disabled={isLoading}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 text-gray-800"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
    </>
  );
}


