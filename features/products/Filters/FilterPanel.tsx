'use client'

import PriceFilter from './PriceFilter'
import SortByOrderFilter from './SortByOrderFilter'
import TextFilter from './TextFilter'
import { useFilters } from '@/hooks/use-filters'
import { Button } from '@/components/ui/button'

export default function FilterPanel() {
	const { resetFilters, searchQuery, minPrice, maxPrice, categories, sortBy } = useFilters()

	const hasActiveFilters = searchQuery || minPrice > 0 || maxPrice < 1000 || categories.length > 0 || sortBy

	return (
		<div className='bg-white p-6 rounded-lg shadow-sm border border-gray-200'>
			<div className='space-y-8'>
				<TextFilter />

				<PriceFilter />

				<SortByOrderFilter />
			</div>

			{hasActiveFilters && (
				<div className='mt-8 pt-6 border-t border-gray-200'>
					<Button onClick={resetFilters} variant='outline' size='sm' className='w-full'>
						Clear All Filters
					</Button>
				</div>
			)}
		</div>
	)
}
