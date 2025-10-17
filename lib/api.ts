import axios from 'axios'
import { Product, ProductListResponse } from '@/types/types'

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

export const getSingleProduct = async (id: string) => {
	const res = await axios.get<Product>(`/products/${id}`)
	return res.data
}

export const categoryExists = async (category: string) => {
	try {
		const categories = await getCategories()
		return { exists: categories.includes(category), error: null }
	} catch (error) {
		return { exists: false, error: error }
	}
}
