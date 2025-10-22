import { Product } from '@/types/productTypes'

export interface URLFilterState {
	searchQuery: string
	minPrice: number
	maxPrice: number
	categories: string[]
	sortBy: string
	page: number
}

export function filterProducts(products: Product[], filterState: URLFilterState): Product[] {
	if (!products || !Array.isArray(products)) {
		return []
	}

	let filteredProducts = products.filter(product => {
		if (product.price < filterState.minPrice || product.price > filterState.maxPrice) {
			return false
		}

		if (filterState.searchQuery && filterState.searchQuery.trim()) {
			const searchQuery = filterState.searchQuery.toLowerCase().trim()
			const productTitle = product.title.toLowerCase()
			const productDescription = product.description.toLowerCase()

			if (!productTitle.includes(searchQuery) && !productDescription.includes(searchQuery)) {
				return false
			}
		}

		if (filterState.categories.length > 0) {
			if (!filterState.categories.includes(product.category)) {
				return false
			}
		}

		return true
	})

	if (filterState.sortBy) {
		filteredProducts = sortProducts(filteredProducts, filterState.sortBy)
	}

	return filteredProducts
}

export function sortProducts(products: Product[], sortBy: string): Product[] {
	const sortedProducts = [...products]

	switch (sortBy) {
		case 'price-asc':
			return sortedProducts.sort((a, b) => a.price - b.price)
		case 'price-desc':
			return sortedProducts.sort((a, b) => b.price - a.price)
		case 'name-asc':
			return sortedProducts.sort((a, b) => a.title.localeCompare(b.title))
		case 'name-desc':
			return sortedProducts.sort((a, b) => b.title.localeCompare(a.title))
		default:
			return sortedProducts
	}
}

export function getFilterOptionsFromProducts(products: Product[]): {
	priceRange: [number, number]
} {
	const prices = products.map(p => p.price)
	const minPrice = prices.length > 0 ? Math.min(...prices) : 0
	const maxPrice = prices.length > 0 ? Math.max(...prices) : 1000

	return {
		priceRange: [minPrice, maxPrice] as [number, number],
	}
}
