'use client'

import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { FilterState } from '@/types/productTypes'

type FilterAction =
	| { type: 'SET_PRICE_RANGE'; payload: [number, number] }
	| { type: 'SET_FILTER'; payload: { filterId: string; values: string[] } }
	| { type: 'SET_SEARCH_QUERY'; payload: string }
	| { type: 'CLEAR_FILTERS' }
	| { type: 'LOAD_FILTERS'; payload: FilterState }

const initialState: FilterState = {
	priceRange: [0, 1000],
	selectedFilters: {},
	searchQuery: '',
}

function filterReducer(state: FilterState, action: FilterAction): FilterState {
	switch (action.type) {
		case 'SET_PRICE_RANGE':
			return {
				...state,
				priceRange: action.payload,
			}
		case 'SET_FILTER':
			return {
				...state,
				selectedFilters: {
					...state.selectedFilters,
					[action.payload.filterId]: action.payload.values,
				},
			}
		case 'SET_SEARCH_QUERY':
			return {
				...state,
				searchQuery: action.payload,
			}
		case 'CLEAR_FILTERS':
			return initialState
		case 'LOAD_FILTERS':
			return action.payload
		default:
			return state
	}
}

interface FilterContextType {
	state: FilterState
	setPriceRange: (range: [number, number]) => void
	setFilter: (filterId: string, values: string[]) => void
	setSearchQuery: (query: string) => void
	clearFilters: () => void
	getFilterValue: (filterId: string) => string[]
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export function FilterProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer(filterReducer, initialState)

	useEffect(() => {
		const savedFilters = localStorage.getItem('productFilters')
		if (savedFilters) {
			try {
				const parsedFilters = JSON.parse(savedFilters)
				const safeFilters: FilterState = {
					priceRange: parsedFilters.priceRange || initialState.priceRange,
					selectedFilters: parsedFilters.selectedFilters || initialState.selectedFilters,
					searchQuery: parsedFilters.searchQuery || initialState.searchQuery,
				}
				dispatch({ type: 'LOAD_FILTERS', payload: safeFilters })
			} catch (error) {
				console.error('Error loading filters from localStorage:', error)
			}
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('productFilters', JSON.stringify(state))
	}, [state])

	const setPriceRange = (range: [number, number]) => {
		dispatch({ type: 'SET_PRICE_RANGE', payload: range })
	}

	const setFilter = (filterId: string, values: string[]) => {
		dispatch({ type: 'SET_FILTER', payload: { filterId, values } })
	}

	const setSearchQuery = (query: string) => {
		dispatch({ type: 'SET_SEARCH_QUERY', payload: query })
	}

	const clearFilters = () => {
		dispatch({ type: 'CLEAR_FILTERS' })
	}

	const getFilterValue = (filterId: string) => {
		return state.selectedFilters[filterId] || []
	}

	const value: FilterContextType = {
		state,
		setPriceRange,
		setFilter,
		setSearchQuery,
		clearFilters,
		getFilterValue,
	}

	return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}

export function useFilters() {
	const context = useContext(FilterContext)
	if (context === undefined) {
		throw new Error('useFilters must be used within a FilterProvider')
	}
	return context
}
