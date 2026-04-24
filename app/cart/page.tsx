"use client"

import Link from "next/link"
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const cartItems = [
  {
    id: "1",
    name: "BBQ Bacon",
    quantity: 2,
    unitPrice: 7200,
    customizations: ["Sin cebolla", "Extra queso"],
  },
  {
    id: "2",
    name: "Combo Full",
    quantity: 1,
    unitPrice: 11900,
    customizations: ["Con batido de chocolate"],
  },
]

export default function CartPage() {
  const subtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
  const deliveryFee = subtotal >= 15000 ? 0 : 2000
  const total = subtotal + deliveryFee

  return (
    <div className="min-h-screen">
      <div className="border-b border-border py-4">
        <div className="container mx-auto px-4">
          <Link href="/menu" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
            ← Continuar pedido
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-display font-bold mb-8">Tu Carrito</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length === 0 ? (
              <Card className="p-12 text-center">
                <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Tu carrito está vacío</h3>
                <p className="text-muted-foreground mb-6">¡Parece que aún no has agregado nada!</p>
                <Button asChild className="bg-primary">
                  <Link href="/menu">Ver el menú</Link>
                </Button>
              </Card>
            ) : (
              cartItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center flex-shrink-0">
                        <span className="text-4xl">🍔</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {item.customizations.join(", ")}
                            </p>
                          </div>
                          <span className="font-bold text-primary">
                            ${(item.unitPrice * item.quantity).toLocaleString("es-CL")}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border rounded-lg">
                            <button className="px-3 py-1 hover:bg-accent">
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-10 text-center font-semibold">{item.quantity}</span>
                            <button className="px-3 py-1 hover:bg-accent">
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <Button variant="ghost" size="sm" className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-1" />
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Resumen del pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toLocaleString("es-CL")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span>{deliveryFee === 0 ? "Gratis" : `$${deliveryFee.toLocaleString("es-CL")}`}</span>
                </div>
                {deliveryFee > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Añade ${(15000 - subtotal).toLocaleString("es-CL")} más para delivery gratis
                  </p>
                )}
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">${total.toLocaleString("es-CL")}</span>
                  </div>
                </div>
                <Link href="/checkout">
                  <Button className="w-full bg-primary hover:bg-primary/90 py-6">
                    Ir al Checkout
                  </Button>
                </Link>
                <Link href="/menu">
                  <Button variant="outline" className="w-full">
                    Continuar Comprando
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
