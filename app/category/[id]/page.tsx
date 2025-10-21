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
		<div className='bg-gray-50'>
			<div className='px-4 sm:px-6 lg:px-8 py-8'>
				<h1 className='text-3xl font-bold text-gray-900 capitalize'>{category}</h1>
			</div>
			<ProductList products={products} />
		</div>
	)
}
