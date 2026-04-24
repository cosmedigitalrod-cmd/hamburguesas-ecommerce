"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Pencil, Trash2, Tag, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const promotions = [
  {
    id: "1",
    title: "Martes de Doble",
    description: "2x1 en todas las Clásicas los martes",
    code: "MARTESDOBLE",
    discount: "2x1",
    minOrder: 0,
    startDate: "2024-04-01",
    endDate: "2024-12-31",
    isActive: true,
    usageCount: 156,
  },
  {
    id: "2",
    title: "Envío Gratis",
    description: "Delivery sin costo en pedidos sobre $15.000",
    code: "ENVIOGRATIS",
    discount: "Gratis",
    minOrder: 15000,
    startDate: "2024-04-01",
    endDate: "2024-12-31",
    isActive: true,
    usageCount: 423,
  },
  {
    id: "3",
    title: "Combo Premium 15% OFF",
    description: "15% de descuento en Combos Premium",
    code: "PREMIUM15",
    discount: "15%",
    minOrder: 0,
    startDate: "2024-04-15",
    endDate: "2024-05-15",
    isActive: false,
    usageCount: 89,
  },
]

export default function AdminPromotions() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/admin" className="text-2xl font-display font-bold text-primary">
            🍔 BurgerHub Admin
          </Link>
          <Link href="/admin/promociones/nueva">
            <Button className="bg-primary"><Plus className="h-4 w-4 mr-2" /> Nueva promoción</Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-display font-bold mb-6">Promociones</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promotions.map((promo) => (
            <Card key={promo.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Tag className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant={promo.isActive ? "default" : "secondary"}>
                    {promo.isActive ? "Activa" : "Inactiva"}
                  </Badge>
                </div>
                <h3 className="font-bold text-lg mb-1">{promo.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{promo.description}</p>
                <div className="p-3 rounded-lg bg-muted/50 mb-4">
                  <span className="text-xs text-muted-foreground">Código:</span>
                  <p className="font-mono font-bold text-lg">{promo.code}</p>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {promo.startDate} - {promo.endDate}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-sm text-muted-foreground">
                    {promo.usageCount} usos
                  </span>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
