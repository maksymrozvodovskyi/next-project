'use client'

import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { useCartStore } from '@/stores/cartStore'
import { Product } from '@/lib/types/productTypes'

interface AddToCartButtonProps {
	product: Product
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
	const { addItem, openCart } = useCartStore()

	const handleAddToCart = () => {
		addItem({
			id: product.id,
			name: product.title,
			price: product.price,
			quantity: 1,
			image: product.image,
		})
		openCart()
	}

	return (
		<button
			onClick={handleAddToCart}
			className='flex-1 bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors flex items-center justify-center space-x-2'
		>
			<ShoppingCartIcon className='h-6 w-6' />
			<span>Add to Cart</span>
		</button>
	)
}
