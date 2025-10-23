'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { register } from '@/lib/api'
import { ApiError } from '@/app/api/api'
import { RegisterRequest } from '../../../types/userTypes'

export default function SignUp() {
	const router = useRouter()
	const [error, setError] = useState('')

	const handleSubmit = async (formData: FormData) => {
		try {
			const formValues = Object.fromEntries(formData) as RegisterRequest

			const res = await register(formValues)

			if (res && (res.id || res.email)) {
				router.push('/profile')
			} else {
				setError('Invalid email or password')
			}
		} catch (error) {
			setError((error as ApiError).response?.data?.error ?? (error as ApiError).message ?? 'Oops... some error')
		}
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-md w-full space-y-8'>
				<div>
					<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Create account</h2>
					<p className='mt-2 text-center text-sm text-gray-600'>
						Or{' '}
						<a href='/sign-in' className='font-medium text-indigo-600 hover:text-indigo-500'>
							Login
						</a>
					</p>
				</div>
				<form className='mt-8 space-y-6' action={handleSubmit}>
					<div className='rounded-md shadow-sm -space-y-px'>
						<div>
							<label htmlFor='userName' className='sr-only'>
								User Name
							</label>
							<input
								id='userName'
								name='userName'
								type='text'
								required
								className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
								placeholder='User Name'
							/>
						</div>
						<div>
							<label htmlFor='email' className='sr-only'>
								Email
							</label>
							<input
								id='email'
								name='email'
								type='email'
								required
								className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
								placeholder='Email'
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
							Register
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
