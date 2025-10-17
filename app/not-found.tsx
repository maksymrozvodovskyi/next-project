'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function NotFound() {
	const router = useRouter()

	useEffect(() => {
		const timer = setTimeout(() => router.push('/'), 3000)
		return () => clearTimeout(timer)
	}, [router])

	return (
		<div>
			<h1>404 - Page not found</h1>
			<p>You will be redirected to the main page in a few seconds…</p>
		</div>
	)
}
