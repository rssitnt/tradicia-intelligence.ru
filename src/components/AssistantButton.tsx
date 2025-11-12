'use client'

import { useEffect, useState, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'

const buttonStyle: CSSProperties = {
	bottom:
		'calc(var(--assistant-bottom-spacing, 1rem) + env(safe-area-inset-bottom, 0px))',
	left:
		'calc(var(--assistant-left-spacing, 1rem) + env(safe-area-inset-left, 0px))',
}

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
			className="group fixed left-4 md:left-6 bottom-4 md:bottom-6 z-[10000] relative [--assistant-bottom-spacing:1rem] [--assistant-left-spacing:1rem] md:[--assistant-bottom-spacing:1.5rem] md:[--assistant-left-spacing:1.5rem]"
			style={buttonStyle}
		>
			<span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-blue-500/30 blur-xl opacity-0 transition-all duration-500 group-hover:opacity-80 group-hover:scale-110" />
			<button
				aria-label="Чат с ИИ-ассистентом"
				onClick={handleClick}
				className="relative z-10 inline-flex h-11 w-11 overflow-hidden rounded-full shadow-lg ring-1 ring-white/20 transition-all duration-500 md:duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 hover:-rotate-6 hover:shadow-xl"
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

