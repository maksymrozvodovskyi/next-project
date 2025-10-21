'use client'

import { useFilters } from '@/lib/use-filters'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function ActiveFilters() {
	const { searchQuery, minPrice, maxPrice, categories, setSearchQuery, setMinPrice, setMaxPrice, removeCategory } =
		useFilters()

	const hasActiveFilters = searchQuery || minPrice > 0 || maxPrice < 1000 || categories.length > 0

	if (!hasActiveFilters) {
		return null
	}

	return (
		<div className='mb-6'>
			<div className='flex flex-wrap items-center gap-2'>
				<span className='text-sm font-medium text-gray-700'>Active filters:</span>

				{searchQuery && (
					<span className='inline-flex items-center gap-1 rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-800'>
						Search: &quot;{searchQuery}&quot;
						<button
							onClick={() => setSearchQuery('')}
							className='ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full text-indigo-600 hover:bg-indigo-200'
						>
							<XMarkIcon className='h-3 w-3' />
						</button>
					</span>
				)}

				{(minPrice > 0 || maxPrice < 1000) && (
					<span className='inline-flex items-center gap-1 rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-800'>
						Price: ${minPrice} - ${maxPrice}
						<button
							onClick={() => {
								setMinPrice(0)
								setMaxPrice(1000)
							}}
							className='ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full text-indigo-600 hover:bg-indigo-200'
						>
							<XMarkIcon className='h-3 w-3' />
						</button>
					</span>
				)}

				{categories.map(category => (
					<span
						key={category}
						className='inline-flex items-center gap-1 rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-800'
					>
						Category: {category}
						<button
							onClick={() => removeCategory(category)}
							className='ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full text-indigo-600 hover:bg-indigo-200'
						>
							<XMarkIcon className='h-3 w-3' />
						</button>
					</span>
				))}
			</div>
		</div>
	)
}
