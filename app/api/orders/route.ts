import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"
import { generateOrderNumber } from "@/lib/utils"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")

    const supabase = createClient()

    let query = supabase
      .from("orders")
      .select(`
        *,
        customer:customers(*),
        order_items:order_items(*, product:products(*))
      `)
      .order("created_at", { ascending: false })

    if (status) {
      query = query.eq("status", status)
    }

    const { data: orders, error } = await query

    if (error) {
      console.error("Error fetching orders:", error)
      return NextResponse.json({ error: "Error fetching orders" }, { status: 500 })
    }

    return NextResponse.json(orders)
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { customer, items, deliveryMethod, deliveryAddress, observations } = body

    const supabase = createClient()

    // Calcular totales
    const subtotal = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)
    const deliveryFee = subtotal >= 15000 ? 0 : 2000
    const total = subtotal + deliveryFee

    // Crear cliente si no existe
    let customerId: string | null = null

    if (customer.phone) {
      const { data: existingCustomer } = await supabase
        .from("customers")
        .select("id")
        .eq("phone", customer.phone)
        .single()

      if (existingCustomer) {
        customerId = existingCustomer.id
      } else {
        const { data: newCustomer, error: customerError } = await supabase
          .from("customers")
          .insert(customer)
          .select("id")
          .single()

        if (customerError) {
          console.error("Error creating customer:", customerError)
        } else {
          customerId = newCustomer.id
        }
      }
    }

    // Crear orden
    const orderNumber = generateOrderNumber()
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        customer_id: customerId,
        customer_name: customer.name,
        customer_phone: customer.phone,
        customer_email: customer.email,
        subtotal,
        delivery_fee: deliveryFee,
        total,
        status: "pending",
        delivery_method: deliveryMethod,
        delivery_address: deliveryAddress?.address,
        delivery_reference: deliveryAddress?.reference,
        payment_method: "contra_entrega",
        observations,
      })
      .select()
      .single()

    if (orderError) {
      console.error("Error creating order:", orderError)
      return NextResponse.json({ error: "Error creating order" }, { status: 500 })
    }

    // Crear items de la orden
    const orderItems = items.map((item: any) => ({
      order_id: order.id,
      product_id: item.productId,
      product_name: item.name,
      quantity: item.quantity,
      unit_price: item.price,
      customizations: item.customizations,
    }))

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems)

    if (itemsError) {
      console.error("Error creating order items:", itemsError)
    }

    return NextResponse.json({
      success: true,
      order: {
        ...order,
        order_number: orderNumber,
      },
    })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
