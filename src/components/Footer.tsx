import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 py-8">
      <div className="container mx-auto px-6 text-center">
        <div className="flex items-center justify-center mb-4">
          <Image
            src="/mini_logo_TI.png"
            alt="Tradicia Intelligence"
            width={40}
            height={40}
            className="w-10 h-10"
          />
        </div>
        
        <p className="text-gray-500 text-xs mb-2">
          © 2025 Tradicia Intelligence. Все права защищены.
        </p>
        <p className="text-gray-500 text-xs">
          Сайт ПОЛНОСТЬЮ сгенерирован искусственным интеллектом
        </p>
      </div>
    </footer>
  )
} 