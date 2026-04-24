import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Plus, Minus, ShoppingCart, ChefHat, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Demo data - en producción vendrán de Supabase
const products: Record<string, any> = {
  "clasica": {
    id: "1",
    name: "Clásica",
    slug: "clasica",
    description: "Nuestra bandera. Carne de res 150g, queso cheddar derretido, lechuga fresca, tomate y nuestra salsa especial de la casa. Simple pero perfecta.",
    shortDescription: "Carne 150g, cheddar, lechuga, tomate, salsa especial.",
    basePrice: 4500,
    category: "Clásicas",
    prepTime: 12,
    stock: 50,
    ingredients: [
      { name: "Carne de res 150g", isDefault: true, isRemovable: false },
      { name: "Pan artesanal", isDefault: true, isRemovable: false },
      { name: "Queso cheddar", isDefault: true, isRemovable: true },
      { name: "Lechuga", isDefault: true, isRemovable: true },
      { name: "Tomate", isDefault: true, isRemovable: true },
      { name: "Salsa especial", isDefault: true, isRemovable: false },
    ],
    extras: [
      { name: "Queso Extra", price: 800 },
      { name: "Tocino", price: 1200 },
      { name: "Huevo", price: 900 },
    ],
  },
  "doble-carne": {
    id: "2",
    name: "Doble Carne",
    slug: "doble-carne",
    description: "Para los más hambrientos. Doble carne de res 150g cada una, doble queso cheddar, bacon crujiente y salsa especial. Una experiencia doblemente satisfactoria.",
    shortDescription: "Doble carne 150g, doble queso, bacon.",
    basePrice: 6500,
    category: "Clásicas",
    prepTime: 15,
    stock: 30,
    ingredients: [
      { name: "Carne de res 150g x2", isDefault: true, isRemovable: false },
      { name: "Pan artesanal", isDefault: true, isRemovable: false },
      { name: "Queso cheddar x2", isDefault: true, isRemovable: true },
      { name: "Bacon crujiente", isDefault: true, isRemovable: true },
      { name: "Salsa especial", isDefault: true, isRemovable: false },
    ],
    extras: [
      { name: "Queso Extra", price: 800 },
      { name: "Tocino Extra", price: 1200 },
      { name: "Huevo", price: 900 },
    ],
  },
  "bbq-bacon": {
    id: "3",
    name: "BBQ Bacon",
    slug: "bbq-bacon",
    description: "Carne de res 200g, bacon ahumado artesanalmente, queso suizo derretido, cebolla caramelizada lenta,lechuga crujiente y nuestra salsa BBQ secreta.",
    shortDescription: "Carne 200g, bacon ahumado, queso suizo, BBQ.",
    basePrice: 7200,
    category: "Premium",
    prepTime: 15,
    stock: 25,
    ingredients: [
      { name: "Carne de res 200g", isDefault: true, isRemovable: false },
      { name: "Pan brioche", isDefault: true, isRemovable: false },
      { name: "Bacon ahumado", isDefault: true, isRemovable: true },
      { name: "Queso suizo", isDefault: true, isRemovable: true },
      { name: "Cebolla caramelizada", isDefault: true, isRemovable: true },
      { name: "Salsa BBQ", isDefault: true, isRemovable: false },
    ],
    extras: [
      { name: "Queso Extra", price: 800 },
      { name: "Tocino Extra", price: 1200 },
      { name: "Huevo Frito", price: 900 },
      { name: "Palta", price: 1000 },
    ],
  },
  "cheese-deluxe": {
    id: "4",
    name: "Cheese Deluxe",
    slug: "cheese-deluxe",
    description: "Carne premium 180g, triple queso (cheddar, suizo, feta), tocino crujiente y nuestra salsa的秘密。El lujo del queso en cada bocado.",
    shortDescription: "Carne 180g, triple queso, tocino.",
    basePrice: 7800,
    category: "Premium",
    prepTime: 15,
    stock: 20,
    ingredients: [
      { name: "Carne premium 180g", isDefault: true, isRemovable: false },
      { name: "Pan brioche", isDefault: true, isRemovable: false },
      { name: "Triple queso", isDefault: true, isRemovable: false },
      { name: "Tocino", isDefault: true, isRemovable: true },
    ],
    extras: [
      { name: "Queso Extra", price: 800 },
      { name: "Tocino Extra", price: 1200 },
    ],
  },
  "trufa-pound": {
    id: "5",
    name: "Trufa Pound",
    slug: "trufa-pound",
    description: "Nuestra creación más gourmet. Carne premium 200g con aceite de trufa blanca, rúcula fresca, tomate cherry y reducción de balsámico. Para paladares exigentes.",
    shortDescription: "Carne premium, trufa blanca, rúcula.",
    basePrice: 9500,
    category: "Premium",
    prepTime: 18,
    stock: 15,
    ingredients: [
      { name: "Carne premium 200g", isDefault: true, isRemovable: false },
      { name: "Pan brioche", isDefault: true, isRemovable: false },
      { name: "Aceite de trufa", isDefault: true, isRemovable: false },
      { name: "Rúcula", isDefault: true, isRemovable: true },
      { name: "Tomate cherry", isDefault: true, isRemovable: true },
    ],
    extras: [
      { name: "Huevo Frito", price: 900 },
      { name: "Palta", price: 1000 },
    ],
  },
  "spicy-jalapeno": {
    id: "6",
    name: "Spicy Jalapeño",
    slug: "spicy-jalapeno",
    description: "Para los amantes del picante. Carne 180g, jalapeños frescos, queso pepper jack, salsa spicy artesanal y crema de chipotle.",
    shortDescription: "Carne 180g, jalapeños, pepper jack, spicy.",
    basePrice: 7500,
    category: "Clásicas",
    prepTime: 15,
    stock: 25,
    ingredients: [
      { name: "Carne 180g", isDefault: true, isRemovable: false },
      { name: "Pan artesanal", isDefault: true, isRemovable: false },
      { name: "Jalapeños", isDefault: true, isRemovable: false },
      { name: "Queso pepper jack", isDefault: true, isRemovable: true },
      { name: "Salsa spicy", isDefault: true, isRemovable: false },
    ],
    extras: [
      { name: "Jalapeños Extra", price: 600 },
      { name: "Salsa Extra", price: 400 },
    ],
  },
  "veggie-stack": {
    id: "7",
    name: "Veggie Stack",
    slug: "veggie-stack",
    description: "Nuestra opción vegetariana. Hamburguesa de garbanzos y quinoa artesanal, verduras grilladas, palta, lechuga y salsa de yogurt con hierbas.",
    shortDescription: "Garbanzos, quinoa, verduras grilladas, palta.",
    basePrice: 6800,
    category: "Clásicas",
    prepTime: 15,
    stock: 20,
    ingredients: [
      { name: "Hamburguesa vegetal", isDefault: true, isRemovable: false },
      { name: "Pan integral", isDefault: true, isRemovable: false },
      { name: "Verduras grilladas", isDefault: true, isRemovable: true },
      { name: "Palta", isDefault: true, isRemovable: true },
      { name: "Salsa yogurt", isDefault: true, isRemovable: false },
    ],
    extras: [
      { name: "Palta Extra", price: 1000 },
      { name: "Queso Feta", price: 800 },
    ],
  },
  "bbq-smokehouse": {
    id: "8",
    name: "BBQ Smokehouse",
    slug: "bbq-smokehouse",
    description: "Carne ahumada estilo smokehouse, salsa BBQ secreta, aros de cebolla crujientes, queso americano y marinada especial. Sabor texano auténtico.",
    shortDescription: "Carne ahumada, BBQ, aros de cebolla.",
    basePrice: 8900,
    category: "Premium",
    prepTime: 18,
    stock: 18,
    ingredients: [
      { name: "Carne ahumada 200g", isDefault: true, isRemovable: false },
      { name: "Pan brioche", isDefault: true, isRemovable: false },
      { name: "Salsa BBQ", isDefault: true, isRemovable: false },
      { name: "Aros de cebolla", isDefault: true, isRemovable: true },
      { name: "Queso americano", isDefault: true, isRemovable: true },
    ],
    extras: [
      { name: "Tocino Extra", price: 1200 },
      { name: "Aros Extra", price: 800 },
    ],
  },
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params
  const product = products[slug]

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border py-4">
        <div className="container mx-auto px-4">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← Volver al menú
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center sticky top-24">
              <span className="text-[12rem]">🍔</span>
              <span className="absolute top-4 left-4 px-3 py-1 text-sm font-bold bg-primary text-primary-foreground rounded-full">
                {product.category}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-display font-bold mb-2">{product.name}</h1>
              <p className="text-muted-foreground mb-4">{product.shortDescription}</p>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-primary">
                  ${product.basePrice.toLocaleString("es-CL")}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  ⏱ Prep: {product.prepTime} min
                </span>
                <span>📦 {product.stock} disponibles</span>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Ingredients */}
            <div>
              <h3 className="font-semibold mb-3">Ingredientes</h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ing: any, i: number) => (
                  <span
                    key={i}
                    className={`px-3 py-1 rounded-full text-sm ${
                      ing.isRemovable
                        ? "bg-accent/20 text-accent-foreground"
                        : "bg-primary/20 text-primary"
                    }`}
                  >
                    {ing.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Extras */}
            <div>
              <h3 className="font-semibold mb-3">Extras disponibles</h3>
              <div className="grid grid-cols-2 gap-3">
                {product.extras.map((extra: any, i: number) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-lg border bg-card"
                  >
                    <span className="text-sm">{extra.name}</span>
                    <span className="text-sm text-primary font-semibold">
                      +${extra.price.toLocaleString("es-CL")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold mb-3">Cantidad</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg">
                  <button className="px-3 py-2 hover:bg-accent">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-semibold">1</span>
                  <button className="px-3 py-2 hover:bg-accent">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Observations */}
            <div>
              <Label htmlFor="obs">Observaciones</Label>
              <Input
                id="obs"
                placeholder="Ej: Sin cebolla, extra mayo..."
                className="mt-2"
              />
            </div>

            {/* Add to Cart */}
            <Card className="bg-card border-primary/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg">Total:</span>
                  <span className="text-3xl font-bold text-primary">
                    ${product.basePrice.toLocaleString("es-CL")}
                  </span>
                </div>
                <Link href="/cart">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-lg py-6">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Agregar al Carrito
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
