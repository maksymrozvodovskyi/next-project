'use client'

import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/authStore'
import { Link } from '@/i18n/navigation'

export default function SignUp() {
	const router = useRouter()
	const { setUser } = useAuthStore()

	async function handleSubmit(formData: FormData) {
		const username = formData.get('username')
		const email = formData.get('email')
		const password = formData.get('password')

		try {
			const res = await fetch('/api/auth/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, email, password }),
			})

			setUser({ username, email } as any)
			router.push('/sign-in')
		} catch (err) {
			console.error('Error:', err)
		}
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-md w-full space-y-8'>
				<div>
					<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Create account</h2>
					<p className='mt-2 text-center text-sm text-gray-600'>
						Or{' '}
						<Link href='/sign-in' className='font-medium text-indigo-600 hover:text-indigo-500'>
							Login
						</Link>
					</p>
				</div>

				<form
					className='mt-8 space-y-6'
					onSubmit={e => {
						e.preventDefault()
						const formData = new FormData(e.currentTarget)
						handleSubmit(formData)
					}}
				>
					<div className='rounded-md shadow-sm -space-y-px'>
						<div>
							<input id='username' name='username' type='text' required placeholder='Username' />
						</div>
						<div>
							<input id='email' name='email' type='email' required placeholder='Email' />
						</div>
						<div>
							<input id='password' name='password' type='password' required placeholder='Password' />
						</div>
					</div>

					<button
						type='submit'
						className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
					>
						Register
					</button>
				</form>
			</div>
		</div>
	)
}
