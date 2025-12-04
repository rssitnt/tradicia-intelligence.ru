import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

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
        <script dangerouslySetInnerHTML={{
          __html: `(function () { var widget = document.createElement('script'); widget.defer = true; widget.dataset.pfId = '7f83315e-4f13-467a-afbd-b429577c44b7'; widget.src = 'https://widget.yourgood.app/script/widget.js?id=7f83315e-4f13-467a-afbd-b429577c44b7&now='+Date.now(); document.head.appendChild(widget); })()`
        }} />
      </head>
      <body className={`${inter.className} min-h-screen loaded`}>
        <script dangerouslySetInnerHTML={{
          __html: `
            document.body.classList.add('loaded');
          `
        }} />
        {children}
      </body>
    </html>
  )
} 