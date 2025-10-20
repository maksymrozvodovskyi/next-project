import { getProductsByCategory } from '@/lib/api'
import ProductList from '@/components/ProductList'

export type CategoryPageProps = {
	params: Promise<{ category: string }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
	const { category: category } = await params

	const products = await getProductsByCategory(category)

	return (
		<div className='space-y-6 sm:space-y-8 lg:space-y-12 space-y-1920-lg'>
			<div className='text-center'>
				<h1 className='text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-1920-5xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6 capitalize'>
					{category}
				</h1>
				<p className='text-sm sm:text-base lg:text-lg xl:text-xl text-1920-xl text-gray-600'>
					Products in this category
				</p>
			</div>
			<ProductList products={products} />
		</div>
	)
}
