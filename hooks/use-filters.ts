'use client'

import { useQueryState, parseAsString, parseAsArrayOf, parseAsInteger } from 'nuqs'

export function useFilters() {
	const [searchQuery, setSearchQuery] = useQueryState('search', parseAsString.withDefault(''))

	const [minPrice, setMinPrice] = useQueryState('minPrice', parseAsInteger.withDefault(0))

	const [maxPrice, setMaxPrice] = useQueryState('maxPrice', parseAsInteger.withDefault(1000))

	const [categories, setCategories] = useQueryState('categories', parseAsArrayOf(parseAsString).withDefault([]))

	const [sortBy, setSortBy] = useQueryState('sortBy', parseAsString.withDefault(''))

	const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))

	const setPriceRange = (range: [number, number]) => {
		setMinPrice(range[0])
		setMaxPrice(range[1])
	}

	const getPriceRange = (): [number, number] => {
		return [minPrice, maxPrice]
	}

	const addCategory = (category: string) => {
		setCategories(prev => [...prev, category])
	}

	const removeCategory = (category: string) => {
		setCategories(prev => prev.filter(c => c !== category))
	}

	const toggleCategory = (category: string) => {
		setCategories(prev => (prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]))
	}

	const resetFilters = () => {
		setSearchQuery('')
		setMinPrice(0)
		setMaxPrice(1000)
		setCategories([])
		setSortBy('')
		setPage(1)
	}

	return {
		searchQuery,
		minPrice,
		maxPrice,
		categories,
		sortBy,
		page,

		setSearchQuery,
		setMinPrice,
		setMaxPrice,
		setPriceRange,
		getPriceRange,
		setCategories,
		setSortBy,
		setPage,

		addCategory,
		removeCategory,
		toggleCategory,
		resetFilters,
	}
}
