import { Typography } from '@/components/ui'

import { Review } from '@/shared/api/types'

interface ReviewCardProps {
	review: Review
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
	return (
		<div className='bg-gray flex flex-col gap-[10px] rounded-[15px] p-[20px]'>
			<Typography tag='p' className=''>
				Отзыв {review.id}
			</Typography>
			<Typography tag='p' className=''>
				{review.text}
			</Typography>
		</div>
	)
}
