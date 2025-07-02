'use client'

import { useState } from 'react'

interface Announcement {
  id: string
  title: string
  description: string
  poster: string
  date: string
}

// Здесь можно управлять показом анонса - если null, то секция не отображается
const currentAnnouncement: Announcement | null = null
// Пример активного анонса:
// const currentAnnouncement: Announcement | null = {
//   id: '1',
//   title: 'Новое событие',
//   description: 'Описание предстоящего события',
//   poster: '/announcement-poster.jpg',
//   date: '15 марта 2025'
// }

export default function AnnouncementSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (!currentAnnouncement) {
    return null // Не показываем секцию, если нет анонса
  }

  return (
    <section id="announcement" className="py-20 px-6 bg-gradient-to-r from-tradicia-dark to-tradicia-black">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <span className="inline-block bg-tradicia-blue text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 animate-pulse">
            АНОНС!
          </span>
          <h2 className="text-4xl font-bold text-tradicia-white mb-4 fade-in">
            {currentAnnouncement.title}
          </h2>
          <p className="text-tradicia-blue text-lg font-medium">
            {currentAnnouncement.date}
          </p>
        </div>

        <div className="relative group">
          <div 
            className="glass-effect rounded-2xl overflow-hidden hover-glow transition-all duration-500 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            {/* Постер */}
            <div className="relative h-96 bg-gradient-to-br from-tradicia-blue to-tradicia-dark flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4">🎯</div>
                <p className="text-tradicia-white text-xl font-semibold">
                  Постер события
                </p>
                <p className="text-gray-300 mt-2">
                  Нажмите для просмотра деталей
                </p>
              </div>
            </div>

            <div className="p-6">
              <p className="text-gray-300 leading-relaxed">
                {currentAnnouncement.description}
              </p>
            </div>
          </div>
        </div>

        {/* Модальное окно */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="glass-effect rounded-2xl p-8 max-w-4xl w-full max-h-96 overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-semibold text-tradicia-white">
                  {currentAnnouncement.title}
                </h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="text-center">
                <p className="text-tradicia-blue font-medium mb-4">
                  {currentAnnouncement.date}
                </p>
                <p className="text-gray-300 leading-relaxed">
                  {currentAnnouncement.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
} 