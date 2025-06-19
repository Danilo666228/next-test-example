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

	const loadMoreProducts = useCallback(async () => {
		if (isLoading || !hasMore) return
		setIsLoading(true)
		fetch(`http://o-complex.com:1337/products?page=${page}&page_size=20`)
			.then(res => res.json() as Promise<ProductResponse>)
			.then(data => {
				setProducts(prev => [...prev, ...data.items])
				setPage(prev => prev + 1)
				if (data.items.length === 0) {
					setHasMore(false)
				}
			})
			.catch(err => {
				setIsLoading(false)
				console.error(err)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}, [page, hasMore, isLoading])

	useEffect(() => {
		loadMoreProducts()
	}, [])

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				if (entries[0].isIntersecting && hasMore && !isLoading) {
					loadMoreProducts()
				}
			},
			{
				threshold: 0.1
			}
		)
		if (loadMoreRef.current) {
			observer.observe(loadMoreRef.current)
		}
		return () => observer.disconnect()
	}, [hasMore, isLoading, loadMoreProducts])

	return (
		<section>
			<div className='mx-[300px] my-[105px] grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-[20px]'>
				{products.map(product => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
			{isLoading && (
				<div className='mx-[300px] flex flex-col items-center justify-center gap-3'>
					<Loader2 size={42} className='animate-spin' />
					<Typography tag='h2'>Загрузка...</Typography>
				</div>
			)}
			{hasMore && <div ref={loadMoreRef} className='h-[100px]' />}
		</section>
	)
}
