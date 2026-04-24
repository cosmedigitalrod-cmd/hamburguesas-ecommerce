export interface Product {
  id: string
  name: string
  slug: string
  description: string
  short_description: string
  price: number
  image_url: string
  category_id: string
  category?: Category
  stock: number
  prep_time: number
  is_featured: boolean
  is_active: boolean
  ingredients?: string[]
  extras?: ProductExtra[]
  created_at?: string
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  sort_order: number
  is_active: boolean
}

export interface ProductExtra {
  id: string
  name: string
  price: number
  stock: number
}

export interface CartItem {
  productId: string
  name: string
  price: number
  quantity: number
  customizations?: string[]
  imageUrl?: string
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  created_at?: string
}

export interface Order {
  id: string
  order_number: string
  customer_id: string
  customer_name: string
  customer_phone: string
  customer_email: string
  subtotal: number
  delivery_fee: number
  total: number
  status: OrderStatus
  delivery_method: "delivery" | "pickup"
  delivery_address?: string
  delivery_reference?: string
  payment_method: string
  observations?: string
  created_at: string
  order_items?: OrderItem[]
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "delivering"
  | "delivered"
  | "cancelled"

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  product_name: string
  quantity: number
  unit_price: number
  customizations?: string
}

export interface Promotion {
  id: string
  title: string
  description: string
  code: string
  discount_type: "percentage" | "fixed" | "free_item"
  discount_value: number
  min_order: number
  start_date: string
  end_date: string
  usage_limit?: number
  usage_count: number
  is_active: boolean
}
