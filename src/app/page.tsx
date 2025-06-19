import { Review } from '@/shared/api/types'

import { Cart, Header, ProductList, ReviewList } from './(components)'

async function getReviews() {
	const response = await fetch('http://o-complex.com:1337/reviews')
	const data = (await response.json()) as Review[]

	return data
}

export default async function Home() {
	const reviews = await getReviews()

	return (
		<>
			<Header />
			<div className='mx-[300px]'>
				<ReviewList reviews={reviews} />
				<Cart />
				<ProductList />
			</div>
		</>
	)
}
