'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/lib/api/clientApi'
import { LoginRequest } from '@/types/loginTypes'
import { ApiError } from '@/app/api/api'

export default function SignIn() {
	const router = useRouter()
	const [error, setError] = useState('')

	const handleSubmit = async (formData: FormData) => {
		try {
			const formValues = Object.fromEntries(formData) as LoginRequest

			const res = await login(formValues)

			if (res.status === 200) {
				router.push('/profile')
			} else {
				setError('Invalid username or password')
			}
		} catch (error) {
			setError((error as ApiError).response?.data?.error ?? (error as ApiError).message ?? 'Oops... some error')
		}
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-md w-full space-y-8'>
				<div>
					<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Sign in</h2>
					<p className='mt-2 text-center text-sm text-gray-600'>
						Or{' '}
						<a href='/sign-up' className='font-medium text-indigo-600 hover:text-indigo-500'>
							Create account
						</a>
					</p>
				</div>
				<form className='mt-8 space-y-6' action={handleSubmit}>
					<div className='rounded-md shadow-sm -space-y-px'>
						<div>
							<label htmlFor='username' className='sr-only'>
								Username
							</label>
							<input
								id='username'
								name='username'
								type='text'
								required
								className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
								placeholder='Username'
							/>
						</div>
						<div>
							<label htmlFor='password' className='sr-only'>
								Password
							</label>
							<input
								id='password'
								name='password'
								type='password'
								required
								className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
								placeholder='Password'
							/>
						</div>
					</div>

					{error && (
						<div className='rounded-md bg-red-50 p-4'>
							<div className='text-sm text-red-700'>{error}</div>
						</div>
					)}

					<div>
						<button
							type='submit'
							className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
						>
							Log in
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
