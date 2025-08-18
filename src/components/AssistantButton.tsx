'use client'

import Link from 'next/link'

export default function AssistantButton() {
	return (
		<Link
			href="/assistant"
			aria-label="Чат с ИИ-ассистентом"
			className="fixed bottom-6 left-6 z-[60]"
		>
			<span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-400 text-white shadow-lg ring-1 ring-white/20 transition-transform hover:scale-105">
				<svg
					className="h-7 w-7"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M21 12c0 4.418-4.03 8-9 8-1.273 0-2.482-.21-3.586-.594L3 20l1.594-4.414A8.839 8.839 0 0 1 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8Z" />
					<path d="M8 10h8M8 14h5" />
				</svg>
			</span>
		</Link>
	)
}


