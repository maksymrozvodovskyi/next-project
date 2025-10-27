import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import TenStackProvider from '@/components/TenStackProvider'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import CartDrawer from '@/components/Cart/CartDrawer'
import { getCategories } from '@/lib/api/clientApi'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'

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

export function generateStaticParams() {
	return routing.locales.map(locale => ({ locale }))
}

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode
	params: Promise<{ locale: string }>
}>) {
	const categories = await getCategories()
	const { locale } = await params

	if (!hasLocale(routing.locales, locale)) {
		notFound()
	}

	setRequestLocale(locale)

	return (
		<html lang='en' className='h-full'>
			<body className={`${roboto.variable} h-full flex flex-col`} suppressHydrationWarning>
				<NextIntlClientProvider>
					<NuqsAdapter>
						<TenStackProvider>
							<div className='flex flex-col h-full'>
								<Header categories={categories} />
								<main className='flex-1'>{children}</main>
								<Footer />
								<CartDrawer />
							</div>
						</TenStackProvider>
					</NuqsAdapter>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
