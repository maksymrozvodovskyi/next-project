import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { AccordionDemo } from '@/components/ProductDetails/AccordionDemo'
import { AddToCartButton } from '@/components/ProductDetails/AddToCartButton'
import { Product } from '@/types/productTypes'

interface ProductDetailsProps {
	product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
	return (
		<div className='bg-gray-50 py-8 lg:py-12'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<nav className='mb-8'>
					<div className='flex items-center space-x-2 text-sm text-gray-500'>
						<Link href='/' className='flex items-center hover:text-gray-700 transition-colors'>
							<ArrowLeftIcon className='h-4 w-4 mr-1' />
							Back
						</Link>
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
								<AddToCartButton product={product} />
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
