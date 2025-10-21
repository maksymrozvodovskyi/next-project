'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { getProductsByCategory } from '@/lib/api'
import Link from 'next/link'
import Image from 'next/image'
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
			<div>
				<div />
			</div>
		)

	if (error) return <div>Error loading products: {error.message}</div>

	if (!data || data.length === 0) return <div>No products found</div>

	return (
		<div className='bg-white'>
			<div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
				<h2 className='text-2xl font-bold tracking-tight text-gray-900'>Products</h2>

				<div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
					{data.map(product => (
						<div key={product.id} className='group relative'>
							<Link href={`/product/${product.id}`}>
								{product?.image && (
									<Image
										alt={product.title || 'Product image'}
										src={product.image}
										width={400}
										height={400}
										className='aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80'
									/>
								)}
								<div className='mt-4 flex justify-between'>
									<div>
										<h3 className='text-sm text-gray-700'>
											<span aria-hidden='true' className='absolute inset-0' />
											{product.title}
										</h3>
									</div>
									<p className='text-lg font-medium text-gray-900'>${product.price}</p>
								</div>
							</Link>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
