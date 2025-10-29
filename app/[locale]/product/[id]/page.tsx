import { getProductById } from '@/lib/api/clientApi'
import { ProductDetails } from '@/features/products/ProductDetails'
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
		openGraph: {
			title: `Note: ${product?.title}`,
			description: product?.description,
			images: [{ url: product.image, alt: product.title }],
			siteName: 'FakeStore',
			type: 'article',
		},
		twitter: {
			card: 'summary_large_image',
			title: product.title,
			description: product.description,
			images: [product.image],
		},
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
