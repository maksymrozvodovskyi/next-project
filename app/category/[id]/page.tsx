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
			<ProductList category={category} />
		</HydrationBoundary>
	)
}
