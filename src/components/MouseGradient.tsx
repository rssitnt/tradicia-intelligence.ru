'use client'

import { useEffect } from 'react'

const SMOOTHING = 0.1

export default function MouseGradient() {
	useEffect(() => {
		if (typeof window === 'undefined') return

		const root = document.documentElement
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

		if (prefersReducedMotion.matches) {
			root.style.setProperty('--cursor-x', '50vw')
			root.style.setProperty('--cursor-y', '50vh')
			return
		}

		let targetX = window.innerWidth / 2
		let targetY = window.innerHeight / 2
		let currentX = targetX
		let currentY = targetY
		let animationFrameId: number

		const updateCursor = () => {
			currentX += (targetX - currentX) * SMOOTHING
			currentY += (targetY - currentY) * SMOOTHING

			root.style.setProperty('--cursor-x', `${currentX}px`)
			root.style.setProperty('--cursor-y', `${currentY}px`)

			animationFrameId = window.requestAnimationFrame(updateCursor)
		}

		const handlePointerMove = (event: PointerEvent) => {
			targetX = event.clientX
			targetY = event.clientY
		}

		const handleResize = () => {
			targetX = Math.min(Math.max(targetX, 0), window.innerWidth)
			targetY = Math.min(Math.max(targetY, 0), window.innerHeight)
		}

		root.style.setProperty('--cursor-x', `${currentX}px`)
		root.style.setProperty('--cursor-y', `${currentY}px`)

		updateCursor()
		window.addEventListener('pointermove', handlePointerMove, { passive: true })
		window.addEventListener('resize', handleResize)

		return () => {
			window.cancelAnimationFrame(animationFrameId)
			window.removeEventListener('pointermove', handlePointerMove)
			window.removeEventListener('resize', handleResize)
			root.style.removeProperty('--cursor-x')
			root.style.removeProperty('--cursor-y')
		}
	}, [])

	return null
}

