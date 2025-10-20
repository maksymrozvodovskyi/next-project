import axios from 'axios'
import { Product, ProductListResponse } from '@/types/productTypes'

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL

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

export const getProductById = async (id: string) => {
	const res = await axios.get<Product>(`/products/${id}`)
	return res.data
}
