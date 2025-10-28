'use client'

import { Button } from '@/components/ui/button'

export type Props = {
	error: Error
	reset: () => void
}

export default function Error({ error, reset }: Props) {
	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
			<div className='max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center'>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>Error while downloading</h2>

				<p className='text-gray-600 mb-8 leading-relaxed'>{error.message}</p>

				<Button onClick={reset} className='w-full' size='lg'>
					Try again
				</Button>
			</div>
		</div>
	)
}
