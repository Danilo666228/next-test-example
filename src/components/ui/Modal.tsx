import { X } from 'lucide-react'
import { ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'

import { Button } from './Button'

interface ModalProps {
	children: ReactNode
	open: boolean
	onOpenChange: (open: boolean) => void
}

export const Modal = ({ children, open, onOpenChange }: ModalProps) => {
	useEffect(() => {
		if (open) {
			document.body.classList.add('modal-open')
		} else {
			document.body.classList.remove('modal-open')
		}
	}, [open])

	if (!open) return null

	return createPortal(
		<div className='bg-dark/50 fixed top-0 left-0 z-50 flex h-[100vh] w-[100vw] items-center justify-center' onClick={() => onOpenChange(false)}>
			<div className='bg-light relative w-[500px] rounded-[15px] p-10' onClick={e => e.stopPropagation()}>
				<Button className='bg-dark absolute top-2 right-2' onClick={() => onOpenChange(false)}>
					<X className='text-light' />
				</Button>

				{children}
			</div>
		</div>,
		document.body
	)
}
