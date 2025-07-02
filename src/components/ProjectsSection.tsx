'use client'

import { useState, useEffect } from 'react'

interface Project {
  id: number
  title: string
  description: string
  details: string
  icon: string
}

const localProjects: Project[] = [
  {
    id: 1,
    title: 'CRM-агент',
    description: 'Автоматический перевод звонков в текст, саммари диалога, вычленение 13 параметров.',
    details: 'Автоматический перевод звонков в текст, саммари диалога, вычленение 13 параметров (потребность, бюджет, базовая машина и т.д.) и оценка качества обслуживания клиента.',
    icon: '📞'
  },
  {
    id: 2,
    title: 'ИИ-ассистент сотрудников',
    description: 'Знает всё о группе компаний, видит и может редактировать ваши задачи.',
    details: 'Знает всё о группе компаний, видит и может редактировать ваши задачи, календарь и письма',
    icon: '👥'
  },
  {
    id: 3,
    title: 'ИИ-ассистент клиентов',
    description: 'Знает всё о нашей компании и её продукции, поможет подобрать оборудование.',
    details: 'Знает всё о нашей компании и её продукции, поможет подобрать оборудование и расскажет все нюансы эксплуатации.',
    icon: '🤖'
  },
  {
    id: 4,
    title: 'Прогнозирование спроса',
    description: 'Помогает поддерживать необходимый запас изделий на складе.',
    details: 'Помогает поддерживать необходимый запас изделий на складе и регулировать цены.',
    icon: '📈'
  }
]

export default function ProjectsSection() {
  const [projects] = useState<Project[]>(localProjects)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const nextProject = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev + 1) % projects.length)
    setTimeout(() => {
      setIsTransitioning(false)
    }, 700)
  }

  const prevProject = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
    setTimeout(() => {
      setIsTransitioning(false)
    }, 700)
  }

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
  }

  const closeModal = () => {
    setSelectedProject(null)
  }

  return (
    <section id="projects" className="py-20 px-6 bg-black">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-tradicia-white mb-4 fade-in">
            Проекты
          </h2>
          <p className="text-tradicia-blue text-sm font-medium">
            Этот раздел находится в бета-версии. Поэтому, мы опубликовали здесь наши будущие проекты.
          </p>
        </div>

        {/* Карусель */}
        <div className="relative max-w-5xl mx-auto">
          {/* Левая стрелка */}
          <button 
            onClick={prevProject}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 text-tradicia-blue hover:bg-tradicia-blue hover:text-white rounded-full transition-all duration-300 z-10"
            disabled={isTransitioning}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Правая стрелка */}
          <button 
            onClick={nextProject}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-tradicia-blue hover:bg-tradicia-blue hover:text-white rounded-full transition-all duration-300 z-10"
            disabled={isTransitioning}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Контейнер для карусели */}
          <div className="overflow-hidden px-12">
            <div 
              className={`flex transition-transform duration-700 ease-in-out`}
              style={{ 
                transform: `translateX(-${currentIndex * 100}%)`,
                willChange: 'transform'
              }}
            >
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div 
                    className="glass-effect rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-tradicia-blue/20 h-full"
                    onClick={() => handleProjectClick(project)}
                  >
                    <div className="text-center h-full flex flex-col justify-center">
                      <div className="text-4xl mb-4">{project.icon}</div>
                      <h4 className="text-xl font-semibold text-tradicia-white mb-3">
                        {project.title}
                      </h4>
                      <p className="text-gray-300 leading-relaxed mb-4 text-sm">
                        {project.description}
                      </p>
                      <button className="text-tradicia-blue hover:text-tradicia-white transition-colors duration-300 text-sm">
                        Подробнее →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Индикаторы */}
          <div className="flex justify-center space-x-2 mt-6">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isTransitioning && index !== currentIndex) {
                    setIsTransitioning(true)
                    setCurrentIndex(index)
                    setTimeout(() => {
                      setIsTransitioning(false)
                    }, 700)
                  }
                }}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  index === currentIndex ? 'bg-tradicia-blue' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Модальное окно */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="glass-effect rounded-2xl p-8 max-w-2xl w-full max-h-96 overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-semibold text-tradicia-white">
                  {selectedProject.title}
                </h3>
                <button 
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">{selectedProject.icon}</div>
                <p className="text-gray-300 leading-relaxed">
                  {selectedProject.details}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
} 