import axios from 'axios'

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

axios.defaults.baseURL = 'https://fakestoreapi.com'

export const getCategories = async () => {
	const res = await axios.get<string[]>('/products/categories')
	return res.data
}

export const getProductsByCategory = async (category: string) => {
	const res = await axios.get<Product[]>(`/products/category/${category}`)
	return res.data
}

export const getProducts = async () => {
	const res = await axios.get<ProductListResponse>('/products')
	return res.data
}

export const getSingleProduct = async (id: string) => {
	const res = await axios.get<Product>(`/products/${id}`)
	return res.data
}
