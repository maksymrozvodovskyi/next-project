import { getProductsByCategory } from '@/lib/api'
import ProductList from '@/components/ProductList'
import FilterSidebar from '@/components/FilterSidebar'

export type CategoryPageProps = {
	params: Promise<{ id: string }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
	const { id: categoryId } = await params

	const products = await getProductsByCategory(categoryId)

	return (
		<FilterSidebar title={categoryId.charAt(0).toUpperCase() + categoryId.slice(1)} products={products}>
			<ProductList products={products} />
		</FilterSidebar>
	)
}
