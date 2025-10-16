import { getCategories } from '@/lib/api'
import Link from 'next/link'

export default async function CategoryList() {
	const categories = await getCategories()

	return (
		<div className='space-y-4'>
			<h2 className='text-xl font-semibold text-gray-900 mb-4'>Categories</h2>
			<ul className='grid grid-cols-2 gap-3'>
				{categories.map(item => (
					<li key={item}>
						<Link
							href={`/category/${item}`}
							className='block p-4 bg-white border border-gray-200 rounded-lg text-center hover:bg-blue-50 hover:border-blue-300 transition-colors'
						>
							<h3 className='font-medium text-gray-900 capitalize'>{item}</h3>
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
