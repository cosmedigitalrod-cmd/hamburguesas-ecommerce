import Link from "next/link"
import { ArrowLeft, Package, Clock, CheckCircle, Truck, XCircle, MapPin, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function OrderDetailPage({ params }: PageProps) {
  const { id } = await params

  // Demo data - en producción vendría de Supabase
  const order = {
    id: "ORD-260424-A7X9K2",
    date: "26 Abril 2024",
    time: "19:45",
    items: [
      { name: "BBQ Bacon x2", price: 14400, customizations: "Sin cebolla, Extra queso" },
      { name: "Combo Full x1", price: 11900, customizations: "Con batido de chocolate" },
    ],
    subtotal: 26300,
    deliveryFee: 0,
    discount: 0,
    total: 26300,
    status: "delivered",
    statusText: "Entregado",
    customerName: "Juan Pérez",
    customerPhone: "+56 9 1234 5678",
    deliveryAddress: "Av. Arturo Prat 123, Depto 501, Concepción",
    deliveryReference: "Edificio frente al mall, portería",
    deliveryMethod: "delivery",
    paymentMethod: "Contra entrega",
    notes: "Por favor incluir servilletas extras",
  }

  const statusSteps = [
    { status: "pending", label: "Pedido recibido", icon: Clock, completed: true },
    { status: "confirmed", label: "Confirmado", icon: CheckCircle, completed: true },
    { status: "preparing", label: "Preparando", icon: Package, completed: true },
    { status: "delivering", label: "En camino", icon: Truck, completed: true },
    { status: "delivered", label: "Entregado", icon: CheckCircle, completed: true },
  ]

  const currentStepIndex = statusSteps.findIndex(s => s.status === order.status)

  return (
    <div className="min-h-screen">
      <div className="border-b border-border py-4">
        <div className="container mx-auto px-4">
          <Link href="/perfil/pedidos" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
            ← Volver a mis pedidos
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold">{order.id}</h1>
            <p className="text-muted-foreground">{order.date} a las {order.time}</p>
          </div>
          <span className="px-4 py-2 rounded-full bg-green-500/20 text-green-500 font-medium">
            ✓ {order.statusText}
          </span>
        </div>

        {/* Status Timeline */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              {statusSteps.map((step, index) => {
                const Icon = step.icon
                const isCompleted = index <= currentStepIndex
                const isCurrent = index === currentStepIndex
                return (
                  <div key={step.status} className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isCompleted ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"
                    } ${isCurrent ? "ring-4 ring-green-500/30" : ""}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <p className={`text-xs mt-2 font-medium ${isCompleted ? "text-green-500" : "text-muted-foreground"}`}>
                      {step.label}
                    </p>
                    {index < statusSteps.length - 1 && (
                      <div className={`hidden sm:block absolute h-1 w-16 ${
                        index < currentStepIndex ? "bg-green-500" : "bg-muted"
                      }`} style={{ left: `${index * 100 / (statusSteps.length - 1)}%` }} />
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Items */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Productos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {order.items.map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-lg bg-muted/30">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center flex-shrink-0">
                      <span className="text-3xl">🍔</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-semibold">{item.name}</h4>
                        <span className="font-bold text-primary">${item.price.toLocaleString("es-CL")}</span>
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

          {/* Summary & Delivery Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resumen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${order.subtotal.toLocaleString("es-CL")}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-green-500">
                    <span>Descuento</span>
                    <span>-${order.discount.toLocaleString("es-CL")}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span>{order.deliveryFee === 0 ? "Gratis" : `$${order.deliveryFee.toLocaleString("es-CL")}`}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">${order.total.toLocaleString("es-CL")}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Información de entrega</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">{order.customerName}</p>
                    <p className="text-sm text-muted-foreground">{order.deliveryAddress}</p>
                    <p className="text-sm text-muted-foreground">{order.deliveryReference}</p>
                    <p className="text-sm text-primary mt-1">{order.customerPhone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <span>{order.paymentMethod}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
