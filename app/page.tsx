import Link from "next/link";
import { ArrowRight, Star, Truck, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Datos demo - en producción vendrán de Supabase
const featuredProducts = [
  {
    id: "1",
    name: "Clásica",
    slug: "clasica",
    description: "Carne de res 150g, queso cheddar, lechuga, tomate y salsa especial.",
    price: 4500,
    image: "/images/burgers/clasica.jpg",
    category: "Clásicas",
  },
  {
    id: "2",
    name: "Doble Carne",
    slug: "doble-carne",
    description: "Doble carne de res 150g cada una, doble queso cheddar, bacon crujiente.",
    price: 6500,
    image: "/images/burgers/doble-carne.jpg",
    category: "Clásicas",
  },
  {
    id: "3",
    name: "BBQ Bacon",
    slug: "bbq-bacon",
    description: "Carne de res 200g, bacon ahumado, queso瑞士, cebolla caramelizada, salsa BBQ.",
    price: 7200,
    image: "/images/burgers/bbq-bacon.jpg",
    category: "Premium",
  },
  {
    id: "4",
    name: "Cheese Deluxe",
    slug: "cheese-deluxe",
    description: "Carne premium 180g, triple queso (cheddar, suizo, feta), tocino.",
    price: 7800,
    image: "/images/burgers/cheese-deluxe.jpg",
    category: "Premium",
  },
];

const combos = [
  {
    id: "c1",
    name: "Combo Clásico",
    price: 6500,
    description: "Burger + Papas fritas + Bebida 500ml",
    image: "/images/combos/clasico.jpg",
  },
  {
    id: "c2",
    name: "Combo Doble",
    price: 8900,
    description: "Doble Burger + Papas grandes + Bebida 500ml",
    image: "/images/combos/doble.jpg",
  },
  {
    id: "c3",
    name: "Combo Full",
    price: 11900,
    description: "Burger Premium + Papas grandes + Batido",
    image: "/images/combos/full.jpg",
  },
];

const promotions = [
  {
    id: "p1",
    title: "Martes de Doble",
    description: "2x1 en todas las Hamburguesas Dobles",
    badge: "🔥 2x1",
    color: "bg-secondary",
  },
  {
    id: "p2",
    title: "Delivery Gratis",
    description: "Envío gratis en pedidos sobre $15.000",
    badge: "🚚 Gratis",
    color: "bg-accent",
  },
  {
    id: "p3",
    title: "Happy Hour",
    description: "Bebidas 2x1 de 18:00 a 20:00 hrs",
    badge: "⏰ 2x1",
    color: "bg-primary",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-6 animate-fade-in">
              Sabor Gourmet
              <span className="text-primary block">Urbano.</span>
              Hecho a Mano.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Descubre nuestras hamburguesas artesanales premium con ingredientes frescos y sabores inigualables.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/menu">
                  Ver Menú <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 border-primary text-primary hover:bg-primary/10">
                <Link href="/menu?category=combos">
                  Ver Combos
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Promotions Banner */}
      <section className="py-8 bg-card/50 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {promotions.map((promo) => (
              <Card key={promo.id} className={`${promo.color} border-0`}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-lg">{promo.title}</p>
                    <p className="text-sm opacity-90">{promo.description}</p>
                  </div>
                  <span className="text-2xl">{promo.badge.split(" ")[0]}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Ingredientes Premium</h3>
              <p className="text-sm text-muted-foreground">Calidad gourmet en cada bocado</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Preparación Rápida</h3>
              <p className="text-sm text-muted-foreground">Lista en 15-20 minutos</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Delivery Express</h3>
              <p className="text-sm text-muted-foreground">En Concepción y alrededores</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Retiro en Local</h3>
              <p className="text-sm text-muted-foreground">Ven y recógela caliente</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Burgers */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold">Nuestras Hamburguesas</h2>
              <p className="text-muted-foreground mt-2">Las más populares de la semana</p>
            </div>
            <Button asChild variant="link" className="text-primary">
              <Link href="/menu">Ver todas →</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group overflow-hidden hover:border-primary transition-colors">
                <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-6xl">
                    🍔
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 text-xs font-bold bg-primary text-primary-foreground rounded">
                      {product.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
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
        </div>
      </section>

      {/* Combos Section */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Combos irresistibles</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Arma tu pedido con combos que incluyen burger + acompañamiento + bebida. ¡El ahorro perfecto!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {combos.map((combo) => (
              <Card key={combo.id} className="group hover:border-primary transition-colors">
                <div className="aspect-video bg-gradient-to-br from-secondary/30 to-primary/20 relative flex items-center justify-center">
                  <span className="text-7xl group-hover:scale-110 transition-transform">🍔</span>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-2">{combo.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{combo.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      ${combo.price.toLocaleString("es-CL")}
                    </span>
                    <Button asChild className="bg-secondary hover:bg-secondary/90">
                      <Link href={`/menu/${combo.id}`}>
                        Pedir Combo
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/20 via-secondary/10 to-accent/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            ¿Listo para armar tu burger?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Personaliza cada detalle, elige tus extras favoritos y disfruta del sabor único de BurgerHub.
          </p>
          <Button asChild size="lg" className="text-lg px-12 py-6 bg-primary hover:bg-primary/90">
            <Link href="/menu">
              Comenzar Ahora <ArrowRight className="ml-2 h-6 w-6" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
