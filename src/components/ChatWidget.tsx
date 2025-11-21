'use client';

import { useState, useEffect, useRef } from 'react';

// n8n webhook для обработки сообщений чата через Gemini
const CHAT_BACKEND_URL = 'https://n8n-api.tradicia-k.ru/webhook-test/03e8b98b-893f-413b-aa3c-94782b5a02db';

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

  return (
    <>
      {/* Плавающая кнопка */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200"
        aria-label="Открыть чат"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Панель чата */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 z-50 w-[calc(100%-3rem)] md:w-96 h-[500px] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden">
          {/* Заголовок */}
          <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
            <h3 className="font-semibold text-lg">Онлайн-консультант</h3>
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

          {/* Область сообщений */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-8">
                <p>Здравствуйте! Чем могу помочь?</p>
              </div>
            )}
            
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
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
              <div className="flex justify-start">
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


