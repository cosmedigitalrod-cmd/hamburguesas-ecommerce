"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const categories = [
  { id: "1", name: "Clásicas", slug: "clasicas", count: 6, isActive: true },
  { id: "2", name: "Premium", slug: "premium", count: 4, isActive: true },
  { id: "3", name: "Combos", slug: "combos", count: 4, isActive: true },
  { id: "4", name: "Acompañamientos", slug: "acompañamientos", count: 6, isActive: true },
  { id: "5", name: "Bebidas", slug: "bebidas", count: 5, isActive: true },
  { id: "6", name: "Postres", slug: "postres", count: 3, isActive: false },
]

export default function AdminCategories() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/admin" className="text-2xl font-display font-bold text-primary">
            🍔 BurgerHub Admin
          </Link>
          <Link href="/admin/categorias/nueva">
            <Button className="bg-primary"><Plus className="h-4 w-4 mr-2" /> Nueva categoría</Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-display font-bold mb-6">Categorías</h1>

        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {categories.map((cat) => (
                <div key={cat.id} className="flex items-center justify-between p-4 hover:bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      <span className="text-2xl">🍔</span>
                    </div>
                    <div>
                      <p className="font-semibold">{cat.name}</p>
                      <p className="text-sm text-muted-foreground">/{cat.slug}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={cat.isActive ? "default" : "secondary"}>
                      {cat.isActive ? "Activa" : "Inactiva"}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{cat.count} productos</span>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
