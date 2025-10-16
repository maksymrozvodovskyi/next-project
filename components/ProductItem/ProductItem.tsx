import { Product } from '@/lib/api'
import Link from 'next/link'

type Props = {
	item: Product
}

export default function ProductItem({ item }: Props) {
	return (
		<li className='border border-gray-200 rounded-lg p-4 mb-4 bg-white shadow-sm hover:shadow-md transition-shadow'>
			<Link href={`/product/${item.id}`} className='block'>
				<h3 className='text-lg font-semibold text-gray-900 mb-2 line-clamp-2'>{item.title}</h3>
				<p className='text-xl font-bold text-blue-600 mb-2'>${item.price}</p>
				<p className='text-sm text-gray-600 line-clamp-3'>{item.description}</p>
			</Link>
		</li>
	)
}
