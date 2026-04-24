import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { status } = body

    const supabase = createClient()

    const { data: order, error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Error updating order:", error)
      return NextResponse.json({ error: "Error updating order" }, { status: 500 })
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
