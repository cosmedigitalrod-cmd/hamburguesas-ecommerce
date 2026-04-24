"use client"

import Link from "next/link"
import { Package, ShoppingCart, DollarSign, TrendingUp, Users, Plus, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const stats = [
  { label: "Pedidos hoy", value: "24", change: "+12%", icon: Package, color: "text-blue-500" },
  { label: "Ingresos hoy", value: "$456.000", change: "+8%", icon: DollarSign, color: "text-green-500" },
  { label: "Productos activos", value: "32", change: "+2", icon: ShoppingCart, color: "text-purple-500" },
  { label: "Clientes nuevos", value: "8", change: "+3", icon: Users, color: "text-orange-500" },
]

const recentOrders = [
  { id: "ORD-260424-A7X9K2", customer: "Juan Pérez", total: 26300, status: " Preparando", time: "Hace 5 min" },
  { id: "ORD-260424-B8N2M3", customer: "María García", total: 18900, status: "En camino", time: "Hace 12 min" },
  { id: "ORD-260424-C9P3Q4", customer: "Carlos López", total: 4500, status: "Recibido", time: "Hace 18 min" },
]

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-2xl font-display font-bold text-primary">
              🍔 BurgerHub
            </Link>
            <span className="px-2 py-1 text-xs font-medium bg-primary/20 text-primary rounded">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/">Ver sitio</Link>
            </Button>
            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
              A
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-display font-bold mb-8">Panel de Administración</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  <span className="text-xs font-medium text-green-500">{stat.change}</span>
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Acciones rápidas</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <Link href="/admin/productos/nuevo">
                <Button className="w-full h-20 flex-col gap-2 bg-primary">
                  <Plus className="h-6 w-6" />
                  <span>Nuevo producto</span>
                </Button>
              </Link>
              <Link href="/admin/pedidos">
                <Button className="w-full h-20 flex-col gap-2" variant="outline">
                  <Package className="h-6 w-6" />
                  <span>Ver pedidos</span>
                </Button>
              </Link>
              <Link href="/admin/promociones/nueva">
                <Button className="w-full h-20 flex-col gap-2" variant="outline">
                  <TrendingUp className="h-6 w-6" />
                  <span>Nueva promoción</span>
                </Button>
              </Link>
              <Link href="/admin/categorias/nueva">
                <Button className="w-full h-20 flex-col gap-2" variant="outline">
                  <Plus className="h-6 w-6" />
                  <span>Nueva categoría</span>
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>Pedidos recientes</CardTitle>
              <Button asChild variant="link" size="sm">
                <Link href="/admin/pedidos">
                  Ver todos <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-semibold">{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.customer} • {order.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">${order.total.toLocaleString("es-CL")}</p>
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-500">
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <Link href="/admin/productos">
            <Card className="p-6 hover:border-primary transition-colors cursor-pointer">
              <ShoppingCart className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold">Productos</h3>
              <p className="text-sm text-muted-foreground">Gestionar menú</p>
            </Card>
          </Link>
          <Link href="/admin/pedidos">
            <Card className="p-6 hover:border-primary transition-colors cursor-pointer">
              <Package className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold">Pedidos</h3>
              <p className="text-sm text-muted-foreground">Ver y gestionar</p>
            </Card>
          </Link>
          <Link href="/admin/categorias">
            <Card className="p-6 hover:border-primary transition-colors cursor-pointer">
              <TrendingUp className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold">Categorías</h3>
              <p className="text-sm text-muted-foreground">Organizar menú</p>
            </Card>
          </Link>
          <Link href="/admin/promociones">
            <Card className="p-6 hover:border-primary transition-colors cursor-pointer">
              <DollarSign className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold">Promociones</h3>
              <p className="text-sm text-muted-foreground">Ofertas activas</p>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
