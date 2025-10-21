export type Product = {
	id: number
	title: string
	price: number
	description: string
	category: string
	image: string
}

export type CartItem = {
	id: number
	name: string
	price: number
	quantity: number
	image: string
}

export type ProductListResponse = {
	products: Product[]
}

export type FilterOption = {
	value: string
	label: string
	isChecked: boolean
}

export type Filter = {
	id: string
	name: string
	options: FilterOption[]
}

export type FilterState = {
	priceRange: [number, number]
	selectedFilters: Record<string, string[]>
	searchQuery: string
}

export type ProfileData = {
	fullName: string
	email: string
	address: string
	phoneNumber: string
	postalCode: string
}
