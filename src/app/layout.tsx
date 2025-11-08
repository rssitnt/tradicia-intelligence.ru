import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AssistantButton from '../components/AssistantButton'
import MouseGradient from '../components/MouseGradient'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'Tradicia Intelligence',
  description: 'Интеллектуальная платформа Tradicia',
  icons: {
    icon: '/favicon2.png',
    apple: '/favicon2.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Предотвращение FOUC */
            body.loaded { 
              visibility: visible; 
              opacity: 1; 
              transition: opacity 0.3s ease-in-out;
            }
          `
        }} />
      </head>
      <body className={`${inter.className} min-h-screen loaded`}>
        <script dangerouslySetInnerHTML={{
          __html: `
            document.body.classList.add('loaded');
          `
        }} />
        <MouseGradient />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10 mouse-gradient-layer"
        />
        {children}
        <AssistantButton />
      </body>
    </html>
  )
} 