import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'

import '@/styles/globals.css'

import { CartProvider } from '@/shared/contexts/cart'

export const metadata: Metadata = {
	title: 'Тестовое задание',
	description: 'Задание для компании "О-комплекс"'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={GeistSans.className}>
				<CartProvider>{children}</CartProvider>
			</body>
		</html>
	)
}
