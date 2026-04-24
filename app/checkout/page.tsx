"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, MapPin, Truck, Store, CreditCard, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">("delivery")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const orderData = {
    items: [
      { name: "BBQ Bacon x2", price: 14400 },
      { name: "Combo Full x1", price: 11900 },
    ],
    subtotal: 26300,
    deliveryFee: 0,
    total: 26300,
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate order creation
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsComplete(true)
    setIsSubmitting(false)
  }

  if (isComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md mx-auto p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold mb-2">¡Pedido Confirmado!</h1>
          <p className="text-muted-foreground mb-6">
            Tu pedido ha sido recibido y está siendo preparado. Te notificaremos cuando esté listo.
          </p>
          <div className="bg-muted/50 rounded-lg p-4 mb-6">
            <p className="text-sm text-muted-foreground">Número de pedido</p>
            <p className="text-xl font-bold">ORD-260424-A7X9K2</p>
          </div>
          <Button asChild className="bg-primary w-full">
            <Link href="/perfil/pedidos">Ver mis pedidos</Link>
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="border-b border-border py-4">
        <div className="container mx-auto px-4">
          <Link href="/cart" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
            ← Volver al carrito
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-display font-bold mb-8">Checkout</h1>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {s}
              </div>
              {s < 3 && (
                <div className={`w-20 h-1 ${step > s ? "bg-primary" : "bg-muted"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Customer Data */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">1</span>
                  Datos del cliente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input id="name" placeholder="Juan Pérez" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" placeholder="+56 9 1234 5678" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="juan@email.com" />
                </div>
                <Button onClick={() => setStep(2)} className="bg-primary">
                  Continuar
                </Button>
              </CardContent>
            </Card>

            {/* Step 2: Delivery Method */}
            {step >= 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">2</span>
                    Método de entrega
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => setDeliveryMethod("delivery")}
                      className={`p-4 rounded-lg border-2 text-left transition-colors ${
                        deliveryMethod === "delivery" ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                      }`}
                    >
                      <Truck className="h-8 w-8 mb-2 text-primary" />
                      <h3 className="font-semibold">Delivery</h3>
                      <p className="text-sm text-muted-foreground">Entrega a tu domicilio en Concepción</p>
                    </button>
                    <button
                      onClick={() => setDeliveryMethod("pickup")}
                      className={`p-4 rounded-lg border-2 text-left transition-colors ${
                        deliveryMethod === "pickup" ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                      }`}
                    >
                      <Store className="h-8 w-8 mb-2 text-primary" />
                      <h3 className="font-semibold">Retiro en local</h3>
                      <p className="text-sm text-muted-foreground">Av. Arturo Prat 123, Concepción</p>
                    </button>
                  </div>

                  {deliveryMethod === "delivery" && (
                    <div className="space-y-4 mt-4">
                      <div>
                        <Label htmlFor="address">Dirección</Label>
                        <Input id="address" placeholder="Av. Arturo Prat 123, Depto 501" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="commune">Comuna</Label>
                          <Input id="commune" placeholder="Concepción" />
                        </div>
                        <div>
                          <Label htmlFor="reference">Referencia</Label>
                          <Input id="reference" placeholder="Edificio frente al mall" />
                        </div>
                      </div>
                    </div>
                  )}

                  <Button onClick={() => setStep(3)} className="bg-primary">
                    Continuar
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Payment */}
            {step >= 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">3</span>
                    Pago
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg border-2 border-primary bg-primary/10">
                    <div className="flex items-center gap-3 mb-2">
                      <CreditCard className="h-6 w-6 text-primary" />
                      <span className="font-semibold">Pago contra entrega</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Paga cuando recibas tu pedido. Aceptamos efectivo y tarjetas.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg border border-border opacity-50">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-6 w-6" />
                      <span className="font-semibold">Tarjeta de crédito/débito</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Próximamente</p>
                  </div>

                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 py-6 text-lg"
                  >
                    {isSubmitting ? "Procesando..." : "Confirmar Pedido"}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Tu pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {orderData.items.map((item, i) => (
                  <div key={i} className="flex justify-between">
                    <span className="text-muted-foreground">{item.name}</span>
                    <span>${item.price.toLocaleString("es-CL")}</span>
                  </div>
                ))}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${orderData.subtotal.toLocaleString("es-CL")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="text-green-500">Gratis</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">${orderData.total.toLocaleString("es-CL")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
