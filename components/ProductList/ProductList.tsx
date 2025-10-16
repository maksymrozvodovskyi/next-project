'use client'

import { useQuery } from '@tanstack/react-query'
import { getProductsByCategory } from '@/lib/api'
import ProductItem from '../ProductItem/ProductItem'

type Props = {
	category: string
}

export default function ProductList({ category }: Props) {
	const { data, isLoading, error } = useQuery({
		queryKey: ['products', category],
		queryFn: () => getProductsByCategory(category),
	})

	console.log('ProductList Debug:', { category, data, isLoading, error })

	if (isLoading) return <div>Loading...</div>
	if (error) return <div>Error loading products: {error.message}</div>
	if (!data || data.length === 0) return <div>No products found</div>

	return (
		<div>
			<h2>Products in category: {category}</h2>
			<p>Found {data.length} products</p>
			<ul>
				{data.map(item => (
					<ProductItem key={item.id} item={item} />
				))}
			</ul>
		</div>
	)
}
