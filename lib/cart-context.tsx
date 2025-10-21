'use client'

import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { CartItem } from '@/types/productTypes'

interface CartState {
	items: CartItem[]
	isOpen: boolean
}

type CartAction =
	| { type: 'ADD_ITEM'; payload: CartItem }
	| { type: 'REMOVE_ITEM'; payload: number }
	| { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
	| { type: 'CLEAR_CART' }
	| { type: 'TOGGLE_CART' }
	| { type: 'CLOSE_CART' }
	| { type: 'OPEN_CART' }
	| { type: 'LOAD_CART'; payload: CartItem[] }

const initialState: CartState = {
	items: [],
	isOpen: false,
}

function cartReducer(state: CartState, action: CartAction): CartState {
	switch (action.type) {
		case 'ADD_ITEM': {
			const existingItem = state.items.find(item => item.id === action.payload.id)
			if (existingItem) {
				return {
					...state,
					items: state.items.map(item =>
						item.id === action.payload.id ? { ...item, quantity: item.quantity + action.payload.quantity } : item
					),
				}
			}
			return {
				...state,
				items: [...state.items, action.payload],
			}
		}
		case 'REMOVE_ITEM':
			return {
				...state,
				items: state.items.filter(item => item.id !== action.payload),
			}
		case 'UPDATE_QUANTITY': {
			if (action.payload.quantity <= 0) {
				return {
					...state,
					items: state.items.filter(item => item.id !== action.payload.id),
				}
			}
			return {
				...state,
				items: state.items.map(item =>
					item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
				),
			}
		}
		case 'CLEAR_CART':
			return {
				...state,
				items: [],
			}
		case 'TOGGLE_CART':
			return {
				...state,
				isOpen: !state.isOpen,
			}
		case 'CLOSE_CART':
			return {
				...state,
				isOpen: false,
			}
		case 'OPEN_CART':
			return {
				...state,
				isOpen: true,
			}
		case 'LOAD_CART':
			return {
				...state,
				items: action.payload,
			}
		default:
			return state
	}
}

interface CartContextType {
	state: CartState
	addItem: (item: CartItem) => void
	removeItem: (id: number) => void
	updateQuantity: (id: number, quantity: number) => void
	clearCart: () => void
	toggleCart: () => void
	closeCart: () => void
	openCart: () => void
	getTotalPrice: () => number
	getTotalItems: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer(cartReducer, initialState)

	useEffect(() => {
		const savedCart = localStorage.getItem('cart')
		if (savedCart) {
			try {
				const parsedCart = JSON.parse(savedCart)
				dispatch({ type: 'LOAD_CART', payload: parsedCart })
			} catch (error) {
				console.error('Error loading cart from localStorage:', error)
			}
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(state.items))
	}, [state.items])

	const addItem = (item: CartItem) => {
		dispatch({ type: 'ADD_ITEM', payload: item })
	}

	const removeItem = (id: number) => {
		dispatch({ type: 'REMOVE_ITEM', payload: id })
	}

	const updateQuantity = (id: number, quantity: number) => {
		dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
	}

	const clearCart = () => {
		dispatch({ type: 'CLEAR_CART' })
	}

	const toggleCart = () => {
		dispatch({ type: 'TOGGLE_CART' })
	}

	const closeCart = () => {
		dispatch({ type: 'CLOSE_CART' })
	}

	const openCart = () => {
		dispatch({ type: 'OPEN_CART' })
	}

	const getTotalPrice = () => {
		return state.items.reduce((total, item) => total + item.price * item.quantity, 0)
	}

	const getTotalItems = () => {
		return state.items.reduce((total, item) => total + item.quantity, 0)
	}

	const value: CartContextType = {
		state,
		addItem,
		removeItem,
		updateQuantity,
		clearCart,
		toggleCart,
		closeCart,
		openCart,
		getTotalPrice,
		getTotalItems,
	}

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
	const context = useContext(CartContext)
	if (context === undefined) {
		throw new Error('useCart must be used within a CartProvider')
	}
	return context
}
