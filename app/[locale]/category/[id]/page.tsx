import { getProductsByCategory } from '@/lib/api/clientApi'
import ProductList from '@/features/products/ProductList'

export type Props = {
	params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props) {
	const { id } = await params

	return {
		title: `Category: ${id}`,
		description: `Explore products in the ${id} category on FakeStore.`,
		openGraph: {
			title: `Category: ${id}`,
			description: `Discover top products from the ${id} category on FakeStore.`,
			siteName: 'FakeStore',
			type: 'website',
		},
		twitter: {
			title: `Category: ${id}`,
			description: `Shop the latest ${id} items on FakeStore.`,
		},
	}
}

export default async function CategoryPage({ params }: Props) {
	const { id: categoryId } = await params
	const products = await getProductsByCategory(categoryId)

	return <ProductList products={products} />
}
