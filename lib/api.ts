import axios from 'axios'
import { Product } from '@/types/productTypes'
import { User } from '../types/userTypes'
import { RegisterRequest } from '@/types/registerTypes'
import { LoginRequest } from '@/types/loginTypes'

const nextServer = axios.create({
	baseURL: 'http://localhost:3000/api',
	withCredentials: true,
})

export const register = async (data: RegisterRequest) => {
	const res = await nextServer.post<User>('/auth/register', data)
	return res.data
}

export const login = async (data: LoginRequest) => {
	const res = await nextServer.post<{ success: boolean; user: User }>('/auth/login', data)
	return res.data.user
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
