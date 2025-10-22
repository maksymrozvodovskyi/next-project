'use client'

import { useFilters } from '@/lib/use-filters'
import { useState, useEffect } from 'react'

export default function PriceFilter() {
	const { minPrice, maxPrice, setPriceRange } = useFilters()
	const [localRange, setLocalRange] = useState<[string, string]>(['0', '1000'])

	useEffect(() => {
		const displayMaxPrice = maxPrice === 0 ? 1000 : maxPrice
		setLocalRange([minPrice.toString(), displayMaxPrice.toString()])
	}, [minPrice, maxPrice])

	const handleMinChange = (value: string) => {
		const newRange: [string, string] = [value, localRange[1]]
		setLocalRange(newRange)
		setPriceRange([Number(value), Number(localRange[1])])
	}

	const handleMaxChange = (value: string) => {
		const newRange: [string, string] = [localRange[0], value]
		setLocalRange(newRange)
		setPriceRange([Number(localRange[0]), Number(value)])
	}

	return (
		<div className='space-y-4'>
			<h3 className='text-sm font-medium text-gray-900'>Price Range</h3>
			<div className='space-y-3'>
				<div>
					<label htmlFor='min-price' className='block text-xs text-gray-600 mb-1'>
						Min Price
					</label>
					<input
						id='min-price'
						type='text'
						value={localRange[0]}
						onChange={e => handleMinChange(e.target.value)}
						className='w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
					/>
				</div>
				<div>
					<label htmlFor='max-price' className='block text-xs text-gray-600 mb-1'>
						Max Price
					</label>
					<input
						id='max-price'
						type='text'
						value={localRange[1]}
						onChange={e => handleMaxChange(e.target.value)}
						className='w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
					/>
				</div>
			</div>
			<div className='text-xs text-gray-500'>
				Range: ${localRange[0]} - ${localRange[1]}
			</div>
		</div>
	)
}
