'use client'

import Image from 'next/image'
import { useState } from 'react'

interface Contact {
  name: string
  phone: string
  telegram: string
  email: string
  role: string
  photo: string
}

const contacts: Contact[] = [
  {
    name: 'Кириллов Артём Кириллович',
    phone: '+7 (985) 853-13-67',
    telegram: '@rsstnt',
    email: 'kirillov.a@tradicia-k.ru',
    role: 'Тимлид',
    photo: '/artem_k.jpg'
  },
  {
    name: 'Шабуров Ян Сергеевич',
    phone: '+7 (985) 982-96-46',
    telegram: '@reflectitur',
    email: 'shaburov.y@tradicia-k.ru',
    role: 'Разработчик',
    photo: '/yan_s.jpg'
  }
]

export default function ContactsSection() {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const copyToClipboard = async (text: string, fieldId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(fieldId)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <section id="contacts" className="py-20 px-6 bg-black">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold text-center text-tradicia-white mb-16 fade-in">
          Контакты
        </h2>

        {/* Команда */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
          {contacts.map((contact, index) => (
            <div key={index} className="glass-effect rounded-xl p-4 hover-glow transition-all duration-[1200ms]">
              <div className="flex items-start space-x-6">
                {/* Фото */}
                <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={contact.photo}
                    alt={contact.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Информация */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-tradicia-white mb-1">
                    {contact.name}
                  </h3>
                  <p className="text-tradicia-blue font-medium mb-4">
                    {contact.role}
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 group">
                      <svg className="w-4 h-4 text-tradicia-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <a 
                        href={`tel:${contact.phone}`}
                        className="text-gray-300 hover:text-tradicia-blue transition-colors duration-300 text-sm"
                      >
                        {contact.phone}
                      </a>
                      <button
                        onClick={() => copyToClipboard(contact.phone, `phone-${index}`)}
                        className="p-1 text-gray-400 hover:text-tradicia-blue transition-all duration-300 opacity-0 group-hover:opacity-100"
                        title="Скопировать номер"
                      >
                        {copiedField === `phone-${index}` ? (
                          <span className="text-xs text-green-400">Скопировано</span>
                        ) : (
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center space-x-2 group">
                      <Image 
                        src="/tg2.png"
                        alt="Telegram"
                        width={19}
                        height={19}
                        className="w-5 h-5 flex-shrink-0 -ml-1"
                      />
                      <a 
                        href={`https://t.me/${contact.telegram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-tradicia-blue transition-colors duration-300 text-sm"
                      >
                        {contact.telegram}
                      </a>
                      <button
                        onClick={() => copyToClipboard(contact.telegram, `telegram-${index}`)}
                        className="p-1 text-gray-400 hover:text-tradicia-blue transition-all duration-300 opacity-0 group-hover:opacity-100"
                        title="Скопировать Telegram"
                      >
                        {copiedField === `telegram-${index}` ? (
                          <span className="text-xs text-green-400">Скопировано</span>
                        ) : (
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center space-x-2 group">
                      <svg className="w-4 h-4 text-tradicia-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a 
                        href={`mailto:${contact.email}`}
                        className="text-gray-300 hover:text-tradicia-blue transition-colors duration-300 text-sm"
                      >
                        {contact.email}
                      </a>
                      <button
                        onClick={() => copyToClipboard(contact.email, `email-${index}`)}
                        className="p-1 text-gray-400 hover:text-tradicia-blue transition-all duration-300 opacity-0 group-hover:opacity-100"
                        title="Скопировать email"
                      >
                        {copiedField === `email-${index}` ? (
                          <span className="text-xs text-green-400">Скопировано</span>
                        ) : (
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Социальные сети */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-tradicia-white mb-8">
            Следите за нашими новостями
          </h3>
          
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
            <a 
              href="https://t.me/tradicia_intelligence_news"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-effect rounded-2xl p-6 hover-glow transition-all duration-[1200ms] flex items-center space-x-3 w-full max-w-sm md:w-auto"
            >
              <Image 
                src="/tg_new.png"
                alt="Telegram"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <div className="text-left">
                <p className="text-tradicia-white font-semibold">Telegram канал</p>
                <p className="text-gray-400 text-sm">@tradicia_intelligence_news</p>
              </div>
            </a>

            <a 
              href="https://www.youtube.com/channel/tradicia-intelligence"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-effect rounded-2xl p-6 hover-glow transition-all duration-[1200ms] flex items-center space-x-3 w-full max-w-sm md:w-auto"
            >
              <Image 
                src="/yt_new.png"
                alt="YouTube"
                width={32}
                height={32}
                className="w-8 h-8 object-contain flex-shrink-0"
              />
              <div className="text-left">
                <p className="text-tradicia-white font-semibold">YouTube</p>
                <p className="text-gray-400 text-sm">Наш канал</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
} 