'use client'

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-6 bg-black">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl font-bold text-center text-tradicia-white mb-16 fade-in">
          О нас
        </h2>
        
        <div className="relative">
          <div className="glass-effect rounded-2xl p-8 md:p-12 hover-glow transition-all duration-700 cursor-pointer">
            <div className="text-center">
              <p className="text-lg text-gray-300 leading-relaxed">
                Мы внедряем искусственный интеллект, чтобы автоматизировать ключевые бизнес-процессы компании «Традиция К», повышать производительность и развивать культуру эффективного использования ИИ-инструментов среди сотрудников.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 