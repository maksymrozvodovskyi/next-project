'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NotFound() {
	const router = useRouter()

	useEffect(() => {
		const timer = setTimeout(() => router.push('/'), 3000)
		return () => clearTimeout(timer)
	}, [router])

	return (
		<div className='text-center py-8 sm:py-12 lg:py-16'>
			<h1 className='text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8'>
				404 - Page not found
			</h1>
			<p className='text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 mb-6 sm:mb-8 lg:mb-10 max-w-2xl mx-auto'>
				You will be redirected to the main page in a few seconds...
			</p>
			<Link
				href='/'
				className='text-blue-600 hover:text-blue-800 underline text-sm sm:text-base lg:text-lg xl:text-xl transition-colors'
			>
				Go back to home
			</Link>
		</div>
	)
}
