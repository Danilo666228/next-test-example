'use client'

import { Loader2 } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { ProductCard } from '@/components/shared'
import { Typography } from '@/components/ui'

import { Product } from '@/shared/api/types'

type ProductResponse = {
	page: number
	amount: number
	total: number
	items: Product[]
}

export const ProductList = () => {
	const [products, setProducts] = useState<Product[]>([])
	const [page, setPage] = useState(1)
	const loadMoreRef = useRef<HTMLDivElement>(null)
	const [hasMore, setHasMore] = useState(true)
	const [isLoading, setIsLoading] = useState(false)
	const [isInitialized, setIsInitialized] = useState(false)

	const loadMoreProducts = useCallback(async () => {
		if (isLoading || !hasMore) return
		setIsLoading(true)

		try {
			const response = await fetch(`http://o-complex.com:1337/products?page=${page}&page_size=20`)
			const data: ProductResponse = await response.json()

			setProducts(prev => [...prev, ...data.items])
			setPage(prev => prev + 1)

			if (data.items.length < 20 || data.page >= Math.ceil(data.total / 20)) {
				setHasMore(false)
			}
		} catch (err) {
			console.error('Ошибка загрузки товаров:', err)
		} finally {
			setIsLoading(false)
		}
	}, [page, hasMore, isLoading])

	useEffect(() => {
		if (!isInitialized) {
			setIsInitialized(true)
			loadMoreProducts()
		}
	}, [isInitialized, loadMoreProducts])

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				if (entries[0].isIntersecting && hasMore && !isLoading && isInitialized) {
					loadMoreProducts()
				}
			},
			{
				threshold: 0.1,
				rootMargin: '100px'
			}
		)

		const currentRef = loadMoreRef.current
		if (currentRef) {
			observer.observe(currentRef)
		}

		return () => observer.disconnect()
	}, [hasMore, isLoading, loadMoreProducts, isInitialized])

	return (
		<section>
			<div className='my-[105px] grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-[20px]'>
				{products.map(product => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
			{isLoading && (
				<div className='flex flex-col items-center justify-center gap-3'>
					<Loader2 size={42} className='animate-spin' />
					<Typography tag='h2'>Загрузка...</Typography>
				</div>
			)}
			{hasMore && !isLoading && <div ref={loadMoreRef} className='h-[100px]' />}
		</section>
	)
}
