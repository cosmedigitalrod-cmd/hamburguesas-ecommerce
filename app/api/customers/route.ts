import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const phone = searchParams.get("phone")

    if (!phone) {
      return NextResponse.json({ error: "Phone required" }, { status: 400 })
    }

    const supabase = createClient()

    const { data: customer, error } = await supabase
      .from("customers")
      .select(`
        *,
        orders:orders(*)
      `)
      .eq("phone", phone)
      .single()

    if (error) {
      return NextResponse.json(null)
    }

    return NextResponse.json(customer)
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, password } = body

    const supabase = createClient()

    // Verificar si ya existe
    const { data: existing } = await supabase
      .from("customers")
      .select("id")
      .or(`email.eq.${email},phone.eq.${phone}`)
      .single()

    if (existing) {
      return NextResponse.json({ error: "El cliente ya existe" }, { status: 400 })
    }

    // Crear cliente
    const { data: customer, error } = await supabase
      .from("customers")
      .insert({
        name,
        email,
        phone,
        password_hash: password, // En producción, hashificar la contraseña
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating customer:", error)
      return NextResponse.json({ error: "Error creating customer" }, { status: 500 })
    }

    return NextResponse.json({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
    })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
