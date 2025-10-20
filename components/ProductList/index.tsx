'use client'

import { useQuery } from '@tanstack/react-query'
import { getProductsByCategory } from '@/lib/api'
import ProductItem from '../ProductItem'
import { ProductListProps, QueryKeys } from '@/types/types'

export default function ProductList({ category, products }: ProductListProps) {
	const { data, isLoading, error } = useQuery({
		queryKey: [QueryKeys.PRODUCTS, category],
		queryFn: () => getProductsByCategory(category),
		initialData: products,
	})

	if (isLoading)
		return (
			<div className='flex justify-center items-center py-12 lg:py-16'>
				<div className='animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 border-b-2 border-blue-600'></div>
			</div>
		)

	if (error)
		return (
			<div className='bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6 lg:p-8 text-red-700 text-center text-sm sm:text-base lg:text-lg'>
				Error loading products: {error.message}
			</div>
		)

	if (!data || data.length === 0)
		return (
			<div className='bg-gray-50 border border-gray-200 rounded-lg p-6 sm:p-8 lg:p-12 text-center text-gray-600 text-sm sm:text-base lg:text-lg'>
				No products found
			</div>
		)

	return (
		<div className='space-y-6 sm:space-y-8 lg:space-y-10 space-y-1920-lg'>
			<div className='text-center'>
				<h2 className='text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-1920-4xl font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-4'>
					Products in {category}
				</h2>
				<p className='text-sm sm:text-base lg:text-lg xl:text-xl text-1920-xl text-gray-600'>
					Found {data.length} {data.length === 1 ? 'product' : 'products'}
				</p>
			</div>
			<ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-5 lg:gap-6 xl:gap-8 gap-1920-xl'>
				{data.map(item => (
					<ProductItem key={item.id} item={item} />
				))}
			</ul>
		</div>
	)
}
