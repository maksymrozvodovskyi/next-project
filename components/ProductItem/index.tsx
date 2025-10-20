import Link from 'next/link'
import { Product } from '@/types/productTypes'

export type ProductItemProps = {
	item: Product
}

export default function ProductItem({ item }: ProductItemProps) {
	return (
		<li className='border border-gray-200 rounded-lg p-3 sm:p-4 lg:p-5 xl:p-6 p-1920-xl bg-white shadow-sm hover:shadow-lg transition-all duration-300 h-full hover:scale-105'>
			<Link href={`/product/${item.id}`} className='block h-full flex flex-col'>
				<h3 className='text-sm sm:text-base lg:text-lg xl:text-xl text-1920-xl font-semibold text-gray-900 mb-2 sm:mb-3 line-clamp-2 flex-1'>
					{item?.title}
				</h3>
				<p className='text-lg sm:text-xl lg:text-2xl xl:text-3xl text-1920-3xl font-bold text-blue-600 mb-2 sm:mb-3'>
					${item?.price}
				</p>
				<p className='text-xs sm:text-sm lg:text-base text-1920-base text-gray-600 line-clamp-2'>{item?.description}</p>
			</Link>
		</li>
	)
}
