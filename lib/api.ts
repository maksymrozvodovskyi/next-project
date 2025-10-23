import axios from 'axios'
import { Product } from '@/types/productTypes'

axios.defaults.baseURL = 'http://localhost:3000/api'

export const getCategories = async () => {
	const res = await axios.get<string[]>('/categories')
	return res.data
}

export const getProductsByCategory = async (category: string) => {
	const res = await axios.get<Product[]>(`/products/category/${category}`)
	return res.data
}

export const getProductById = async (id: string) => {
	const res = await axios.get<Product>(`/products/${id}`)
	return res.data
}
