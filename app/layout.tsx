import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import TenStackProvider from '@/components/TenStackProvider'

const roboto = Roboto({
	subsets: ['latin'],
	weight: ['400', '700'],
	variable: '--font-roboto',
	display: 'swap',
})

export const metadata: Metadata = {
	title: 'FakeStore',
	description: 'FakeStore is a fake store API',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${roboto.variable} antialiased bg-gray-50 text-gray-900`}>
				<TenStackProvider>
					<div className='min-h-screen flex flex-col'>
						<Header />
						<main className='container-1920 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12'>
							{children}
						</main>
						<Footer />
					</div>
				</TenStackProvider>
			</body>
		</html>
	)
}
