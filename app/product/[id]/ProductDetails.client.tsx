'use client'

import { useQuery } from '@tanstack/react-query'
import { getProductById } from '@/lib/api'
import { useParams } from 'next/navigation'
import { QUERY_KEYS } from '@/types/enums'
import Image from 'next/image'

export default function ProductDetailsClient() {
	const { id } = useParams<{ id: string }>()

	const {
		data: product,
		isLoading,
		error,
	} = useQuery({
		queryKey: [QUERY_KEYS.PRODUCT, id],
		queryFn: () => getProductById(id),
		refetchOnMount: true,
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
				Error: {error.message}
			</div>
		)

	if (!product)
		return (
			<div className='bg-gray-50 border border-gray-200 rounded-lg p-6 sm:p-8 lg:p-12 text-center text-gray-600 text-sm sm:text-base lg:text-lg'>
				Product not found
			</div>
		)

	return (
		<div className='bg-white rounded-lg shadow-md border border-gray-200 p-4 sm:p-6 lg:p-8 xl:p-10 p-1920-xl max-w-4xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8 space-y-1920-lg'>
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8'>
				{product?.image && (
					<div className='relative w-full h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden'>
						<Image
							src={product.image}
							alt={product.title || 'Product image'}
							fill
							className='object-cover'
							sizes='(max-width: 1024px) 100vw, 50vw'
						/>
					</div>
				)}
				<div className='space-y-4 sm:space-y-6'>
					<h1 className='text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-1920-4xl font-bold text-gray-900'>
						{product?.title}
					</h1>
					<div className='text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-1920-5xl font-bold text-blue-600'>
						${product?.price}
					</div>
					<div className='text-xs sm:text-sm lg:text-base text-1920-base text-gray-500 uppercase tracking-wide'>
						{product?.category}
					</div>
					<p className='text-sm sm:text-base lg:text-lg xl:text-xl text-1920-xl text-gray-700 leading-relaxed'>
						{product?.description}
					</p>
				</div>
			</div>
		</div>
	)
}
