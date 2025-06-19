'use client'

import { Button, Input, Typography } from '@/components/ui'

import { useCart } from '@/shared/contexts/cart'

export const Cart = () => {
	const { items } = useCart()
	return (
		<div className='bg-light mx-auto flex w-fit flex-col gap-5 rounded-[15px] p-5'>
			<div>
				<Typography tag='h2' className='text-dark'>
					Добавленные товары
				</Typography>
			</div>
			<div>
				{items.length ? (
					<ul className='flex flex-col gap-3'>
						{items.map(item => (
							<li className='text-dark flex justify-between rounded-[10px] border p-2' key={item.product.id}>
								<Typography>{item.product.title}</Typography>
								<Typography>{item.quantity}</Typography>
							</li>
						))}
					</ul>
				) : (
					<Typography className='text-dark text-center'>Ваша корзина пуста</Typography>
				)}
			</div>
			<div className='text-light flex gap-3'>
				<Input className='bg-dark' type='tel' />
				<Button className='bg-dark'>Заказать</Button>
			</div>
		</div>
	)
}
