'use client'

import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from './Button'

export const UpScroll = () => {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		window.addEventListener('scroll', () => {
			setIsVisible(window.scrollY > 200)
		})
	}, [])

	return (
		isVisible && (
			<div className='fixed right-5 bottom-5'>
				<Button className='bg-light/20 size-15' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
					<ArrowUp />
				</Button>
			</div>
		)
	)
}
