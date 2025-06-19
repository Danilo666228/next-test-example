import { ReviewCard } from '@/components/shared'

import { Review } from '@/shared/api/types'

interface ReviewListProps {
	reviews: Review[]
}

export const ReviewList = ({ reviews }: ReviewListProps) => {
	return (
		<div className='my-[105px] flex justify-center gap-[20px]'>
			{reviews.map(review => (
				<ReviewCard key={review.id} review={review} />
			))}
		</div>
	)
}
