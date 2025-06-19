'use client'

import { createContext, useContext } from 'react'

import { Product } from '@/shared/api/types'

export interface CartItem {
	product: Product
	quantity: number
	price: number
}

export interface CartContextValue {
	items: CartItem[]
	handleAddCart: (product: Product) => void
	handleDeleteCart: (productId: number) => void
}

export const CartContext = createContext<CartContextValue>({} as CartContextValue)

export const useCart = () => useContext(CartContext)
