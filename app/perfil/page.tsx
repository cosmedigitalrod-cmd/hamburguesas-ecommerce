"use client"

import { useState } from "react"
import Link from "next/link"
import { User, Package, MapPin, LogOut, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

  const userData = {
    name: "Juan Pérez",
    email: "juan@email.com",
    phone: "+56 9 1234 5678",
    memberSince: "Marzo 2024",
    totalOrders: 12,
  }

  return (
    <div className="min-h-screen">
      <div className="bg-card/50 border-b border-border py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-display font-bold">Mi Cuenta</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="space-y-4">
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-3xl mx-auto mb-3">
                  👤
                </div>
                <h3 className="font-semibold">{userData.name}</h3>
                <p className="text-sm text-muted-foreground">Miembro desde {userData.memberSince}</p>
              </div>
              <CardContent className="p-0">
                <nav className="divide-y divide-border">
                  <Link href="/perfil" className="flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors">
                    <User className="h-4 w-4" />
                    Datos personales
                  </Link>
                  <Link href="/perfil/pedidos" className="flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors">
                    <Package className="h-4 w-4" />
                    Mis pedidos
                  </Link>
                  <Link href="/perfil/direcciones" className="flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors">
                    <MapPin className="h-4 w-4" />
                    Direcciones
                  </Link>
                  <button className="flex items-center gap-3 px-4 py-3 hover:bg-destructive/10 text-destructive w-full">
                    <LogOut className="h-4 w-4" />
                    Cerrar sesión
                  </button>
                </nav>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-6">
            {/* Personal Data */}
            <Card>
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle>Datos personales</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Cancelar" : "Editar"}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Nombre completo</Label>
                    <Input defaultValue={userData.name} disabled={!isEditing} />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input defaultValue={userData.email} disabled={!isEditing} />
                  </div>
                  <div>
                    <Label>Teléfono</Label>
                    <Input defaultValue={userData.phone} disabled={!isEditing} />
                  </div>
                </div>
                {isEditing && (
                  <Button className="bg-primary">Guardar cambios</Button>
                )}
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{userData.totalOrders}</div>
                  <p className="text-muted-foreground">Pedidos realizados</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-secondary mb-2">$156.000</div>
                  <p className="text-muted-foreground">Total gastado</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-accent mb-2">⭐ 4.8</div>
                  <p className="text-muted-foreground">Tu última calificación</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card>
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle>Pedidos recientes</CardTitle>
                <Button asChild variant="link" className="text-primary">
                  <Link href="/perfil/pedidos">
                    Ver todos <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: "ORD-260424-A7X9K2", date: "26 Abr 2024", total: 26300, status: "Entregado" },
                    { id: "ORD-250424-B3M8N1", date: "25 Abr 2024", total: 18900, status: "Entregado" },
                  ].map((order) => (
                    <Link
                      key={order.id}
                      href={`/perfil/pedidos/${order.id}`}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card hover:border-primary/50 transition-colors"
                    >
                      <div>
                        <p className="font-semibold">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">${order.total.toLocaleString("es-CL")}</p>
                        <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-500">
                          {order.status}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  )
}
