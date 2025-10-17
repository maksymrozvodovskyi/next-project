export enum QueryKeys {
	PRODUCTS = 'products',
	PRODUCT = 'product',
	CATEGORIES = 'categories',
}

export type Product = {
	id: number
	title: string
	price: number
	description: string
	category: string
	image: string
}

export type ProductListResponse = {
	products: Product[]
}

export type ProductItemProps = {
	item: Product
}

export type ProductListProps = {
	category: string
	products?: Product[]
}

export type TanStackProviderProps = {
	children: React.ReactNode
}

export type ProductPageProps = {
	params: Promise<{ id: string }>
}

export type CategoryPageProps = {
	params: Promise<{ id: string }>
}

export type ErrorProps = {
	error: Error
	reset: () => void
}
