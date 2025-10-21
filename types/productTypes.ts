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
