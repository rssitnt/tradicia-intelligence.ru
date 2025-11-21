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
    photo: '/kirillov_a.png'
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
        <div className="flex flex-col justify-center items-center space-y-4 mb-12 max-w-4xl mx-auto">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="glass-effect rounded-xl p-3 hover-glow transition-all duration-[1200ms] w-full max-w-[420px] md:max-w-[410px] mx-auto md:mx-0"
            >
              <div className="flex items-stretch gap-4 h-full">
                {/* Фото */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={contact.photo}
                    alt={contact.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 640px) 128px, 112px"
                    quality={95}
                  />
                </div>

                {/* Информация */}
                <div className="flex-1 text-[0.67rem]">
                  <h3 className="text-[0.75rem] font-semibold text-tradicia-white mb-1">
                    {contact.name}
                  </h3>
                  <p className="text-tradicia-blue text-[0.67rem] font-medium mb-2">
                    {contact.role}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 group">
                      <svg className="w-4 h-4 text-tradicia-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <a 
                        href={`tel:${contact.phone}`}
                        className="text-gray-300 hover:text-tradicia-blue transition-colors duration-300 text-[0.58rem]"
                      >
                        {contact.phone}
                      </a>
                      <button
                        onClick={() => copyToClipboard(contact.phone, `phone-${index}`)}
                        className="p-1 text-gray-400 hover:text-tradicia-blue transition-all duration-300 opacity-0 group-hover:opacity-100"
                        title="Скопировать номер"
                      >
                        {copiedField === `phone-${index}` ? (
                          <span className="text-[0.5rem] text-green-400">Скопировано</span>
                        ) : (
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 group">
                      <div className="flex items-center justify-center w-4 h-4 flex-shrink-0">
                        <Image 
                          src="/tg.png"
                          alt="Telegram"
                          width={14}
                          height={14}
                          className="w-3.5 h-3.5 object-contain"
                        />
                      </div>
                      <a 
                        href={`https://t.me/${contact.telegram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-tradicia-blue transition-colors duration-300 text-[0.58rem]"
                      >
                        {contact.telegram}
                      </a>
                      <button
                        onClick={() => copyToClipboard(contact.telegram, `telegram-${index}`)}
                        className="p-1 text-gray-400 hover:text-tradicia-blue transition-all duration-300 opacity-0 group-hover:opacity-100"
                        title="Скопировать Telegram"
                      >
                        {copiedField === `telegram-${index}` ? (
                          <span className="text-[0.5rem] text-green-400">Скопировано</span>
                        ) : (
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 group">
                      <svg className="w-4 h-4 text-tradicia-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a 
                        href={`mailto:${contact.email}`}
                        className="text-gray-300 hover:text-tradicia-blue transition-colors duration-300 text-[0.58rem]"
                      >
                        {contact.email}
                      </a>
                      <button
                        onClick={() => copyToClipboard(contact.email, `email-${index}`)}
                        className="p-1 text-gray-400 hover:text-tradicia-blue transition-all duration-300 opacity-0 group-hover:opacity-100"
                        title="Скопировать email"
                      >
                        {copiedField === `email-${index}` ? (
                          <span className="text-[0.5rem] text-green-400">Скопировано</span>
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

      </div>
    </section>
  )
} 