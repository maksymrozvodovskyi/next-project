'use client'

import { useQuery } from '@tanstack/react-query'
import { getSingleProduct } from '@/lib/api'
import { useParams } from 'next/navigation'
import { QueryKeys } from '@/types/types'

export default function ProductDetailsClient() {
	const { id } = useParams<{ id: string }>()

	const {
		data: product,
		isLoading,
		error,
	} = useQuery({
		queryKey: [QueryKeys.PRODUCT, id],
		queryFn: () => getSingleProduct(id),
		refetchOnMount: true,
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
				Error: {error.message}
			</div>
		)

	if (!product)
		return (
			<div className='bg-gray-50 border border-gray-200 rounded-lg p-8 text-center text-gray-600'>
				Product not found
			</div>
		)

	return (
		<div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4'>
			<h1 className='text-2xl font-bold text-gray-900'>{product?.title}</h1>
			<div className='text-3xl font-bold text-blue-600'>${product?.price}</div>
			<div className='text-sm text-gray-500 uppercase tracking-wide'>{product?.category}</div>
			<p className='text-gray-700 leading-relaxed'>{product?.description}</p>
		</div>
	)
}
