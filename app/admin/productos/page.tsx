"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Plus, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const products = [
  { id: "1", name: "Clásica", category: "Clásicas", price: 4500, stock: 50, isActive: true },
  { id: "2", name: "Doble Carne", category: "Clásicas", price: 6500, stock: 30, isActive: true },
  { id: "3", name: "BBQ Bacon", category: "Premium", price: 7200, stock: 25, isActive: true },
  { id: "4", name: "Cheese Deluxe", category: "Premium", price: 7800, stock: 20, isActive: true },
  { id: "5", name: "Trufa Pound", category: "Premium", price: 9500, stock: 15, isActive: true },
  { id: "6", name: "Spicy Jalapeño", category: "Clásicas", price: 7500, stock: 25, isActive: false },
]

export default function AdminProducts() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/admin" className="text-2xl font-display font-bold text-primary">
            🍔 BurgerHub Admin
          </Link>
          <Link href="/admin/productos/nuevo">
            <Button className="bg-primary"><Plus className="h-4 w-4 mr-2" /> Nuevo producto</Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl font-display font-bold">Productos</h1>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b">
                  <tr>
                    <th className="text-left p-4 font-medium">Producto</th>
                    <th className="text-left p-4 font-medium">Categoría</th>
                    <th className="text-left p-4 font-medium">Precio</th>
                    <th className="text-left p-4 font-medium">Stock</th>
                    <th className="text-left p-4 font-medium">Estado</th>
                    <th className="text-right p-4 font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-muted/30">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                            <span className="text-2xl">🍔</span>
                          </div>
                          <span className="font-semibold">{product.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground">{product.category}</td>
                      <td className="p-4 font-semibold">${product.price.toLocaleString("es-CL")}</td>
                      <td className="p-4">
                        <span className={product.stock < 20 ? "text-orange-500" : ""}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="p-4">
                        <Badge variant={product.isActive ? "default" : "secondary"}>
                          {product.isActive ? "Activo" : "Inactivo"}
                        </Badge>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between p-4 border-t">
              <p className="text-sm text-muted-foreground">
                Mostrando {filteredProducts.length} de {products.length} productos
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" disabled>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="bg-primary">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
