import axios from 'axios'
import { Product } from '@/types/productTypes'
import { User, RegisterRequest } from '../types/userTypes'

const nextServer = axios.create({
	baseURL: 'http://localhost:3000/api',
	withCredentials: true,
})

export const register = async (data: RegisterRequest) => {
	const res = await nextServer.post<User>('/auth/register', data)
	return res.data
}

export const getCategories = async () => {
	const res = await nextServer.get<string[]>('/products/categories')
	return res.data
}

export const getProductsByCategory = async (category: string) => {
	const res = await nextServer.get<Product[]>(`/products/category/${category}`)
	return res.data
}

export const getProductById = async (id: string) => {
	const res = await nextServer.get<Product>(`/products/${id}`)
	return res.data
}
