import Link from 'next/link'

export default function Header() {
	return (
		<header className='bg-white shadow-md sticky top-0 z-50'>
			<div className='mx-auto flex max-w-6xl items-center justify-between px-4 py-3'>
				<Link
					href='/'
					aria-label='Home'
					className='text-2xl font-bold text-blue-600 hover:text-blue-800 transition-colors'
				>
					FakeStore
				</Link>

				<nav aria-label='Main Navigation'>
					<ul className='flex items-center space-x-6'>
						<li>
							<Link href='/' className='text-gray-700 hover:text-blue-600 transition-colors'>
								Home
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	)
}
