import { getProductsByCategory, categoryExists } from '@/lib/api'
import ProductList from '@/components/ProductList/ProductList'
import { CategoryPageProps } from '@/types/types'
import { notFound } from 'next/navigation'

export default async function CategoryPage({ params }: CategoryPageProps) {
	const { id: category } = await params

	const categoryCheck = await categoryExists(category)
	if (!categoryCheck.exists) {
		notFound()
	}

	const products = await getProductsByCategory(category)

	return (
		<div className='space-y-6'>
			<div className='text-center'>
				<h1 className='text-3xl font-bold text-gray-900 mb-2 capitalize'>{category}</h1>
				<p className='text-gray-600'>Products in this category</p>
			</div>
			<ProductList category={category} products={products} />
		</div>
	)
}
