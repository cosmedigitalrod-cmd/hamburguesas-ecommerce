import Link from "next/link"
import { Search, Filter, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Datos demo - en producción vendrán de Supabase
const categories = [
  { id: "todas", name: "Todas", slug: "todas", count: 24 },
  { id: "clasicas", name: "Clásicas", slug: "clasicas", count: 6 },
  { id: "premium", name: "Premium", slug: "premium", count: 4 },
  { id: "combos", name: "Combos", slug: "combos", count: 4 },
  { id: "acompañamientos", name: "Acompañamientos", slug: "acompañamientos", count: 6 },
  { id: "bebidas", name: "Bebidas", slug: "bebidas", count: 5 },
  { id: "postres", name: "Postres", slug: "postres", count: 3 },
]

const products = [
  {
    id: "1",
    name: "Clásica",
    slug: "clasica",
    description: "Carne de res 150g, queso cheddar, lechuga, tomate y salsa especial.",
    price: 4500,
    image: "/images/burgers/clasica.jpg",
    category: "Clásicas",
    isFeatured: true,
  },
  {
    id: "2",
    name: "Doble Carne",
    slug: "doble-carne",
    description: "Doble carne de res 150g cada una, doble queso cheddar, bacon crujiente.",
    price: 6500,
    image: "/images/burgers/doble-carne.jpg",
    category: "Clásicas",
    isFeatured: true,
  },
  {
    id: "3",
    name: "BBQ Bacon",
    slug: "bbq-bacon",
    description: "Carne de res 200g, bacon ahumado, queso suizo, cebolla caramelizada, salsa BBQ.",
    price: 7200,
    image: "/images/burgers/bbq-bacon.jpg",
    category: "Premium",
    isFeatured: true,
  },
  {
    id: "4",
    name: "Cheese Deluxe",
    slug: "cheese-deluxe",
    description: "Carne premium 180g, triple queso (cheddar, suizo, feta), tocino.",
    price: 7800,
    image: "/images/burgers/cheese-deluxe.jpg",
    category: "Premium",
    isFeatured: true,
  },
  {
    id: "5",
    name: "Trufa Pound",
    slug: "trufa-pound",
    description: "Carne de res con toque de trufa blanca, rúcula, tomate cherry.",
    price: 9500,
    image: "/images/burgers/trufa-pound.jpg",
    category: "Premium",
    isFeatured: false,
  },
  {
    id: "6",
    name: "Spicy Jalapeño",
    slug: "spicy-jalapeno",
    description: "Carne 180g, jalapeños, queso pepper jack, salsa spicy.",
    price: 7500,
    image: "/images/burgers/spicy.jpg",
    category: "Clásicas",
    isFeatured: false,
  },
  {
    id: "7",
    name: "Veggie Stack",
    slug: "veggie-stack",
    description: "Hamburguesa vegetal de garbanzos, quinoa, verduras grilladas.",
    price: 6800,
    image: "/images/burgers/veggie.jpg",
    category: "Clásicas",
    isFeatured: false,
  },
  {
    id: "8",
    name: "BBQ Smokehouse",
    slug: "bbq-smokehouse",
    description: "Carne ahumada estilo smokehouse, salsa BBQ secreta, aros de cebolla.",
    price: 8900,
    image: "/images/burgers/smokehouse.jpg",
    category: "Premium",
    isFeatured: false,
  },
]

export default function MenuPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-card/50 border-b border-border py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-display font-bold mb-2">Nuestro Menú</h1>
          <p className="text-muted-foreground">
            Explora nuestras hamburguesas artesanales y arma tu pedido perfecto
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Categories */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar..."
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Categorías
                </h3>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/menu?category=${cat.slug}`}
                    className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <span className="text-sm">{cat.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {cat.count}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Mostrando <span className="font-semibold text-foreground">{products.length}</span> productos
              </p>
              <select className="px-3 py-2 rounded-lg border bg-background text-sm">
                <option>Ordenar por: Destacados</option>
                <option>Precio: menor a mayor</option>
                <option>Precio: mayor a menor</option>
                <option>Nombre: A-Z</option>
              </select>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="group overflow-hidden hover:border-primary transition-all duration-300">
                  <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 relative flex items-center justify-center">
                    <span className="text-8xl group-hover:scale-110 transition-transform duration-300">
                      🍔
                    </span>
                    {product.isFeatured && (
                      <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                        Destacada
                      </Badge>
                    )}
                    <Badge variant="secondary" className="absolute top-3 right-3">
                      {product.category}
                    </Badge>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {product.description}
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
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-12">
              <Button variant="outline" size="icon" disabled>
                ‹
              </Button>
              <Button variant="outline" size="sm" className="bg-primary">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="icon">
                ›
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
