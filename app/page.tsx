import CategoryList from '@/components/CategoryList/CategotyList'

export default function Home() {
	return (
		<section className='space-y-6'>
			<div className='text-center'>
				<h1 className='text-3xl font-bold text-gray-900 mb-2'>Welcome to FakeStore</h1>
				<p className='text-gray-600'>Browse our product categories</p>
			</div>
			<CategoryList />
		</section>
	)
}
