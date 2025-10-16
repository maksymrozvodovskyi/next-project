'use client'

import { useQuery } from '@tanstack/react-query'
import { getSingleProduct } from '@/lib/api'
import { useParams } from 'next/navigation'

export default function ProductDetailsClient() {
	const { id } = useParams<{ id: string }>()

	const {
		data: product,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['product', id],
		queryFn: () => getSingleProduct(id),
		refetchOnMount: true,
	})

	if (isLoading) return <div>Loading...</div>

	if (error) return <div>Error: {error.message}</div>

	if (!product) return <div>Product not found</div>

	return (
		<div>
			<h1>{product.title}</h1>
			<p>{product.description}</p>
			<p>{product.price}</p>
			<p>{product.category}</p>
		</div>
	)
}
