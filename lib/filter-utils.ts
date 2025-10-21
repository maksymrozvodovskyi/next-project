import { Product, FilterState } from '@/types/productTypes'

export function filterProducts(products: Product[], filterState: FilterState): Product[] {
	return products.filter(product => {
		if (product.price < filterState.priceRange[0] || product.price > filterState.priceRange[1]) {
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

		for (const [filterId, selectedValues] of Object.entries(filterState.selectedFilters)) {
			if (selectedValues.length === 0) continue

			switch (filterId) {
				case 'category':
					if (!selectedValues.includes(product.category)) {
						return false
					}
					break
				default:
					break
			}
		}

		return true
	})
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
