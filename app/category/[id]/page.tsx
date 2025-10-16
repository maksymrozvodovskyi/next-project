import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getProductsByCategory } from '@/lib/api'
import ProductList from '@/components/ProductList/ProductList'

type Props = {
	params: Promise<{ id: string }>
}

export default async function CategoryPage({ params }: Props) {
	const { id: category } = await params
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery({
		queryKey: ['products', category],
		queryFn: () => getProductsByCategory(category),
	})

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<div className='space-y-6'>
				<div className='text-center'>
					<h1 className='text-3xl font-bold text-gray-900 mb-2 capitalize'>{category}</h1>
					<p className='text-gray-600'>Products in this category</p>
				</div>
				<ProductList category={category} />
			</div>
		</HydrationBoundary>
	)
}
