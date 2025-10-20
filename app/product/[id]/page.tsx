import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getProductById } from '@/lib/api'
import ProductDetailsClient from './ProductDetails.client'
import { QueryKeys } from '@/types/enums'

export type ProductPageProps = {
	params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
	const { id } = await params
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery({
		queryKey: [QueryKeys.PRODUCT, id],
		queryFn: () => getProductById(id),
	})

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<ProductDetailsClient />
		</HydrationBoundary>
	)
}
