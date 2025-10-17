'use client'

import { ErrorProps } from '@/types/types'

export default function Error({ error, reset }: ErrorProps) {
	return (
		<div>
			<h2>Error while downloading</h2>
			<p>{error.message}</p>
			<button onClick={reset}>Try again</button>
		</div>
	)
}
