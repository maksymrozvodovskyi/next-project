'use client'

export type ErrorProps = {
	error: Error
	reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
	return (
		<div className='text-center py-8 sm:py-12 lg:py-16'>
			<h2 className='text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8'>
				Error while downloading
			</h2>
			<p className='text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 mb-6 sm:mb-8 lg:mb-10 max-w-2xl mx-auto'>
				{error.message}
			</p>
			<button
				onClick={reset}
				className='bg-blue-600 text-white text-sm sm:text-base lg:text-lg px-5 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-lg hover:bg-blue-700 transition-colors'
			>
				Try again
			</button>
		</div>
	)
}
