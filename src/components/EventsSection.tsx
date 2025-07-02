'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Event {
  id: number
  title: string
  date: string
  description: string
  isPast: boolean
  image: string
}

const localEvents: Event[] = [
  {
    id: 2,
    title: 'ИИ - корпоративный стандарт Традиции',
    date: '3 июля, 16:30',
    description: 'Внедрение искусственного интеллекта как корпоративного стандарта.',
    isPast: false,
    image: '/new1.png'
  }
]

const localPastEvents: Event[] = [
  {
    id: 3,
    title: 'Запуск проекта Tradicia Intelligence',
    date: '10 января 2025',
    description: 'Рассмотрение возможных направлений развития ИИ в компании.',
    isPast: true,
    image: '/bg.png'
  }
]

export default function EventsSection() {
  const [events] = useState<Event[]>(localEvents)
  const [pastEvents] = useState<Event[]>(localPastEvents)
  const [currentEventIndex, setCurrentEventIndex] = useState(0)
  const [currentPastEventIndex, setCurrentPastEventIndex] = useState(0)
  const [showPastEvents, setShowPastEvents] = useState(false)

  const nextEvent = () => {
    setCurrentEventIndex((prev) => (prev + 1) % events.length)
  }

  const prevEvent = () => {
    setCurrentEventIndex((prev) => (prev - 1 + events.length) % events.length)
  }

  const nextPastEvent = () => {
    setCurrentPastEventIndex((prev) => (prev + 1) % pastEvents.length)
  }

  const prevPastEvent = () => {
    setCurrentPastEventIndex((prev) => (prev - 1 + pastEvents.length) % pastEvents.length)
  }

  return (
    <section id="events" className="py-20 px-6 bg-black">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold text-center text-tradicia-white mb-16 fade-in">
          События
        </h2>

        {/* Предстоящие события */}
        <div className="mb-12">
          <div className="relative max-w-xl mx-auto">
            <div className="glass-effect rounded-2xl overflow-hidden shadow-lg shadow-tradicia-blue/20 relative">
              <div className="flex items-center justify-between p-4 absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent">
                <button 
                  onClick={prevEvent}
                  className="p-2 text-white hover:bg-tradicia-blue hover:text-white rounded-full transition-all duration-300"
                  disabled={events.length <= 1}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <span className="text-white font-semibold">
                  {currentEventIndex + 1} из {events.length}
                </span>
                
                <button 
                  onClick={nextEvent}
                  className="p-2 text-white hover:bg-tradicia-blue hover:text-white rounded-full transition-all duration-300"
                  disabled={events.length <= 1}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              {/* Фото события в полном размере */}
              <div className="relative">
                <Image
                  src={events[currentEventIndex]?.image || "/bg.png"}
                  alt={events[currentEventIndex]?.title || "Событие"}
                  width={600}
                  height={400}
                  className="w-full h-auto object-contain"
                />
                
                {/* Текстовый блок внизу */}
                <div className="p-6 bg-gradient-to-t from-black/90 to-transparent absolute bottom-0 left-0 right-0">
                  <h4 className="text-xl font-semibold text-white mb-2 text-left">
                    {events[currentEventIndex]?.title}
                  </h4>
                  <p className="text-tradicia-blue font-medium mb-2 text-left">
                    {events[currentEventIndex]?.date}
                  </p>
                  <p className="text-gray-300 leading-relaxed text-left">
                    {events[currentEventIndex]?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Прошедшие события */}
        <div>
          <button
            onClick={() => setShowPastEvents(!showPastEvents)}
            className="flex items-center justify-center mx-auto mb-8 text-gray-400 hover:text-tradicia-white transition-colors duration-300"
          >
            <svg 
              className={`w-4 h-4 mr-2 transition-transform duration-300 ${showPastEvents ? 'rotate-90' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Прошедшие события
          </button>

          {showPastEvents && (
            <div className="fade-in">
              <div className="relative max-w-xl mx-auto">
                <div className="glass-effect rounded-2xl overflow-hidden opacity-75 relative">
                  <div className="flex items-center justify-between p-4 absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent">
                    <button 
                      onClick={prevPastEvent}
                      className="p-2 text-gray-300 hover:bg-gray-600 hover:text-white rounded-full transition-all duration-300"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    <span className="text-gray-300 font-semibold">
                      {currentPastEventIndex + 1} из {pastEvents.length}
                    </span>
                    
                    <button 
                      onClick={nextPastEvent}
                      className="p-2 text-gray-300 hover:bg-gray-600 hover:text-white rounded-full transition-all duration-300"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Фото прошедшего события в полном размере */}
                  <div className="relative">
                    <Image
                      src={pastEvents[currentPastEventIndex]?.image || "/bg.png"}
                      alt={pastEvents[currentPastEventIndex]?.title || "Прошедшее событие"}
                      width={600}
                      height={400}
                      className="w-full h-auto object-contain grayscale"
                    />
                    
                    {/* Текстовый блок внизу */}
                    <div className="p-6 bg-gradient-to-t from-black/90 to-transparent absolute bottom-0 left-0 right-0">
                      <h4 className="text-xl font-semibold text-gray-300 mb-2 text-left">
                        {pastEvents[currentPastEventIndex]?.title}
                      </h4>
                      <p className="text-gray-400 font-medium mb-2 text-left">
                        {pastEvents[currentPastEventIndex]?.date}
                      </p>
                      <p className="text-gray-400 leading-relaxed opacity-80 text-left">
                        {pastEvents[currentPastEventIndex]?.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
} 