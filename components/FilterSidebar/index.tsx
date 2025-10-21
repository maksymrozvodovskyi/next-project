'use client'

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { FunnelIcon } from '@heroicons/react/20/solid'
import { useFilters } from '@/lib/use-filters'
import type { Product } from '@/types/productTypes'
import { getFilterOptionsFromProducts } from '@/lib/filter-utils'
import { Button } from '@/components/ui/button'

type Props = {
	children: React.ReactNode
	title?: string
	products?: Product[]
}

export default function FilterSidebar({ children, title = 'Products', products = [] }: Props) {
	const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)
	const { searchQuery, minPrice, maxPrice, setSearchQuery, setMinPrice, setMaxPrice, sortBy, setSortBy, resetFilters } =
		useFilters()

	const sortOptions = [
		{ value: '', label: 'Default' },
		{ value: 'price-asc', label: 'Price: Low to High' },
		{ value: 'price-desc', label: 'Price: High to Low' },
		{ value: 'name-asc', label: 'Name: A to Z' },
		{ value: 'name-desc', label: 'Name: Z to A' },
	]

	const { priceRange: availablePriceRange } = getFilterOptionsFromProducts(products)

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value)
	}

	const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = Number(e.target.value)
		setMinPrice(value)
	}

	const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = Number(e.target.value)
		setMaxPrice(value)
	}

	return (
		<div className='bg-white'>
			<div>
				<Dialog open={isMobileFiltersOpen} onClose={setIsMobileFiltersOpen} className='relative z-40 lg:hidden'>
					<DialogBackdrop
						transition
						className='fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0'
					/>

					<div className='fixed inset-0 z-40 flex'>
						<DialogPanel
							transition
							className='relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white pt-4 pb-6 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full'
						>
							<div className='flex items-center justify-end px-4'>
								<button
									type='button'
									onClick={() => setIsMobileFiltersOpen(false)}
									className='relative -mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden'
								>
									<span className='absolute -inset-0.5' />
									<span className='sr-only'>Close menu</span>
									<XMarkIcon aria-hidden='true' className='size-6' />
								</button>
							</div>

							<form className='mt-4 border-t border-gray-200'>
								<div className='border-t border-gray-200 px-4 py-6'>
									<h3 className='text-sm font-medium text-gray-900 mb-4'>Sort by</h3>
									<select
										value={sortBy}
										onChange={e => setSortBy(e.target.value)}
										className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
									>
										{sortOptions.map(option => (
											<option key={option.value} value={option.value}>
												{option.label}
											</option>
										))}
									</select>
								</div>

								<div className='border-t border-gray-200 px-4 py-6'>
									<h3 className='text-sm font-medium text-gray-900 mb-4'>Search</h3>
									<div className='relative'>
										<div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
											<MagnifyingGlassIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
										</div>
										<input
											type='text'
											placeholder='Search products...'
											value={searchQuery || ''}
											onChange={handleSearchChange}
											className='block w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
										/>
									</div>
								</div>

								<div className='border-t border-gray-200 px-4 py-6'>
									<h3 className='text-sm font-medium text-gray-900 mb-4'>Price Range</h3>
									<div className='space-y-4'>
										<div className='flex gap-2'>
											<input
												type='number'
												placeholder='Min'
												value={minPrice}
												onChange={handleMinPriceChange}
												className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm'
												min={availablePriceRange[0]}
												max={availablePriceRange[1]}
											/>
											<input
												type='number'
												placeholder='Max'
												value={maxPrice}
												onChange={handleMaxPriceChange}
												className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm'
												min={availablePriceRange[0]}
												max={availablePriceRange[1]}
											/>
										</div>
									</div>
								</div>
							</form>

							<div className='px-4 py-4 border-t border-gray-200'>
								<Button onClick={resetFilters} variant='outline' className='w-full'>
									Clear all filters
								</Button>
							</div>
						</DialogPanel>
					</div>
				</Dialog>

				<main className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
					<div className='flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6'>
						<h1 className='text-4xl font-bold tracking-tight text-gray-900'>{title}</h1>

						<div className='flex items-center'>
							<button
								type='button'
								onClick={() => setIsMobileFiltersOpen(true)}
								className='-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden'
							>
								<span className='sr-only'>Filters</span>
								<FunnelIcon aria-hidden='true' className='size-5' />
							</button>
						</div>
					</div>

					<section aria-labelledby='products-heading' className='pt-6 pb-24'>
						<h2 id='products-heading' className='sr-only'>
							Products
						</h2>

						<div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4'>
							<form className='hidden lg:block'>
								<div className='border-b border-gray-200 py-6'>
									<h3 className='text-sm font-medium text-gray-900 mb-4'>Sort by</h3>
									<select
										value={sortBy}
										onChange={e => setSortBy(e.target.value)}
										className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
									>
										{sortOptions.map(option => (
											<option key={option.value} value={option.value}>
												{option.label}
											</option>
										))}
									</select>
								</div>

								<div className='border-b border-gray-200 py-6'>
									<h3 className='text-sm font-medium text-gray-900 mb-4'>Search</h3>
									<div className='relative'>
										<div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
											<MagnifyingGlassIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
										</div>
										<input
											type='text'
											placeholder='Search products...'
											value={searchQuery || ''}
											onChange={handleSearchChange}
											className='block w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
										/>
									</div>
								</div>

								<div className='border-b border-gray-200 py-6'>
									<h3 className='text-sm font-medium text-gray-900 mb-4'>Price Range</h3>
									<div className='space-y-4'>
										<div className='flex gap-2'>
											<input
												type='number'
												placeholder='Min'
												value={minPrice}
												onChange={handleMinPriceChange}
												className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm'
												min={availablePriceRange[0]}
												max={availablePriceRange[1]}
											/>
											<input
												type='number'
												placeholder='Max'
												value={maxPrice}
												onChange={handleMaxPriceChange}
												className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm'
												min={availablePriceRange[0]}
												max={availablePriceRange[1]}
											/>
										</div>
									</div>
								</div>

								<div className='py-6'>
									<Button onClick={resetFilters} variant='outline' className='w-full'>
										Clear all filters
									</Button>
								</div>
							</form>

							<div className='lg:col-span-3'>{children}</div>
						</div>
					</section>
				</main>
			</div>
		</div>
	)
}
