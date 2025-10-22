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

export type ProfileData = {
	fullName: string
	email: string
	address: string
	phoneNumber: string
	postalCode: string
}
