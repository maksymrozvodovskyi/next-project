'use client'

import { useQuery } from '@tanstack/react-query'
import { getProductById } from '@/lib/api'
import { useParams, useRouter } from 'next/navigation'
import { QUERY_KEYS } from '@/types/enums'
import Image from 'next/image'
import { ArrowLeftIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { AccordionDemo } from '@/components/ProductDetails/AccordionDemo'
import { useCart } from '@/lib/cart-context'

export default function ProductDetailsClient() {
	const { id } = useParams<{ id: string }>()
	const router = useRouter()
	const { addItem, openCart } = useCart()

	const {
		data: product,
		isLoading,
		error,
	} = useQuery({
		queryKey: [QUERY_KEYS.PRODUCT, id],
		queryFn: () => getProductById(id),
		refetchOnMount: true,
	})

	if (isLoading)
		return (
			<div className='bg-gray-50 py-12'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='mb-8'>
						<div className='h-4 bg-gray-200 rounded w-32 animate-pulse'></div>
					</div>

					<div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
						<div className='aspect-square bg-gray-200 rounded-2xl animate-pulse'></div>

						<div className='space-y-6'>
							<div className='h-8 bg-gray-200 rounded w-3/4 animate-pulse'></div>
							<div className='h-6 bg-gray-200 rounded w-1/3 animate-pulse'></div>
							<div className='h-6 bg-gray-200 rounded w-1/4 animate-pulse'></div>
							<div className='space-y-3'>
								<div className='h-4 bg-gray-200 rounded animate-pulse'></div>
								<div className='h-4 bg-gray-200 rounded animate-pulse'></div>
								<div className='h-4 bg-gray-200 rounded w-2/3 animate-pulse'></div>
							</div>
							<div className='flex gap-4'>
								<div className='h-12 bg-gray-200 rounded-lg w-32 animate-pulse'></div>
								<div className='h-12 bg-gray-200 rounded-lg w-32 animate-pulse'></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)

	if (error)
		return (
			<div className='bg-gray-50 flex items-center justify-center flex-1'>
				<div className='text-center'>
					<div className='mb-4'>
						<svg className='mx-auto h-12 w-12 text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
							/>
						</svg>
					</div>
					<h3 className='text-lg font-medium text-gray-900 mb-2'>Something went wrong</h3>
					<p className='text-gray-500 mb-4'>{error.message}</p>
					<button
						onClick={() => window.location.reload()}
						className='bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors'
					>
						Try again
					</button>
				</div>
			</div>
		)

	if (!product)
		return (
			<div className='bg-gray-50 flex items-center justify-center flex-1'>
				<div className='text-center'>
					<div className='mb-4'>
						<svg className='mx-auto h-12 w-12 text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.636M15 6.334c2.25 0 4.083 1.75 4.083 3.909 0 .91-.375 1.734-.984 2.326'
							/>
						</svg>
					</div>
					<h3 className='text-lg font-medium text-gray-900 mb-2'>Product not found</h3>
					<p className='text-gray-500 mb-4'>
						The product you&apos;re looking for doesn&apos;t exist or has been removed.
					</p>
					<button
						onClick={() => router.push('/')}
						className='bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors'
					>
						Back to Home
					</button>
				</div>
			</div>
		)

	const handleAddToCart = () => {
		if (product) {
			addItem({
				id: product.id,
				name: product.title,
				price: product.price,
				quantity: 1,
				image: product.image,
			})
			openCart()
		}
	}

	return (
		<div className='bg-gray-50 py-8 lg:py-12'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<nav className='mb-8'>
					<div className='flex items-center space-x-2 text-sm text-gray-500'>
						<button onClick={() => router.back()} className='flex items-center hover:text-gray-700 transition-colors'>
							<ArrowLeftIcon className='h-4 w-4 mr-1' />
							Back
						</button>
						<span>/</span>
						<span className='text-gray-900 font-medium'>{product.category}</span>
						<span>/</span>
						<span className='text-gray-900 font-medium truncate'>{product.title}</span>
					</div>
				</nav>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
					<div className='space-y-4'>
						<div className='aspect-square bg-white rounded-2xl shadow-lg overflow-hidden relative group'>
							{product.image && (
								<Image
									src={product.image}
									alt={product.title || 'Product image'}
									fill
									className='object-contain group-hover:scale-105 transition-transform duration-300'
									sizes='(max-width: 1024px) 100vw, 50vw'
									priority
								/>
							)}
						</div>
					</div>
					<div className='space-y-8'>
						<div className='space-y-4'>
							<div>
								<span className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 mb-3'>
									{product.category}
								</span>
								<h1 className='text-3xl lg:text-4xl font-bold text-gray-900 leading-tight'>{product.title}</h1>
							</div>

							<div className='flex items-baseline space-x-3'>
								<span className='text-4xl font-bold text-gray-900'>${product.price.toFixed(2)}</span>
							</div>

							<div className='border-t border-gray-200 pt-6'>
								<AccordionDemo description={product.description} />
							</div>
						</div>
						<div className='space-y-4'>
							<div className='flex gap-4'>
								<button
									onClick={handleAddToCart}
									className='flex-1 bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors flex items-center justify-center space-x-2'
								>
									<ShoppingCartIcon className='h-6 w-6' />
									<span>Add to Cart</span>
								</button>
							</div>

							<div className='text-sm text-gray-500 text-center'>Free shipping on orders over $50</div>
						</div>
						<div className='border-t border-gray-200 pt-6 space-y-4'>
							<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
								<div className='flex items-center space-x-3'>
									<svg className='h-5 w-5 text-green-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
										/>
									</svg>
									<span className='text-sm text-gray-600'>Free shipping</span>
								</div>
								<div className='flex items-center space-x-3'>
									<svg className='h-5 w-5 text-green-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
										/>
									</svg>
									<span className='text-sm text-gray-600'>30-day return</span>
								</div>
								<div className='flex items-center space-x-3'>
									<svg className='h-5 w-5 text-green-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z'
										/>
									</svg>
									<span className='text-sm text-gray-600'>1-year warranty</span>
								</div>
								<div className='flex items-center space-x-3'>
									<svg className='h-5 w-5 text-green-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z'
										/>
									</svg>
									<span className='text-sm text-gray-600'>24/7 support</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
