'use client'

import Link from 'next/link'

export default function NotFound() {
	return (
		<div className='text-center py-8 sm:py-12 lg:py-16'>
			<h1 className='text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8'>
				404 - Page not found
			</h1>
			<Link
				href='/'
				className='text-blue-600 hover:text-blue-800 underline text-sm sm:text-base lg:text-lg xl:text-xl transition-colors'
			>
				Go back to home
			</Link>
		</div>
	)
}
