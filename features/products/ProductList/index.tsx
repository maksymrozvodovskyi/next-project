'use client'

import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { Product } from '@/lib/types/productTypes'
import { useFilters } from '@/hooks/use-filters'
import { getFilteredProducts } from '@/lib/utils/filter-utils'

export type Props = {
	products?: Product[]
}

export default function ProductList({ products }: Props) {
	const { searchQuery, minPrice, maxPrice, categories, sortBy, page } = useFilters()

	const filterState = {
		searchQuery,
		minPrice,
		maxPrice,
		categories,
		sortBy,
		page,
	}

	const filteredProducts = products ? getFilteredProducts(products, filterState) : []

	const isLoading = false
	const error = null

	if (isLoading)
		return (
			<div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8'>
				{Array.from({ length: 6 }).map((_, index) => (
					<div key={index} className='group relative animate-pulse'>
						<div className='aspect-square w-full rounded-md bg-gray-300' />
						<div className='mt-4 flex justify-between'>
							<div className='h-4 w-3/4 bg-gray-300 rounded' />
							<div className='h-4 w-16 bg-gray-300 rounded' />
						</div>
					</div>
				))}
			</div>
		)

	if (error) return <div className='text-center text-red-600'>Error loading products</div>

	if (!products || products.length === 0) return <div className='text-center text-gray-600'>No products found</div>

	if (filteredProducts.length === 0)
		return <div className='text-center text-gray-600'>No products match your filters</div>

	return (
		<div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8'>
			{filteredProducts.map(product => (
				<div
					key={product.id}
					className='group relative rounded-lg border border-transparent bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-200 hover:shadow-lg hover:shadow-indigo-100'
				>
					<Link href={`/product/${product.id}`}>
						<div className='overflow-hidden rounded-md'>
							<Image
								alt={product.title || 'Product image'}
								src={product.image}
								width={400}
								height={500}
								className='h-64 object-cover transition-transform duration-500 group-hover:scale-110'
							/>
						</div>
						<div className='mt-4 flex justify-between'>
							<h3 className='text-sm font-medium text-gray-700'>{product.title}</h3>
							<p className='text-lg font-semibold text-gray-900'>${product.price}</p>
						</div>
					</Link>
				</div>
			))}
		</div>
	)
}
