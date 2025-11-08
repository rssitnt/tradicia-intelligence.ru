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

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mousedown', handleClickOutside)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
    }
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
      <nav className="px-6 py-4 relative flex items-center justify-between">
        {/* Логотип */}
        <button 
          onClick={scrollToTop}
          className="flex items-center"
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

        {/* Мобильное бургер-меню */}
        <div className="md:hidden relative mobile-menu-container">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-tradicia-white hover:text-tradicia-blue transition-colors duration-300 p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Выпадающее меню */}
          {isMobileMenuOpen && (
            <div className="absolute right-0 top-12 glass-effect rounded-xl shadow-lg py-2 min-w-[160px] z-50">
              <button 
                onClick={() => scrollToSection('about')}
                className="block w-full text-left px-4 py-3 text-tradicia-white hover:text-tradicia-blue hover:bg-white/10 transition-all duration-300"
              >
                О нас
              </button>
              
              <button 
                onClick={() => scrollToSection('projects')}
                className="block w-full text-left px-4 py-3 text-tradicia-white hover:text-tradicia-blue hover:bg-white/10 transition-all duration-300"
              >
                Проекты
              </button>
              
              <button 
                onClick={() => scrollToSection('contacts')}
                className="block w-full text-left px-4 py-3 text-tradicia-white hover:text-tradicia-blue hover:bg-white/10 transition-all duration-300"
              >
                Контакты
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
} 