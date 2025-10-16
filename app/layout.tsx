import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import TenStackProvider from '@/components/TenStackProvider/TenStackProvider'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
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
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}>
				<TenStackProvider>
					<div className='min-h-screen flex flex-col'>
						<Header />
						<main className='flex-1 max-w-6xl mx-auto w-full px-4 py-6'>{children}</main>
						<Footer />
					</div>
				</TenStackProvider>
			</body>
		</html>
	)
}
