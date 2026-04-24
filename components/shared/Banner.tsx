"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface BannerSlide {
  id: string
  title: string
  subtitle: string
  cta: string
  ctaLink: string
  image: string
}

const slides: BannerSlide[] = [
  {
    id: "1",
    title: "¡Nuevas Hamburguesas Premium!",
    subtitle: "Prueba nuestra Trufa Pound con aceite de trufa blanca",
    cta: "Ver Menú",
    ctaLink: "/menu",
    image: "/images/banners/premium.jpg",
  },
  {
    id: "2",
    title: "Envío Gratis",
    subtitle: "En pedidos sobre $15.000",
    cta: "Ordenar",
    ctaLink: "/menu",
    image: "/images/banners/delivery.jpg",
  },
  {
    id: "3",
    title: "Martes de Doble",
    subtitle: "2x1 en todas las Clásicas",
    cta: "Ver Oferta",
    ctaLink: "/menu",
    image: "/images/banners/tuesday.jpg",
  },
]

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full overflow-hidden rounded-2xl">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map(slide => (
          <div
            key={slide.id}
            className="w-full flex-shrink-0 bg-gradient-to-br from-primary/20 via-gray-900 to-gray-900 rounded-2xl"
          >
            <div className="flex flex-col md:flex-row items-center gap-8 p-8 md:p-12">
              <div className="flex-1 text-center md:text-left">
                <Badge variant="secondary" className="mb-4">
                  🍔 Nuevo
                </Badge>
                <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
                  {slide.title}
                </h2>
                <p className="text-xl text-muted-foreground mb-6">
                  {slide.subtitle}
                </p>
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link href={slide.ctaLink}>{slide.cta}</Link>
                </Button>
              </div>
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
                <span className="text-[8rem]">🍔</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-background/50 hover:bg-background"
          onClick={() => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? "w-8 bg-primary" : "w-2 bg-muted"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-background/50 hover:bg-background"
          onClick={() => setCurrentSlide(prev => (prev + 1) % slides.length)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
