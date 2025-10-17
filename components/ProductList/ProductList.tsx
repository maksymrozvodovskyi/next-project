'use client'

import { useQuery } from '@tanstack/react-query'
import { getProductsByCategory } from '@/lib/api'
import ProductItem from '../ProductItem/ProductItem'
import { ProductListProps, QueryKeys } from '@/types/types'

export default function ProductList({ category, products }: ProductListProps) {
	const { data, isLoading, error } = useQuery({
		queryKey: [QueryKeys.PRODUCTS, category],
		queryFn: () => getProductsByCategory(category),
		initialData: products,
	})

	if (isLoading)
		return (
			<div className='flex justify-center items-center py-8'>
				<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
			</div>
		)

	if (error)
		return (
			<div className='bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-center'>
				Error loading products: {error.message}
			</div>
		)

	if (!data || data.length === 0)
		return (
			<div className='bg-gray-50 border border-gray-200 rounded-lg p-8 text-center text-gray-600'>
				No products found
			</div>
		)

	return (
		<div className='space-y-6'>
			<div className='text-center'>
				<h2 className='text-2xl font-bold text-gray-900 mb-2'>Products in {category}</h2>
				<p className='text-gray-600'>Found {data.length} products</p>
			</div>
			<ul className='space-y-4'>
				{data.map(item => (
					<ProductItem key={item.id} item={item} />
				))}
			</ul>
		</div>
	)
}
