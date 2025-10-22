'use client'

import { useFilters } from '@/lib/use-filters'

const sortOptions = [
	{ value: '', label: 'Default' },
	{ value: 'price-asc', label: 'Price: Low to High' },
	{ value: 'price-desc', label: 'Price: High to Low' },
	{ value: 'name-asc', label: 'Name: A to Z' },
	{ value: 'name-desc', label: 'Name: Z to A' },
]

export default function SortByOrderFilter() {
	const { sortBy, setSortBy } = useFilters()

	return (
		<div className='space-y-4'>
			<h3 className='text-sm font-medium text-gray-900'>Sort By</h3>
			<div className='space-y-2'>
				{sortOptions.map(option => (
					<label key={option.value} className='flex items-center space-x-2 cursor-pointer'>
						<input
							type='radio'
							name='sortBy'
							value={option.value}
							checked={sortBy === option.value}
							onChange={e => setSortBy(e.target.value)}
							className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300'
						/>
						<span className='text-sm text-gray-700'>{option.label}</span>
					</label>
				))}
			</div>
		</div>
	)
}
