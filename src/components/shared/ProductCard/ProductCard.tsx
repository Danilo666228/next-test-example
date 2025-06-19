'use client'

import { useState } from 'react'

import { Button, Typography } from '@/components/ui'

import { Product } from '@/shared/api/types'
import { useCart } from '@/shared/contexts/cart'

interface ProductCardProps {
	product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
	const { handleAddCart, handleDeleteCart, items } = useCart()
	const [isAdded, setIsAdded] = useState(false)
	const currentItem = items.find(item => item.product.id === product.id)

	const [count, setCount] = useState(currentItem?.quantity || 0)

	const handleAddClick = () => {
		setIsAdded(true)
		setCount(prev => prev + 1)
		handleAddCart(product)
	}

	const handleDeleteClick = () => {
		if (count > 0) {
			setCount(prev => prev - 1)
			handleDeleteCart(product.id)
		}
		if (count === 1) {
			setIsAdded(false)
		}
	}

	return (
		<article className='bg-light flex flex-col rounded-[15px] p-[20px]'>
			<div className='relative h-[200px] w-[280px] rounded-[15px]'>
				<img src={product.image_url} alt={product.title} className='object-cover' />
			</div>
			<div className='text-dark mt-[10px]'>
				<Typography className='truncate'>{product.title}</Typography>
				<Typography className='line-clamp-3 text-sm text-gray-600'>{product.description}</Typography>
			</div>
			<div className='mt-auto flex flex-col gap-[10px]'>
				<Typography className='text-dark text-center text-lg'>
					Цена: <b>{product.price} ₽</b>
				</Typography>
				{isAdded ? (
					<div className='flex items-center justify-between gap-[10px]'>
						<Button onClick={handleDeleteClick} variant='ghost' className='bg-dark'>
							-
						</Button>
						<Typography className='bg-dark text-light w-[100px] rounded-[5px] p-[5px] text-center'>{currentItem?.quantity}</Typography>
						<Button onClick={handleAddClick} variant='ghost' className='bg-dark'>
							+
						</Button>
					</div>
				) : (
					<Button onClick={handleAddClick} variant='ghost' className='bg-dark'>
						Купить
					</Button>
				)}
			</div>
		</article>
	)
}
