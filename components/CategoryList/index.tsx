import Link from 'next/link'

type Props = {
	categories: string[]
}

export default async function CategoryList({ categories }: Props) {
	return (
		<div className='space-y-4 sm:space-y-6 lg:space-y-8 space-y-1920-lg'>
			<h2 className='text-lg sm:text-xl lg:text-2xl xl:text-3xl text-1920-3xl font-semibold text-gray-900 text-center'>
				Categories
			</h2>
			<ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 gap-1920-xl'>
				{categories.map(item => (
					<li key={item}>
						<Link
							href={`/category/${item}`}
							className='block p-4 sm:p-5 lg:p-6 xl:p-7 p-1920-xl bg-white border border-gray-200 rounded-lg text-center hover:bg-blue-50 hover:border-blue-300 transition-colors shadow-sm hover:shadow-md'
						>
							<h3 className='font-medium text-gray-900 capitalize text-sm sm:text-base lg:text-lg xl:text-xl text-1920-xl'>
								{item}
							</h3>
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
