'use client'

import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'

import { Product } from '@/shared/api/types'

import { CartContext, CartContextValue, CartItem } from './CartContext'

interface CartProviderProps {
	children: ReactNode
}

const CART_STORAGE_KEY = 'cart'

export const CartProvider = ({ children }: CartProviderProps) => {
	const [items, setItems] = useState<CartItem[]>([])

	useEffect(() => {
		const cart = localStorage.getItem(CART_STORAGE_KEY)
		if (cart) {
			setItems(JSON.parse(cart))
		}
	}, [])

	useEffect(() => {
		localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
	}, [items])

	const handleAddCart = useCallback((product: Product) => {
		setItems(prev => {
			const existProduct = prev.find(item => item.product.id === product.id)
			const currentQuantity = existProduct?.quantity || 0

			if (existProduct) {
				return prev.map(item => (item.product.id === product.id ? { ...item, quantity: currentQuantity + 1 } : item))
			}
			return [...prev, { product, quantity: currentQuantity + 1, price: product.price }]
		})
	}, [])

	const handleDeleteCart = useCallback((productId: number) => {
		setItems(prev => {
			const existProduct = prev.find(item => item.product.id === productId)

			if (existProduct) {
				if (existProduct.quantity <= 1) {
					return prev.filter(item => item.product.id !== productId)
				} else {
					return prev.map(item => (item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item))
				}
			}

			return prev
		})
	}, [])

	const value = useMemo<CartContextValue>(
		() => ({
			items,
			handleAddCart,
			handleDeleteCart
		}),
		[items, handleAddCart, handleDeleteCart]
	)

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
