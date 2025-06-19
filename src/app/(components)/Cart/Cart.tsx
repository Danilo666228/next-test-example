'use client'

import { useState } from 'react'
import { PatternFormat } from 'react-number-format'

import { Button, Typography } from '@/components/ui'
import { Modal } from '@/components/ui/Modal'

import { useCart } from '@/shared/contexts/cart'

export const Cart = () => {
	const { items } = useCart()
	const [phone, setPhone] = useState('')
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isError, setIsError] = useState(false)

	const handleOrderClick = async () => {
		const order = {
			phone: phone.replace(/\D/g, ''),
			cart: items.map(item => ({
				id: item.product.id,
				quantity: item.quantity
			}))
		}
		const response = await fetch('http://o-complex.com:1337/order', {
			method: 'POST',
			body: JSON.stringify(order),
			headers: {
				'Content-Type': 'application/json'
			}
		})

		if (response.ok) {
			setIsModalOpen(true)
		} else {
			alert(`Ошибка при создании заказа : `)
			setIsError(true)
		}
	}

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
				<PatternFormat
					value={phone}
					className={`text-light bg-dark rounded-[5px] pl-3`}
					style={isError ? { border: '1px solid red' } : {}}
					format='+# (###) - ### - ## - ##'
					placeholder='+7 (999) - 999 - 99 - 99'
					onChange={e => setPhone(e.target.value)}
				/>

				<Button className='bg-dark' onClick={handleOrderClick}>
					Заказать
				</Button>
			</div>
			<Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
				<div className='flex flex-col gap-3'>
					<Typography tag='h2' className='text-dark'>
						Заказ успешно создан
					</Typography>
					<Typography className='text-dark'>Мы свяжемся с вами в ближайшее время</Typography>
				</div>
			</Modal>
		</div>
	)
}
