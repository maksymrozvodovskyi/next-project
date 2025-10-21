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
			<div>
				<div />
			</div>
		)

	if (error) return <div>Error: {error.message}</div>

	if (!product) return <div>Product not found</div>

	return (
		<div>
			<div>
				{product?.image && (
					<div>
						<Image
							src={product?.image}
							alt={product?.title || 'Product image'}
							fill
							sizes='(max-width: 1024px) 100vw, 50vw'
						/>
					</div>
				)}
				<div>
					<h1>{product?.title}</h1>
					<div>${product?.price}</div>
					<div>{product?.category}</div>
					<p>{product?.description}</p>
				</div>
			</div>
		</div>
	)
}
