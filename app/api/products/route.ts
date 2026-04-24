import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"

export async function GET() {
  try {
    const supabase = createClient()

    const { data: products, error } = await supabase
      .from("products")
      .select(`
        *,
        category:categories(*)
      `)
      .eq("is_active", true)
      .order("name")

    if (error) {
      console.error("Error fetching products:", error)
      return NextResponse.json({ error: "Error fetching products" }, { status: 500 })
    }

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
