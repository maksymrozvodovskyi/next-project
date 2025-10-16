import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getSingleProduct } from '@/lib/api'
import ProductDetailsClient from './ProductDetails.client'

type Props = {
	params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: Props) {
	const { id } = await params
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery({
		queryKey: ['product', id],
		queryFn: () => getSingleProduct(id),
	})

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<ProductDetailsClient />
		</HydrationBoundary>
	)
}
