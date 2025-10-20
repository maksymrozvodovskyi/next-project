import CategoryList from '@/components/CategoryList'

export default function Home() {
	return (
		<section className='space-y-6 sm:space-y-8 lg:space-y-12 space-y-1920-lg'>
			<div className='text-center'>
				<h1 className='text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-1920-5xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6'>
					Welcome to <span className='text-blue-600'>FakeStore</span>
				</h1>
			</div>
			<CategoryList />
		</section>
	)
}
