'use client'

import { useState } from 'react'

import { Button, Typography } from '@/components/ui'

import { Product } from '@/shared/api/types'

interface ProductCardProps {
	product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
	const [isAdded, setIsAdded] = useState(false)
	const [count, setCount] = useState(0)
	return (
		<article className='rounded-[15px] bg-white p-[20px]'>
			<div className='relative h-[210px] w-[280px] rounded-[15px]'>
				<img src={product.image_url} alt={product.title} className='object-cover' />
			</div>
			<div className='text-dark mt-[10px]'>
				<Typography>{product.title}</Typography>
				<Typography>{product.description}</Typography>
			</div>
			<div className='mt-[10px] flex flex-col gap-[10px]'>
				<Typography className='text-dark text-center'>Цена: {product.price}</Typography>
				{isAdded ? (
					<div className='flex items-center justify-between gap-[10px]'>
						<Button onClick={() => setCount(prev => prev - 1)} variant='ghost' className='bg-dark'>
							-
						</Button>
						<Typography className='bg-dark text-light w-[50px] rounded-[10px] p-[5px] text-center'>{count}</Typography>
						<Button onClick={() => setCount(prev => prev + 1)} variant='ghost' className='bg-dark'>
							+
						</Button>
					</div>
				) : (
					<Button onClick={() => setIsAdded(true)} variant='ghost' className='bg-dark'>
						Купить
					</Button>
				)}
			</div>
		</article>
	)
}
