"use client"

import { createContext, useContext, useReducer, ReactNode } from "react"
import { CartItem } from "@/types"

interface CartState {
  items: CartItem[]
  subtotal: number
  deliveryFee: number
  total: number
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { productId: string; quantity: number } }
  | { type: "CLEAR_CART" }

const FREE_DELIVERY_THRESHOLD = 15000
const DELIVERY_FEE = 2000

function calculateTotals(items: CartItem[]) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE
  const total = subtotal + deliveryFee
  return { subtotal, deliveryFee, total }
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingIndex = state.items.findIndex(
        item => item.productId === action.payload.productId
      )
      let newItems: CartItem[]
      if (existingIndex >= 0) {
        newItems = state.items.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        )
      } else {
        newItems = [...state.items, action.payload]
      }
      return { ...state, items: newItems, ...calculateTotals(newItems) }
    }
    case "REMOVE_ITEM": {
      const newItems = state.items.filter(item => item.productId !== action.payload)
      return { ...state, items: newItems, ...calculateTotals(newItems) }
    }
    case "UPDATE_QUANTITY": {
      const newItems = state.items.map(item =>
        item.productId === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      )
      return { ...state, items: newItems, ...calculateTotals(newItems) }
    }
    case "CLEAR_CART":
      return { items: [], subtotal: 0, deliveryFee: 0, total: 0 }
    default:
      return state
  }
}

const initialState: CartState = {
  items: [],
  subtotal: 0,
  deliveryFee: 0,
  total: 0,
}

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
} | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
