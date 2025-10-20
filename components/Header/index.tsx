import Link from 'next/link'

export default function Header() {
	return (
		<header className='bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 3xl:px-12 py-3 sm:py-4 lg:py-5'>
				<div className='flex items-center justify-between'>
					<Link
						href='/'
						className='text-lg sm:text-xl lg:text-2xl 3xl:text-3xl font-bold text-blue-600 hover:text-blue-800 transition-colors'
					>
						FakeStore
					</Link>

					<nav>
						<ul className='flex items-center space-x-4 sm:space-x-6 lg:space-x-8 3xl:space-x-10'>
							<li>
								<Link
									href='/'
									className='text-sm sm:text-base lg:text-lg 3xl:text-xl text-gray-700 hover:text-blue-600 transition-colors'
								>
									Home
								</Link>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</header>
	)
}
