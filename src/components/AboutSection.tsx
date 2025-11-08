'use client'

import { useEffect, useRef } from 'react'

export default function AboutSection() {
  const cardRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const element = cardRef.current
    if (!element) return

    let ticking = false

    const updateTransform = () => {
      ticking = false
      const rect = element.getBoundingClientRect()
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight
      const viewportCenter = viewportHeight / 2
      const elementCenter = rect.top + rect.height / 2
      const distance = Math.min(
        Math.abs(viewportCenter - elementCenter),
        viewportHeight
      )
      const progress = 1 - distance / viewportHeight // 0 (далеко) → 1 (центр)
      const scale = 0.75 + progress * 0.3 // 0.75 → 1.05
      const opacity = 0.5 + progress * 0.5 // 0.5 → 1

      element.style.transform = `scale(${scale})`
      element.style.opacity = opacity.toString()
    }

    const requestTick = () => {
      if (!ticking) {
        ticking = true
        window.requestAnimationFrame(updateTransform)
      }
    }

    element.style.willChange = 'transform, opacity'
    element.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out'

    updateTransform()

    window.addEventListener('scroll', requestTick, { passive: true })
    window.addEventListener('resize', requestTick)

    return () => {
      window.removeEventListener('scroll', requestTick)
      window.removeEventListener('resize', requestTick)
      element.style.willChange = ''
      element.style.transition = ''
      element.style.transform = ''
      element.style.opacity = ''
    }
  }, [])

  return (
    <section id="about" className="py-20 px-6 bg-black">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl font-bold text-center text-tradicia-white mb-16">
          О нас
        </h2>

        <div className="relative">
          <div
            ref={cardRef}
            className="glass-effect no-border rounded-2xl p-8 md:p-12 cursor-pointer transition-transform duration-500 ease-out"
          >
            <div className="text-center">
              <p className="text-lg text-gray-300 leading-relaxed">
                Мы внедряем технологии на базе ИИ в ключевые процессы ГК &quot;Традиция&quot; с целью повышения эффективности компании, а также развиваем культуру эффективного использования ИИ-инструментов.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}