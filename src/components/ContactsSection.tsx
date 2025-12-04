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
  website?: string
}

const contacts: Contact[] = [
  {
    name: 'Кириллов Артём',
    phone: '+7 (985) 853-13-67',
    telegram: '@rsstnt',
    email: 'kirillov.a@tradicia-k.ru',
    role: 'Тимлид',
    photo: '/kirillov_a_studio_black.png',
    website: 'https://www.kirillov-artem.ru/'
  },
  {
    name: 'Шабуров Ян',
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
        <div className="flex flex-col justify-center items-center space-y-6 mb-12 max-w-4xl mx-auto">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="glass-effect rounded-2xl p-5 hover-glow transition-all duration-[1200ms] w-full max-w-[630px] md:max-w-[615px] mx-auto md:mx-0"
            >
              <div className="flex items-stretch gap-6 h-full">
                {/* Фото */}
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex-shrink-0 overflow-hidden rounded-2xl">
                  <Image
                    src={contact.photo}
                    alt={contact.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 640px) 192px, 160px"
                    quality={95}
                  />
                </div>

                {/* Информация */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-tradicia-white mb-1">
                    {contact.website ? (
                      <a 
                        href={contact.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-tradicia-blue transition-colors duration-300"
                      >
                        {contact.name}
                      </a>
                    ) : (
                      contact.name
                    )}
                  </h3>
                  <p className="text-tradicia-blue text-sm font-medium mb-3">
                    {contact.role}
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 group">
                      <svg className="w-5 h-5 text-tradicia-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center gap-2 group">
                      <Image 
                        src="/tg.png"
                        alt="Telegram"
                        width={20}
                        height={20}
                        className="w-5 h-5 object-contain flex-shrink-0"
                        quality={100}
                        unoptimized
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
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center gap-2 group">
                      <svg className="w-5 h-5 text-tradicia-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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