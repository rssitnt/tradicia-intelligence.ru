'use client'

import Image from 'next/image'

export default function AssistantButton() {
	const handleClick = () => {
		window.open('https://t.me/rsstnt', '_blank')
	}

	return (
		<button
			aria-label="Чат с ИИ-ассистентом"
			onClick={handleClick}
			className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[1000] relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-400 text-white shadow-lg ring-1 ring-white/20 transition-all duration-500 md:duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30 before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-blue-500/25 before:blur-xl before:transition-opacity before:duration-700 before:opacity-0 hover:before:opacity-100"
		>
			<Image
				src="/tg.png"
				alt="Telegram"
				width={28}
				height={28}
				className="h-7 w-7"
			/>
		</button>
	)
}

