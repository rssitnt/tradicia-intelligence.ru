export default function AssistantPage() {
	return (
		<main className="min-h-[70vh] flex items-center justify-center p-6">
			<div className="glass-effect rounded-2xl p-8 max-w-xl w-full text-center">
				<h1 className="text-2xl font-semibold mb-3">Чат с ИИ-ассистентом</h1>
				<p className="text-gray-300 mb-6">Скоро здесь будет чат с ассистентом. Пока можете перейти по ссылке ниже.</p>
				<a
					href="https://t.me/tradicia_intelligence_news"
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition-colors"
				>
					Открыть чат в Telegram
				</a>
			</div>
		</main>
	)
}


