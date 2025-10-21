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
			<body className={roboto.variable}>
				<TenStackProvider>
					<div>
						<Header />
						<main>{children}</main>
						<Footer />
					</div>
				</TenStackProvider>
			</body>
		</html>
	)
}
