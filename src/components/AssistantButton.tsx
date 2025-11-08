'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'

export default function AssistantButton() {
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	const handleClick = () => {
		window.open('https://t.me/rsstnt', '_blank')
	}

	const button = (
		<div
			className="fixed left-4 md:left-6 bottom-[calc(1rem+env(safe-area-inset-bottom))] md:bottom-[calc(1.5rem+env(safe-area-inset-bottom))] z-[10000]"
		>
			<button
				aria-label="Чат с ИИ-ассистентом"
				onClick={handleClick}
				className="relative inline-flex h-11 w-11 overflow-hidden rounded-full shadow-lg ring-1 ring-white/20 transition-all duration-500 md:duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 hover:-rotate-6 hover:shadow-2xl hover:shadow-blue-500/30 before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-blue-500/25 before:blur-xl before:transition-opacity before:duration-700 before:opacity-0 hover:before:opacity-100"
			>
				<Image
					src="/tg_new.png"
					alt="Telegram"
					fill
					sizes="44px"
					className="object-cover"
				/>
			</button>
		</div>
	)

	if (!mounted) return null
	return createPortal(button, document.body)
}

