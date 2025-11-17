'use client'

import { useEffect, useMemo, useState } from 'react'

interface ProjectMetric {
  label: string
  value: string
}

interface Project {
  id: number
  title: string
  subtitle: string
  description: string
  details: string
  icon: string
  tags: string[]
  metrics?: ProjectMetric[]
  result?: string
}

const projectsData: Project[] = [
  {
    id: 1,
    title: 'CRM-агент',
    subtitle: 'Виртуальный помощник для продаж',
    description:
      'Автоматизировали обработку звонков: распознаём речь, составляем саммари и предлагаем менеджеру следующие действия.',
    details:
      'Интегрированный CRM-агент переводит звонки в текст, выделяет 13 бизнес-показателей, оценивает эмоциональный тон и предлагает критические действия по удержанию клиента. Архитектура построена на пайплайне из ASR, LLM и векторного поиска — обучение производилось на реальных диалогах заказчика.',
    icon: '🤖',
    tags: ['ASR', 'LLM orchestration', 'Sales enablement'],
    metrics: [
      { label: 'Сэкономлено времени', value: '35%' },
      { label: 'Точность NER', value: '92%' },
      { label: 'Окупаемость', value: '4 мес.' }
    ],
    result:
      'Сократили время подготовки менеджера к повторному звонку с 15 до 3 минут.'
  }
]

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const projects = useMemo(() => projectsData, [])

  useEffect(() => {
    if (!selectedProject) {
      return
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [selectedProject])

  const closeModal = () => setSelectedProject(null)

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-black py-24 px-6 sm:px-10"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(26,112,255,0.12),_transparent_55%)]" />
      <div className="container relative z-10 mx-auto max-w-6xl">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="inline-flex items-center justify-center rounded-full border border-tradicia-blue/40 bg-tradicia-blue/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-tradicia-blue">
            Наши кейсы
          </span>
          <h2 className="mt-6 text-4xl font-bold text-tradicia-white sm:text-5xl">
            Проекты
          </h2>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => setSelectedProject(project)}
              className="group glass-effect flex h-full flex-col gap-6 rounded-3xl border border-white/5 p-6 text-left transition duration-300 hover:border-tradicia-blue/60 hover:shadow-2xl hover:shadow-tradicia-blue/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-tradicia-blue/80"
            >
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-tradicia-blue/15 text-3xl">
                {project.icon}
              </span>

              <div className="flex flex-col gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-tradicia-blue/70">
                    {project.subtitle}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-tradicia-white transition-colors duration-300 group-hover:text-tradicia-blue">
                    {project.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-gray-300">
                  {project.description}
                </p>
              </div>

              <div className="mt-auto flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-gray-300 transition-colors duration-300 group-hover:border-tradicia-blue/30 group-hover:text-tradicia-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 text-sm font-semibold text-tradicia-blue transition-transform duration-300 group-hover:translate-x-1">
                <span>Смотреть кейс</span>
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M3.5 8H12.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.5 4L12.5 8L8.5 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedProject && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 px-4 py-10"
          onClick={closeModal}
        >
          <div
            className="glass-effect relative w-full max-w-3xl rounded-3xl border border-white/10 p-8 sm:p-10"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-6 top-6 text-3xl text-gray-400 transition hover:text-white"
              aria-label="Закрыть модальное окно"
            >
              ×
            </button>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-center gap-4">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-tradicia-blue/15 text-3xl">
                    {selectedProject.icon}
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-tradicia-blue/70">
                      {selectedProject.subtitle}
                    </p>
                    <h3 className="mt-2 text-3xl font-semibold text-tradicia-white">
                      {selectedProject.title}
                    </h3>
                  </div>
                </div>
              </div>

              <p className="text-base leading-relaxed text-gray-300">
                {selectedProject.details}
              </p>

              {selectedProject.result && (
                <div className="rounded-2xl border border-tradicia-blue/40 bg-tradicia-blue/10 p-6 text-tradicia-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-tradicia-blue/70">
                    Результат
                  </p>
                  <p className="mt-2 text-lg leading-relaxed text-gray-100">
                    {selectedProject.result}
                  </p>
                </div>
              )}

              {selectedProject.metrics && selectedProject.metrics.length > 0 && (
                <div className="grid gap-4 sm:grid-cols-3">
                  {selectedProject.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center"
                    >
                      <p className="text-xs uppercase tracking-[0.3em] text-tradicia-blue/70">
                        {metric.label}
                      </p>
                      <p className="mt-2 text-lg font-semibold text-tradicia-white">
                        {metric.value}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}