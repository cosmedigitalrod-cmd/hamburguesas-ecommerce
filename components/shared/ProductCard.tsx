"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Product } from "@/types"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden hover:border-primary transition-all duration-300">
      <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 relative flex items-center justify-center">
        <span className="text-8xl group-hover:scale-110 transition-transform duration-300">
          🍔
        </span>
        {product.is_featured && (
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
            Destacada
          </Badge>
        )}
        <Badge variant="secondary" className="absolute top-3 right-3">
          {product.category?.name}
        </Badge>
      </div>
      <CardContent className="p-5">
        <h3 className="font-bold text-lg mb-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.short_description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary">
            ${product.price.toLocaleString("es-CL")}
          </span>
          <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
            <Link href={`/menu/${product.slug}`}>
              Armar
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
