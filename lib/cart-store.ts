'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem } from '@/types/productTypes'

interface CartState {
	items: CartItem[]
	isOpen: boolean
}

interface CartActions {
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

type CartStore = CartState & CartActions

export const useCartStore = create<CartStore>()(
	persist(
		(set, get) => ({
			// Initial state
			items: [],
			isOpen: false,

			// Actions
			addItem: (item: CartItem) => {
				set(state => {
					const existingItem = state.items.find(existingItem => existingItem.id === item.id)
					if (existingItem) {
						return {
							items: state.items.map(existingItem =>
								existingItem.id === item.id
									? { ...existingItem, quantity: existingItem.quantity + item.quantity }
									: existingItem
							),
						}
					}
					return {
						items: [...state.items, item],
					}
				})
			},

			removeItem: (id: number) => {
				set(state => ({
					items: state.items.filter(item => item.id !== id),
				}))
			},

			updateQuantity: (id: number, quantity: number) => {
				set(state => {
					if (quantity <= 0) {
						return {
							items: state.items.filter(item => item.id !== id),
						}
					}
					return {
						items: state.items.map(item => (item.id === id ? { ...item, quantity } : item)),
					}
				})
			},

			clearCart: () => {
				set({ items: [] })
			},

			toggleCart: () => {
				set(state => ({ isOpen: !state.isOpen }))
			},

			closeCart: () => {
				set({ isOpen: false })
			},

			openCart: () => {
				set({ isOpen: true })
			},

			getTotalPrice: () => {
				const state = get()
				return state.items.reduce((total, item) => total + item.price * item.quantity, 0)
			},

			getTotalItems: () => {
				const state = get()
				return state.items.reduce((total, item) => total + item.quantity, 0)
			},
		}),
		{
			name: 'cart-storage',
			partialize: state => ({ items: state.items }),
		}
	)
)
