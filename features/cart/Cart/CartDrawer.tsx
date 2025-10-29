'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useCartStore } from '@/stores/cartStore'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'

export default function CartDrawer() {
	const { items, isOpen, removeItem, updateQuantity, closeCart, getTotalPrice } = useCartStore()

	const handleQuantityChange = (id: number, newQuantity: number) => {
		if (newQuantity < 1) {
			removeItem(id)
		} else {
			updateQuantity(id, newQuantity)
		}
	}

	return (
		<Dialog open={isOpen} onClose={closeCart} className='relative z-50'>
			<DialogBackdrop
				transition
				className='fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0'
			/>

			<div className='fixed inset-0 overflow-hidden'>
				<div className='absolute inset-0 overflow-hidden'>
					<div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16'>
						<DialogPanel
							transition
							className='pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700'
						>
							<div className='flex h-full flex-col overflow-y-auto bg-white shadow-xl'>
								<div className='flex-1 overflow-y-auto px-4 py-6 sm:px-6'>
									<div className='flex items-start justify-between'>
										<DialogTitle className='text-lg font-medium text-gray-900'>Shopping cart</DialogTitle>
										<div className='ml-3 flex h-7 items-center'>
											<button
												type='button'
												onClick={closeCart}
												className='relative -m-2 p-2 text-gray-400 hover:text-gray-500'
											>
												<span className='absolute -inset-0.5' />
												<span className='sr-only'>Close panel</span>
												<XMarkIcon aria-hidden='true' className='size-6' />
											</button>
										</div>
									</div>

									<div className='mt-8'>
										{items.length === 0 ? (
											<div className='text-center py-12'>
												<div className='mx-auto h-24 w-24 text-gray-400 mb-4'>
													<svg fill='none' viewBox='0 0 24 24' stroke='currentColor' className='w-full h-full'>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															strokeWidth={1}
															d='M3 3h2l.4 2M7 13h10l4-8H5.4m.6 8l-.8 4m0 0L5 21h14M7 17h10'
														/>
													</svg>
												</div>
												<h3 className='text-lg font-medium text-gray-900 mb-2'>Your cart is empty</h3>
												<p className='text-gray-500 mb-6'>Start adding some items to your cart.</p>
												<button
													onClick={closeCart}
													className='bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors'
												>
													Continue Shopping
												</button>
											</div>
										) : (
											<div className='flow-root'>
												<ul role='list' className='-my-6 divide-y divide-gray-200'>
													{items.map(item => (
														<li key={item.id} className='flex py-6'>
															<div className='size-24 shrink-0 overflow-hidden rounded-md border border-gray-200'>
																{item.image && (
																	<Image
																		src={item.image}
																		alt={item.name}
																		width={96}
																		height={96}
																		className='size-full object-cover'
																	/>
																)}
															</div>

															<div className='ml-4 flex flex-1 flex-col'>
																<div>
																	<div className='flex justify-between text-base font-medium text-gray-900'>
																		<h3>
																			<Link href={`/product/${item.id}`} onClick={closeCart}>
																				{item.name}
																			</Link>
																		</h3>
																		<p className='ml-4'>${item.price.toFixed(2)}</p>
																	</div>
																</div>
																<div className='flex flex-1 items-end justify-between text-sm'>
																	<div className='flex items-center space-x-2'>
																		<label htmlFor={`quantity-${item.id}`} className='text-gray-500'>
																			Qty:
																		</label>
																		<input
																			id={`quantity-${item.id}`}
																			type='number'
																			min='1'
																			value={item.quantity}
																			onChange={e => handleQuantityChange(item.id, parseInt(e.target.value) || 0)}
																			className='w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm'
																		/>
																	</div>

																	<div className='flex'>
																		<button
																			type='button'
																			onClick={() => removeItem(item.id)}
																			className='font-medium text-indigo-600 hover:text-indigo-500'
																		>
																			Remove
																		</button>
																	</div>
																</div>
															</div>
														</li>
													))}
												</ul>
											</div>
										)}
									</div>
								</div>

								{items.length > 0 && (
									<div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
										<div className='flex justify-between text-base font-medium text-gray-900'>
											<p>Subtotal</p>
											<p>${getTotalPrice().toFixed(2)}</p>
										</div>
										<p className='mt-0.5 text-sm text-gray-500'>Shipping and taxes calculated at checkout.</p>
										<div className='mt-6'>
											<button className='flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700 transition-colors'>
												Checkout
											</button>
										</div>
										<div className='mt-6 flex justify-center text-center text-sm text-gray-500'>
											<p>
												or{' '}
												<button
													type='button'
													onClick={closeCart}
													className='font-medium text-indigo-600 hover:text-indigo-500'
												>
													Continue Shopping
													<span aria-hidden='true'> &rarr;</span>
												</button>
											</p>
										</div>
									</div>
								)}
							</div>
						</DialogPanel>
					</div>
				</div>
			</div>
		</Dialog>
	)
}
