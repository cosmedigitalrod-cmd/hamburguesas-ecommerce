import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import Link from "next/link";
import { ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "BurgerHub | Hamburguesas Artesanales Premium",
  description: "Las mejores hamburguesas artesanales premium de Concepción. Personaliza tu burger, arma combos y disfruta del sabor urbano. Delivery disponible.",
  keywords: ["hamburguesas", "artesanales", "premium", "Concepción", "delivery", "comida rápida"],
  openGraph: {
    title: "BurgerHub | Hamburguesas Artesanales Premium",
    description: "Sabor gourmet urbano, hecho a mano. Pide ahora y disfruta.",
    images: ["/og-image.jpg"],
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BurgerHub | Hamburguesas Artesanales",
    description: "Las mejores hamburguesas artesanales premium",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className={cn(inter.variable, poppins.variable, "min-h-screen bg-background font-body antialiased")}>
        {/* Navbar */}
        <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-3xl font-display font-bold text-primary">BurgerHub</span>
              <span className="text-2xl">🍔</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/menu" className="text-sm font-medium hover:text-primary transition">
                Menú
              </Link>
              <Link href="/menu?category=combos" className="text-sm font-medium hover:text-primary transition">
                Combos
              </Link>
              <Link href="/menu?category=promociones" className="text-sm font-medium hover:text-primary transition">
                Promociones
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <Link href="/cart">
                <Button variant="outline" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                    0
                  </span>
                </Button>
              </Link>
              <Link href="/perfil">
                <Button variant="outline" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-border bg-card/50 py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand */}
              <div className="space-y-4">
                <h3 className="text-2xl font-display font-bold text-primary">BurgerHub</h3>
                <p className="text-sm text-muted-foreground">
                  Hamburguesas artesanales premium. Sabor gourmet urbano, hecho a mano con los mejores ingredientes.
                </p>
              </div>

              {/* Links */}
              <div>
                <h4 className="font-semibold mb-4">Menú</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/menu" className="hover:text-primary transition">Todas las burgers</Link></li>
                  <li><Link href="/menu?category=combos" className="hover:text-primary transition">Combos</Link></li>
                  <li><Link href="/menu?category=acompañamientos" className="hover:text-primary transition">Acompañamientos</Link></li>
                  <li><Link href="/menu?category=bebidas" className="hover:text-primary transition">Bebidas</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Cuenta</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/perfil" className="hover:text-primary transition">Mi perfil</Link></li>
                  <li><Link href="/perfil/pedidos" className="hover:text-primary transition">Mis pedidos</Link></li>
                  <li><Link href="/login" className="hover:text-primary transition">Iniciar sesión</Link></li>
                  <li><Link href="/register" className="hover:text-primary transition">Registrarse</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Contacto</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>📍 Concepción, Biobío</li>
                  <li>📞 +56 9 1234 5678</li>
                  <li>✉️ hola@burgerhub.cl</li>
                  <li>⏰ Lun-Dom: 12:00 - 23:00</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
              <p>&copy; 2026 BurgerHub. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
