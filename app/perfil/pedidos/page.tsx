import Link from "next/link"
import { Package, ChevronRight, Clock, CheckCircle, Truck, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const orders = [
  {
    id: "ORD-260424-A7X9K2",
    date: "26 Abril 2024",
    time: "19:45",
    items: [
      { name: "BBQ Bacon x2", price: 14400 },
      { name: "Combo Full x1", price: 11900 },
    ],
    subtotal: 26300,
    deliveryFee: 0,
    total: 26300,
    status: "delivered",
    statusText: "Entregado",
    deliveryAddress: "Av. Arturo Prat 123, Concepción",
    paymentMethod: "Contra entrega",
  },
  {
    id: "ORD-250424-B3M8N1",
    date: "25 Abril 2024",
    time: "20:30",
    items: [
      { name: "Clásica x1", price: 4500 },
      { name: "Papas Fritas x2", price: 4400 },
    ],
    subtotal: 8900,
    deliveryFee: 2000,
    total: 10900,
    status: "delivered",
    statusText: "Entregado",
    deliveryAddress: "Av. Arturo Prat 123, Concepción",
    paymentMethod: "Contra entrega",
  },
  {
    id: "ORD-240424-C5N2P3",
    date: "24 Abril 2024",
    time: "13:15",
    items: [
      { name: "Doble Carne x1", price: 6500 },
    ],
    subtotal: 6500,
    deliveryFee: 2000,
    total: 8500,
    status: "cancelled",
    statusText: "Cancelado",
    deliveryAddress: "Av. Arturo Prat 123, Concepción",
    paymentMethod: "Contra entrega",
  },
]

const statusIcons = {
  pending: Clock,
  confirmed: CheckCircle,
  preparing: Clock,
  delivering: Truck,
  delivered: CheckCircle,
  cancelled: XCircle,
}

const statusColors = {
  pending: "bg-yellow-500/20 text-yellow-500",
  confirmed: "bg-blue-500/20 text-blue-500",
  preparing: "bg-orange-500/20 text-orange-500",
  delivering: "bg-purple-500/20 text-purple-500",
  delivered: "bg-green-500/20 text-green-500",
  cancelled: "bg-red-500/20 text-red-500",
}

export default function OrdersPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-card/50 border-b border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Link href="/perfil" className="hover:text-primary">Mi Cuenta</Link>
            <ChevronRight className="h-4 w-4" />
            <span>Mis pedidos</span>
          </div>
          <h1 className="text-3xl font-display font-bold">Mis Pedidos</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {orders.map((order) => {
            const StatusIcon = statusIcons[order.status as keyof typeof statusIcons]
            return (
              <Card key={order.id}>
                <CardHeader className="bg-muted/30">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-lg">{order.id}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {order.date} a las {order.time}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status as keyof typeof statusColors]}`}>
                        <StatusIcon className="h-4 w-4 inline mr-1" />
                        {order.statusText}
                      </span>
                      <span className="font-bold text-primary text-lg">
                        ${order.total.toLocaleString("es-CL")}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Order Details */}
                    <div className="flex-1">
                      <h4 className="font-semibold mb-3">Productos</h4>
                      <div className="space-y-2">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{item.name}</span>
                            <span>${item.price.toLocaleString("es-CL")}</span>
                          </div>
                        ))}
                      </div>
                      <div className="border-t mt-4 pt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Subtotal</span>
                          <span>${order.subtotal.toLocaleString("es-CL")}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Delivery</span>
                          <span>{order.deliveryFee === 0 ? "Gratis" : `$${order.deliveryFee.toLocaleString("es-CL")}`}</span>
                        </div>
                        <div className="flex justify-between font-bold">
                          <span>Total</span>
                          <span className="text-primary">${order.total.toLocaleString("es-CL")}</span>
                        </div>
                      </div>
                    </div>

                    {/* Delivery Info */}
                    <div className="lg:w-64 space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 text-sm">Dirección de entrega</h4>
                        <p className="text-sm text-muted-foreground">{order.deliveryAddress}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-sm">Método de pago</h4>
                        <p className="text-sm text-muted-foreground">{order.paymentMethod}</p>
                      </div>
                      <Button asChild variant="outline" className="w-full">
                        <Link href={`/perfil/pedidos/${order.id}`}>
                          Ver detalle
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
