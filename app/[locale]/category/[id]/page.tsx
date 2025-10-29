import { getProductsByCategory } from '@/lib/api/clientApi'
import ProductList from '@/features/products/ProductList'

export type Props = {
	params: Promise<{ id: string }>
}

export default async function CategoryPage({ params }: Props) {
	const { id: categoryId } = await params
	const products = await getProductsByCategory(categoryId)

	return <ProductList products={products} />
}
