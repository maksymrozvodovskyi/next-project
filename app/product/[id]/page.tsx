import { getProductById } from '@/lib/api'
import { ProductDetails } from '@/components/ProductDetails'
import { notFound } from 'next/navigation'

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

	try {
		const product = await getProductById(id)

		if (!product) {
			notFound()
		}

		return <ProductDetails product={product} />
	} catch {
		notFound()
	}
}
