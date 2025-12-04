'use client'

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
  metrics?: ProjectMetric[]
  result?: string
}

const projectsData: Project[] = [
  {
    id: 1,
    title: 'Саммари звонков с клиентом для менеджеров',
    subtitle: 'Виртуальный помощник для продаж',
    description:
      'Автоматизировали обработку звонков: распознаём речь, составляем саммари и предлагаем менеджеру следующие действия.',
    details:
      'Интегрированный CRM-агент переводит звонки в текст, выделяет 13 бизнес-показателей, оценивает эмоциональный тон и предлагает критические действия по удержанию клиента. Архитектура построена на пайплайне распознавания речи, смыслового анализа и векторного поиска — обучение производилось на реальных диалогах заказчика.',
    icon: '/cases/call-sum.png',
    metrics: [
      { label: 'Сэкономлено времени', value: '35%' },
      { label: 'Точность NER', value: '92%' },
      { label: 'Окупаемость', value: '4 мес.' }
    ],
    result:
      'Сократили время подготовки менеджера к повторному звонку с 15 до 3 минут.'
  },
  {
    id: 2,
    title: 'Оценка качества обслуживания',
    subtitle: 'Звонки, мессенджеры и почта',
    description:
      'Отслеживаем, как команды поддержки соблюдают стандарты сервисов во всех каналах: голос, текст и асинхронные обращения.',
    details:
      'Система собирает записи звонков, историю чатов и переписку, автоматически очищает данные и приводит их к единому формату. Интеллектуальные агенты маркируют сценарии, оценивают тон и соответствие регламентам, дают рекомендации по улучшению. Отчёты формируются в BI-дашборде и отправляются руководителям смен.',
    icon: '/cases/rate-manager.png',
    metrics: [
      { label: 'Каналы', value: '3 источника' },
      { label: 'Маркеров качества', value: '45+' },
      { label: 'Аналитика', value: 'ежедневно' }
    ],
    result:
      'Снизили долю проблемных обращений на 28% за первый квартал внедрения.'
  },
  {
    id: 3,
    title: 'Поиск лидов',
    subtitle: 'Автоматическая вычитка заявок',
    description:
      'ИИ-агент парсит сообщения из тематических телеграм-чатов, выделяет заявки на навеску и подготавливает их для отдела продаж.',
    details:
      'Кластеризация и фильтрация потоков из телеграм-каналов помогает отделу продаж сфокусироваться на горячих лидах. Языковая модель строит структурированные карточки клиента, определяет тип запроса и степень готовности, после чего отправляет запись в таблицу и CRM.',
    icon: '/cases/lead-gen.png',
    metrics: [
      { label: 'Чатов в подборке', value: '40+' },
      { label: 'Новые лиды', value: '120/нед.' },
      { label: 'Автозаполнение', value: 'Google Sheets' }
    ],
    result:
      'Ускорили реакцию на тёплые запросы до 30 минут и увеличили конверсию в звонок на 22%.'
  },
  {
    id: 4,
    title: 'Генерация иконок и логотипов',
    subtitle: 'Креативный дизайн через ИИ',
    description:
      'С помощью генеративных моделей создали более 100 уникальных иконок и логотипов для различных проектов и клиентов.',
    details:
      'Используя современные ИИ-модели для генерации изображений, мы разработали систему создания качественных визуальных элементов. Процесс включает тщательную настройку промптов, пост-обработку и адаптацию под требования брендбуков клиентов.',
    icon: '/cases/gen-logos-Photoroom.png',
    metrics: [
      { label: 'Создано элементов', value: '100+' },
      { label: 'Время генерации', value: '5 мин/шт' },
      { label: 'Экономия бюджета', value: '70%' }
    ],
    result:
      'Сократили время создания визуальных элементов с нескольких дней до нескольких часов, обеспечив высокое качество и уникальность.'
  }
]

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-black py-24 px-6 sm:px-10"
    >
      <div className="container relative z-10 mx-auto max-w-6xl">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mt-6 text-4xl font-bold text-tradicia-white sm:text-5xl">
            Кейсы
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 items-stretch">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="group glass-effect flex w-full flex-col gap-3 rounded-3xl border border-white/5 p-3 text-left transition duration-300 hover:border-tradicia-blue/60 hover:shadow-2xl hover:shadow-tradicia-blue/20"
            >
              <div className="flex justify-center">
                <span className="inline-flex h-24 w-24 items-center justify-center rounded-2xl overflow-hidden">
                  {project.icon.startsWith('/') ? (
                    <img 
                      src={project.icon} 
                      alt={project.title}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-5xl">{project.icon}</span>
                  )}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-tradicia-white transition-colors duration-300 group-hover:text-tradicia-blue">
                    {project.title}
                  </h3>
                </div>
                <p className="text-[0.7rem] leading-relaxed text-gray-300">
                  {project.description}
                </p>
              </div>

              <div className="mt-auto" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}