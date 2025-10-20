'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { getProductsByCategory } from '@/lib/api'
import ProductItem from '../ProductItem'
import { QUERY_KEYS } from '@/types/enums'
import { Product } from '@/types/productTypes'

export type Props = {
	products?: Product[]
}

export default function ProductList({ products }: Props) {
	const params = useParams()
	const category = params.id as string
	const { data, isLoading, error } = useQuery({
		queryKey: [QUERY_KEYS.PRODUCTS, category],
		queryFn: () => getProductsByCategory(category),
		initialData: products,
	})

	if (isLoading)
		return (
			<div className='flex justify-center items-center py-12 lg:py-16'>
				<div className='animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 border-b-2 border-blue-600' />
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
		<div className='space-y-6 sm:space-y-8 lg:space-y-10 3xl:space-y-16'>
			<div className='text-center'>
				<p className='text-sm sm:text-base lg:text-lg xl:text-xl 3xl:text-2xl text-gray-600'>
					Found {data.length} {data.length === 1 ? 'product' : 'products'}
				</p>
			</div>
			<ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4 sm:gap-5 lg:gap-6 xl:gap-8 3xl:gap-10'>
				{data.map(item => (
					<ProductItem key={item.id} item={item} />
				))}
			</ul>
		</div>
	)
}
