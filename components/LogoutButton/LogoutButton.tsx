'use client'

import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store/authStore'

export default function LogoutButton() {
	const router = useRouter()

	const handleLogout = async () => {
		try {
			await fetch('/api/auth/logout', { method: 'POST' })
			useAuthStore.getState().clearIsAuthenticated()
			router.push('/')
		} catch (err) {
			console.error('Logout error:', err)
		}
	}

	return (
		<button
			onClick={handleLogout}
			className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 data-focus:bg-gray-100 disabled:opacity-50'
		>
			Sign out
		</button>
	)
}
