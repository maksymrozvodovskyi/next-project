'use client'

import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { useCartStore } from '@/stores/cartStore'

export default function CartButton() {
	const { openCart, getTotalItems } = useCartStore()
	const itemCount = getTotalItems()

	return (
		<button
			type='button'
			onClick={openCart}
			className='relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500'
		>
			<span className='absolute -inset-1.5' />
			<span className='sr-only'>View shopping cart</span>
			<ShoppingCartIcon aria-hidden='true' className='size-6' />
			{itemCount > 0 && (
				<span
					className='absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full min-w-[1.25rem] h-5'
					suppressHydrationWarning
				>
					{itemCount > 99 ? '99+' : itemCount}
				</span>
			)}
		</button>
	)
}
