import { getProductsByCategory } from '@/lib/api'
import ProductList from '@/components/ProductList'

export type CategoryPageProps = {
	params: Promise<{ category: string }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
	const { category: category } = await params

	const products = await getProductsByCategory(category)
	console.log(products)

	return (
		<div>
			<div>
				<h1>{category}</h1>
			</div>
			<ProductList products={products} />
		</div>
	)
}
