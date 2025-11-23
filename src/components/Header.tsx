'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isNavCollapsed, setIsNavCollapsed] = useState(false)

  const navRef = useRef<HTMLElement | null>(null)
  const logoRef = useRef<HTMLButtonElement | null>(null)
  const desktopNavRef = useRef<HTMLDivElement | null>(null)
  const burgerRef = useRef<HTMLDivElement | null>(null)

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

  useEffect(() => {
    if (!isNavCollapsed) {
      setIsMobileMenuOpen(false)
    }
  }, [isNavCollapsed])

  useEffect(() => {
    const measureLinksWidth = () => {
      if (!desktopNavRef.current) return 0

      const element = desktopNavRef.current
      const previousDisplay = element.style.display
      const previousVisibility = element.style.visibility
      const previousPosition = element.style.position
      const previousPointerEvents = element.style.pointerEvents
      const previousWhiteSpace = element.style.whiteSpace

      element.style.display = 'flex'
      element.style.visibility = 'hidden'
      element.style.position = 'absolute'
      element.style.pointerEvents = 'none'
      element.style.whiteSpace = 'nowrap'

      const computedStyles = window.getComputedStyle(element)
      const gapValue =
        parseFloat(computedStyles.columnGap || computedStyles.gap || '0') || 0

      const children = Array.from(element.children) as HTMLElement[]
      const childrenWidth = children.reduce(
        (total, child) => total + child.offsetWidth,
        0
      )
      const totalWidth =
        childrenWidth + gapValue * Math.max(children.length - 1, 0)

      element.style.display = previousDisplay
      element.style.visibility = previousVisibility
      element.style.position = previousPosition
      element.style.pointerEvents = previousPointerEvents
      element.style.whiteSpace = previousWhiteSpace

      return totalWidth
    }

    const updateNavCollapse = () => {
      if (!navRef.current) return

      const navWidth = navRef.current.clientWidth
      const logoWidth = logoRef.current?.offsetWidth ?? 0
      const burgerWidth = burgerRef.current?.offsetWidth ?? 0
      const safetyGap = 64
      const requiredLinksWidth = measureLinksWidth()

      const shouldCollapse =
        requiredLinksWidth + logoWidth + burgerWidth + safetyGap > navWidth

      setIsNavCollapsed((prev) =>
        prev === shouldCollapse ? prev : shouldCollapse
      )
    }

    updateNavCollapse()

    let observer: ResizeObserver | undefined

    if (typeof ResizeObserver !== 'undefined' && navRef.current) {
      observer = new ResizeObserver(() => updateNavCollapse())
      observer.observe(navRef.current)
    }

    window.addEventListener('resize', updateNavCollapse)

    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', updateNavCollapse)
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
      <nav 
        ref={navRef}
        className="px-6 py-4 relative flex items-center justify-between"
      >
        {/* Логотип */}
        <button 
          onClick={scrollToTop}
          ref={logoRef}
          className="flex items-center flex-shrink-0"
        >
          <Image
            src="/mini_logo_TI.png"
            alt="Tradicia Intelligence"
            width={120}
            height={32}
            className="h-8 w-auto flex-shrink-0"
            priority
          />
        </button>

        {/* Десктопная навигация */}
        <div
          ref={desktopNavRef}
          className={`items-center gap-x-8 md:flex-nowrap ${
            isNavCollapsed ? 'hidden' : 'hidden md:flex'
          }`}
        >
          <button 
            onClick={() => scrollToSection('about')}
            className="text-tradicia-white hover:text-tradicia-blue transition-all duration-500 ease-in-out transform hover:scale-105 whitespace-nowrap flex-shrink-0"
          >
            О нас
          </button>
          
          <button 
            onClick={() => scrollToSection('projects')}
            className="text-tradicia-white hover:text-tradicia-blue transition-all duration-500 ease-in-out transform hover:scale-105 whitespace-nowrap flex-shrink-0"
          >
            Кейсы
          </button>
          
          <button 
            onClick={() => scrollToSection('contacts')}
            className="text-tradicia-white hover:text-tradicia-blue transition-all duration-500 ease-in-out transform hover:scale-105 whitespace-nowrap flex-shrink-0"
          >
            Контакты
          </button>
        </div>

        {/* Мобильное бургер-меню */}
        <div
          ref={burgerRef}
          className={`relative mobile-menu-container ${isNavCollapsed ? '' : 'md:hidden'}`}
        >
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
                Кейсы
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