'use client'

import { useFilters } from '@/lib/use-filters'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function TextFilter() {
	const { searchQuery, setSearchQuery } = useFilters()

	return (
		<div className='space-y-3'>
			<h3 className='text-sm font-medium text-gray-900'>Search</h3>
			<div className='relative'>
				<div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
					<MagnifyingGlassIcon className='h-4 w-4 text-gray-400' />
				</div>
				<input
					type='text'
					placeholder='Search products...'
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
					className='block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
				/>
			</div>
		</div>
	)
}
