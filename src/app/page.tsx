import { ReviewCard } from '@/components/shared'

import { Review } from '@/shared/api/types'

import { Header, ProductList } from './(components)'

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
			<div className='mx-[300px] my-[105px] flex justify-center gap-[20px]'>
				{reviews.map(review => (
					<ReviewCard key={review.id} review={review} />
				))}
			</div>

			<ProductList />
		</>
	)
}
