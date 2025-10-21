import { getProductsByCategory } from '@/lib/api'
import ProductList from '@/components/ProductList'
import FilterSidebar from '@/components/FilterSidebar'

function formatCategoryName(category: string): string {
	const decoded = decodeURIComponent(category)
	return decoded.replace(/\b\w/g, l => l.toUpperCase()).replace(/'[A-Z]/g, match => match.toLowerCase())
}

export type CategoryPageProps = {
	params: Promise<{ id: string }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
	const { id: categoryId } = await params

	const products = await getProductsByCategory(categoryId)

	return (
		<FilterSidebar title={formatCategoryName(categoryId)} products={products}>
			<ProductList products={products} />
		</FilterSidebar>
	)
}
