'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setIsMobileMenuOpen(false) // Закрываем мобильное меню после перехода
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setIsMobileMenuOpen(false)
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'bg-black/5 backdrop-blur-lg shadow-lg mt-4 mx-4 md:mx-48 rounded-2xl' 
          : 'bg-transparent backdrop-blur-lg'
      }`}
    >
      <nav className="px-6 py-4 relative flex items-center justify-center">
        {/* Логотип */}
        <button 
          onClick={scrollToTop}
          className="absolute left-4 flex items-center"
        >
          <Image
            src="/mini_logo_TI.png"
            alt="Tradicia Intelligence"
            width={120}
            height={32}
            className="h-8 w-auto"
            priority
          />
        </button>

        {/* Десктопная навигация */}
        <div className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => scrollToSection('about')}
            className="text-tradicia-white hover:text-tradicia-blue transition-all duration-500 ease-in-out transform hover:scale-105"
          >
            О нас
          </button>
          
          <button 
            onClick={() => scrollToSection('events')}
            className="text-tradicia-white hover:text-tradicia-blue transition-all duration-500 ease-in-out transform hover:scale-105"
          >
            События
          </button>
          
          <button 
            onClick={() => scrollToSection('projects')}
            className="text-tradicia-white hover:text-tradicia-blue transition-all duration-500 ease-in-out transform hover:scale-105"
          >
            Проекты
          </button>
          
          <button 
            onClick={() => scrollToSection('contacts')}
            className="text-tradicia-white hover:text-tradicia-blue transition-all duration-500 ease-in-out transform hover:scale-105"
          >
            Контакты
          </button>
        </div>

        {/* Мобильная навигация */}
        <div className="md:hidden flex items-center space-x-4">
          <button 
            onClick={() => scrollToSection('about')}
            className="text-tradicia-white hover:text-tradicia-blue transition-all duration-300 text-sm px-2 py-1"
          >
            О нас
          </button>
          
          <button 
            onClick={() => scrollToSection('events')}
            className="text-tradicia-white hover:text-tradicia-blue transition-all duration-300 text-sm px-2 py-1"
          >
            События
          </button>
          
          <button 
            onClick={() => scrollToSection('projects')}
            className="text-tradicia-white hover:text-tradicia-blue transition-all duration-300 text-sm px-2 py-1"
          >
            Проекты
          </button>
          
          <button 
            onClick={() => scrollToSection('contacts')}
            className="text-tradicia-white hover:text-tradicia-blue transition-all duration-300 text-sm px-2 py-1"
          >
            Контакты
          </button>
        </div>
      </nav>
    </header>
  )
} 