"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Filter, Eye, Clock, CheckCircle, Truck, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const orders = [
  {
    id: "ORD-260424-A7X9K2",
    customer: "Juan Pérez",
    phone: "+56 9 1234 5678",
    items: 2,
    total: 26300,
    status: "preparing",
    statusText: "Preparando",
    date: "26 Abr 2024",
    time: "19:45",
  },
  {
    id: "ORD-260424-B8N2M3",
    customer: "María García",
    phone: "+56 9 9876 5432",
    items: 3,
    total: 18900,
    status: "delivering",
    statusText: "En camino",
    date: "26 Abr 2024",
    time: "20:15",
  },
  {
    id: "ORD-260424-C9P3Q4",
    customer: "Carlos López",
    phone: "+56 9 5555 1234",
    items: 1,
    total: 4500,
    status: "pending",
    statusText: "Recibido",
    date: "26 Abr 2024",
    time: "20:30",
  },
  {
    id: "ORD-250424-D1R4S5",
    customer: "Ana Martínez",
    phone: "+56 9 4444 5678",
    items: 4,
    total: 31500,
    status: "delivered",
    statusText: "Entregado",
    date: "25 Abr 2024",
    time: "13:20",
  },
]

const statusConfig = {
  pending: { color: "bg-yellow-500/20 text-yellow-500", icon: Clock },
  confirmed: { color: "bg-blue-500/20 text-blue-500", icon: CheckCircle },
  preparing: { color: "bg-orange-500/20 text-orange-500", icon: Clock },
  delivering: { color: "bg-purple-500/20 text-purple-500", icon: Truck },
  delivered: { color: "bg-green-500/20 text-green-500", icon: CheckCircle },
  cancelled: { color: "bg-red-500/20 text-red-500", icon: XCircle },
}

export default function AdminOrders() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/admin" className="text-2xl font-display font-bold text-primary">
            🍔 BurgerHub Admin
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-display font-bold mb-6">Pedidos</h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por pedido o cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <select
            className="px-4 py-2 rounded-lg border bg-background"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Todos los estados</option>
            <option value="pending">Recibido</option>
            <option value="preparing">Preparando</option>
            <option value="delivering">En camino</option>
            <option value="delivered">Entregado</option>
          </select>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const config = statusConfig[order.status as keyof statusConfig]
            const StatusIcon = config.icon
            return (
              <Card key={order.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-4 mb-2">
                        <span className="font-bold text-lg">{order.id}</span>
                        <Badge className={config.color}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {order.statusText}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                        <span>👤 {order.customer}</span>
                        <span>📱 {order.phone}</span>
                        <span>📦 {order.items} productos</span>
                        <span>🕐 {order.date} {order.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-primary">
                        ${order.total.toLocaleString("es-CL")}
                      </span>
                      <Link href={`/admin/pedidos/${order.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Ver detalle
                        </Button>
                      </Link>
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
