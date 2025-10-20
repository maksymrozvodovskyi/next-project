'use client'

import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TanStackProviderProps } from '@/types/types'

export default function TanStackProvider({ children }: TanStackProviderProps) {
	const [queryClient] = useState(() => new QueryClient())

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
