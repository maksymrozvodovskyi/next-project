'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { FilterState } from '@/types/productTypes'

interface FilterContextType {
	state: FilterState
	setPriceRange: (range: [number, number]) => void
	setSearchQuery: (query: string) => void
	setSelectedFilters: (filters: Record<string, string[]>) => void
	resetFilters: () => void
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

const initialFilterState: FilterState = {
	priceRange: [0, 1000],
	selectedFilters: {},
	searchQuery: '',
}

interface FilterProviderProps {
	children: ReactNode
}

export function FilterProvider({ children }: FilterProviderProps) {
	const [state, setState] = useState<FilterState>(initialFilterState)

	const setPriceRange = (range: [number, number]) => {
		setState(prev => ({ ...prev, priceRange: range }))
	}

	const setSearchQuery = (query: string) => {
		setState(prev => ({ ...prev, searchQuery: query }))
	}

	const setSelectedFilters = (filters: Record<string, string[]>) => {
		setState(prev => ({ ...prev, selectedFilters: filters }))
	}

	const resetFilters = () => {
		setState(initialFilterState)
	}

	const value: FilterContextType = {
		state,
		setPriceRange,
		setSearchQuery,
		setSelectedFilters,
		resetFilters,
	}

	return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}

export function useFilters(): FilterContextType {
	const context = useContext(FilterContext)
	if (context === undefined) {
		throw new Error('useFilters must be used within a FilterProvider')
	}
	return context
}
