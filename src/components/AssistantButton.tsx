'use client'

import { useEffect, useRef, useState } from 'react'

type ChatMessage = {
	role: 'user' | 'assistant'
	text: string
}

export default function AssistantButton() {
	const [isOpen, setIsOpen] = useState(false)
	const [messages, setMessages] = useState<ChatMessage[]>([
		{ role: 'assistant', text: 'Здравствуйте! Я ИИ‑ассистент. Чем могу помочь?' }
	])
	const [input, setInput] = useState('')
	const panelRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setIsOpen(false)
		}
		document.addEventListener('keydown', onKey)
		return () => document.removeEventListener('keydown', onKey)
	}, [])

	useEffect(() => {
		const onClick = (e: MouseEvent) => {
			if (!isOpen) return
			const target = e.target as Node
			if (panelRef.current && !panelRef.current.contains(target)) {
				setIsOpen(false)
			}
		}
		document.addEventListener('mousedown', onClick)
		return () => document.removeEventListener('mousedown', onClick)
	}, [isOpen])

	const sendMessage = (e: React.FormEvent) => {
		e.preventDefault()
		const text = input.trim()
		if (!text) return
		setMessages(prev => [...prev, { role: 'user', text }])
		setInput('')
		// Заглушка ответа ассистента
		setTimeout(() => {
			setMessages(prev => [
				...prev,
				{ role: 'assistant', text: 'Спасибо за сообщение! Скоро подключим полноценный чат.' }
			])
		}, 500)
	}

	return (
		<>
			<button
				aria-label="Чат с ИИ-ассистентом"
				onClick={() => setIsOpen(v => !v)}
				className="fixed bottom-6 right-6 z-[60] relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-400 text-white shadow-lg ring-1 ring-white/20 transition-all duration-500 md:duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30 before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-blue-500/20 before:blur-xl before:transition-opacity before:duration-700 before:opacity-0 hover:before:opacity-100"
			>
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
			</button>

			{isOpen && (
				<div className="fixed inset-0 z-[65]">
					{/* затемнение фона */}
					<div className="absolute inset-0 bg-black/30" />

					{/* панель чата внизу слева */}
					<div
						ref={panelRef}
						className="absolute bottom-24 left-6 w-[92vw] max-w-sm md:max-w-md h-[60vh] max-h-[520px] glass-effect rounded-2xl shadow-2xl ring-1 ring-white/10 flex flex-col overflow-hidden"
					>
						<div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
							<h3 className="text-sm font-medium text-white/90">ИИ‑ассистент</h3>
							<button
								aria-label="Закрыть"
								onClick={() => setIsOpen(false)}
								className="p-1 rounded-md hover:bg-white/10 text-white/80"
							>
								<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									<path d="M18 6L6 18M6 6l12 12" />
								</svg>
							</button>
						</div>

						<div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
							{messages.map((m, i) => (
								<div key={i} className={`${m.role === 'user' ? 'text-right' : 'text-left'}`}>
									<span className={`inline-block px-3 py-2 rounded-2xl text-sm ${m.role === 'user' ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white/10 text-white rounded-bl-sm'}`}>
										{m.text}
									</span>
								</div>
							))}
						</div>

						<form onSubmit={sendMessage} className="p-3 border-t border-white/10">
							<div className="flex items-center space-x-2">
								<input
									type="text"
									value={input}
									onChange={e => setInput(e.target.value)}
									placeholder="Напишите сообщение..."
									className="flex-1 rounded-xl bg-white/5 text-white placeholder-white/40 px-3 py-2 outline-none ring-1 ring-white/10 focus:ring-blue-500/50"
								/>
								<button type="submit" className="px-3 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-colors">
									Отправить
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	)
}

