import FilterPanel from '@/components/Filters/FilterPanel'

export default async function CategoryLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='bg-white'>
			<div>
				<main className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
					<section aria-labelledby='products-heading' className='pt-6 pb-24'>
						<h2 id='products-heading' className='sr-only'>
							Products
						</h2>

						<div className='grid grid-cols-1 gap-8 lg:grid-cols-4'>
							<div className='lg:col-span-1'>
								<FilterPanel />
							</div>

							<div className='lg:col-span-3'>{children}</div>
						</div>
					</section>
				</main>
			</div>
		</div>
	)
}
