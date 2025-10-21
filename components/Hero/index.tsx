'use client'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getCategories } from '@/lib/api'

export default function Hero() {
	const [categories, setCategories] = useState<string[]>([])

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const data = await getCategories()
				setCategories(data)
			} catch (error) {
				console.error('Error fetching categories:', error)
			}
		}
		fetchCategories()
	}, [])

	return (
		<div className='bg-gray-900'>
			<div className='relative isolate px-6 pt-14 lg:px-8'>
				<div
					aria-hidden='true'
					className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
				>
					<div
						style={{
							clipPath:
								'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
						}}
						className='relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75'
					/>
				</div>
				<div className='mx-auto max-w-2xl py-32 sm:py-48 lg:py-56'>
					<div className='text-center'>
						<h1 className='text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl'>
							Your ultimate online store
						</h1>
						<p className='mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8'>
							Discover a wide range of quality products across various categories. We offer the best products at
							affordable prices with fast and reliable delivery worldwide.
						</p>
						<div className='mt-10 flex flex-wrap items-center justify-center gap-2 md:flex-row'>
							<Menu as='div' className='relative'>
								<MenuButton
									as={Button}
									variant='outline'
									className='bg-transparent border-white text-white hover:bg-white hover:text-gray-900 inline-flex items-center'
								>
									Shop products
								</MenuButton>
								<MenuItems
									transition
									className='absolute left-1/2 transform -translate-x-1/2 z-50 mt-2 w-48 origin-top rounded-md bg-white py-1 shadow-lg outline outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in'
								>
									{categories.map(category => (
										<MenuItem key={category}>
											<Link
												href={`/category/${category}`}
												className='block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden capitalize hover:bg-gray-100 transition-colors'
											>
												{category.replace(/([A-Z])/g, ' $1').trim()}
											</Link>
										</MenuItem>
									))}
								</MenuItems>
							</Menu>
						</div>
					</div>
				</div>
				<div
					aria-hidden='true'
					className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'
				>
					<div
						style={{
							clipPath:
								'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
						}}
						className='relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75'
					/>
				</div>
			</div>
		</div>
	)
}
