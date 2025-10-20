import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getProductById } from '@/lib/api'
import ProductDetailsClient from './ProductDetails.client'
import { QUERY_KEYS } from '@/types/enums'

export type Props = {
	params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props) {
	const { id } = await params
	const product = await getProductById(id)

	return {
		title: `Product: ${product?.title}`,
		description: product?.description,
	}
}

export default async function ProductPage({ params }: Props) {
	const { id } = await params
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery({
		queryKey: [QUERY_KEYS.PRODUCT, id],
		queryFn: () => getProductById(id),
	})

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<ProductDetailsClient />
		</HydrationBoundary>
	)
}
