'use client'

import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-black relative">
      {/* Фон с скругленными краями - десктоп */}
      <div className="absolute inset-0 hidden md:flex items-start justify-center pt-32">
        <div className="relative w-3/4 h-3/4 rounded-3xl overflow-hidden">
          <Image
            src="/bg.png"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
      
      {/* Фон для мобильных устройств */}
      <div className="absolute inset-0 md:hidden flex items-start justify-center pt-32">
        <div className="relative w-11/12 h-5/6 rounded-3xl overflow-hidden">
          <Image
            src="/bg_mobile.png"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
      
      {/* Логотип по центру фона - десктоп */}
      <div className="absolute inset-0 hidden md:flex items-start justify-center z-10 pt-32">
        <div className="relative w-3/4 h-3/4 flex items-center justify-center">
          <Image
            src="/logo_TI.png"
            alt="Tradicia Intelligence"
            width={960}
            height={540}
            className="w-1/2 h-auto max-w-full max-h-1/2 object-contain"
            priority
          />
        </div>
      </div>
      
      {/* Логотип по центру фона - мобильные */}
      <div className="absolute inset-0 md:hidden flex items-start justify-center z-10 pt-32">
        <div className="relative w-11/12 h-5/6 flex items-center justify-center">
          <Image
            src="/logo_TI.png"
            alt="Tradicia Intelligence"
            width={960}
            height={540}
            className="w-1/2 h-auto max-w-full max-h-1/2 object-contain"
            priority
          />
        </div>
      </div>
    </section>
  )
} 