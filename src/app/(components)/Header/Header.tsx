import { Typography } from '@/components/ui'

export const Header = () => {
	return (
		<header className='bg-gray mx-[229px] mt-[54px] flex h-[132px] items-center justify-center rounded-[15px] text-center'>
			<Typography tag='h1' className=''>
				Тестовое задание
			</Typography>
		</header>
	)
}
