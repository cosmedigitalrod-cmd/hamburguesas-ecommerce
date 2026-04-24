"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Clock, CheckCircle, Truck, Package, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function OrderDetailPage({ params }: PageProps) {
  const { id } = await params

  // Demo data
  const order = {
    id: "ORD-260424-A7X9K2",
    date: "26 Abril 2024",
    time: "19:45",
    customer: {
      name: "Juan Pérez",
      phone: "+56 9 1234 5678",
      email: "juan@email.com",
    },
    items: [
      { name: "BBQ Bacon x2", price: 14400, customizations: "Sin cebolla" },
      { name: "Combo Full x1", price: 11900, customizations: "Con batido de chocolate" },
    ],
    subtotal: 26300,
    deliveryFee: 0,
    total: 26300,
    status: "preparing",
    statusText: "Preparando",
    deliveryAddress: "Av. Arturo Prat 123, Depto 501, Concepción",
    deliveryReference: "Edificio frente al mall",
    paymentMethod: "Contra entrega",
    notes: "Por favor incluir servilletas extras",
  }

  const statusSteps = [
    { status: "pending", label: "Recibido", icon: Clock },
    { status: "confirmed", label: "Confirmado", icon: CheckCircle },
    { status: "preparing", label: "Preparando", icon: Package },
    { status: "delivering", label: "En camino", icon: Truck },
    { status: "delivered", label: "Entregado", icon: CheckCircle },
  ]

  const currentStepIndex = statusSteps.findIndex(s => s.status === order.status)

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/admin/pedidos" className="text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold">{order.id}</h1>
            <p className="text-sm text-muted-foreground">{order.date} a las {order.time}</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Status Update */}
            <Card>
              <CardHeader>
                <CardTitle>Actualizar estado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {statusSteps.map((step, index) => {
                    const Icon = step.icon
                    const isActive = index === currentStepIndex
                    const isPast = index < currentStepIndex
                    return (
                      <Button
                        key={step.status}
                        variant={isActive ? "default" : "outline"}
                        className={`${isPast ? "bg-green-500" : ""}`}
                      >
                        <Icon className="h-4 w-4 mr-1" />
                        {step.label}
                      </Button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Productos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {order.items.map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-lg bg-muted/30">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      <span className="text-3xl">🍔</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-semibold">{item.name}</h4>
                        <span className="font-bold">${item.price.toLocaleString("es-CL")}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.customizations}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Notes */}
            {order.notes && (
              <Card>
                <CardHeader>
                  <CardTitle>Observaciones</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{order.notes}</p>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            {/* Customer Info */}
            <Card>
              <CardHeader>
                <CardTitle>Datos del cliente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-muted-foreground">Nombre</Label>
                  <p className="font-semibold">{order.customer.name}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Teléfono</Label>
                  <p className="font-semibold">{order.customer.phone}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Email</Label>
                  <p className="font-semibold">{order.customer.email}</p>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Info */}
            <Card>
              <CardHeader>
                <CardTitle>Dirección de entrega</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-semibold">{order.deliveryAddress}</p>
                <p className="text-sm text-muted-foreground">{order.deliveryReference}</p>
              </CardContent>
            </Card>

            {/* Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Resumen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${order.subtotal.toLocaleString("es-CL")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span>{order.deliveryFee === 0 ? "Gratis" : `$${order.deliveryFee.toLocaleString("es-CL")}`}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">${order.total.toLocaleString("es-CL")}</span>
                </div>
                <div className="pt-3">
                  <Label className="text-muted-foreground">Método de pago</Label>
                  <p className="font-semibold">{order.paymentMethod}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
