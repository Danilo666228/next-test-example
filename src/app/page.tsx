import { ProductCard, ReviewCard } from '@/components/shared'

import { Product, Review } from '@/shared/api/types'

import { Header } from './(components)'

type ProductResponse = {
	page: number
	amount: number
	total: number
	items: Product[]
}

async function getReviews() {
	const response = await fetch('http://o-complex.com:1337/reviews')
	const data = (await response.json()) as Review[]

	return data
}

async function getProducts() {
	const response = await fetch('http://o-complex.com:1337/products?page=1&page_size=20')
	const data = (await response.json()) as ProductResponse

	return data
}

export default async function Home() {
	const reviews = await getReviews()
	const products = await getProducts()

	return (
		<>
			<Header />
			<div className='mx-[300px] my-[105px] flex justify-center gap-[20px]'>
				{reviews.map(review => (
					<ReviewCard key={review.id} review={review} />
				))}
			</div>

			<div className='mx-[300px] my-[105px] grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-[20px]'>
				{products.items.map(product => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</>
	)
}
