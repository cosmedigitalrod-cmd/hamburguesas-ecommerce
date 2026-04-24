# 🍔 Hamburguesas E-commerce — Memoria del Proyecto

**Proyecto:** Ecommerce de hamburguesas artesanales premium  
**Fecha inicio:** 2026-04-24  
**Ubicación:** `C:\agenteP\DigitalRod\hamburguesas-ecommerce`  
**Stack:** Next.js 15+ (App Router), TypeScript, Tailwind CSS, shadcn/ui, Supabase, Netlify  
**Moneda:** CLP (pesos chilenos)

---

## 1. Resumen Ejecutivo

Ecommerce de hamburguesas artesanales premium con estética dark/industrial y acentos cálidos (mostaza/rojo/naranja). Mobile-first, orientado a conversión. Backend completo con Supabase (PostgreSQL, Auth, Storage). Despliegue en Netlify.

---

## 2. Stack Técnico

| Capa | Tecnología |
|------|------------|
| Frontend | Next.js 15+ App Router, TypeScript |
| Estilos | Tailwind CSS |
| UI Components | shadcn/ui |
| Backend | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Storage | Supabase Storage |
| State | Zustand o Context API |
| Forms | React Hook Form + Zod |
| Icons | Lucide |
| Hosting | Netlify |

---

## 3. Diseño UX/UI

### Paleta de Colores
- **Fondo:** Carbón / neutro oscuro (`#1a1a1a` / `#0f0f0f`)
- **Acento primario:** Amarillo mostaza (`#E5A827`)
- **Acento secundario:** Rojo ketchup suave (`#C0392B`)
- **Acento terciario:** Naranja parrilla (`#E67E22`)
- **Texto principal:** Blanco (`#FFFFFF`)
- **Texto secundario:** Gris claro (`#A0A0A0`)

### Tipografía
- **Display/Títulos:** Fuente bold/strong (ej: Inter, Poppins)
- **Cuerpo/UI:** Tipografía legible (ej: Inter, Roboto)

### Estilo
- Dark mode industrial
- Fotos grandes de hamburguesas
- Cards elegantes, no caricaturescas
- Fast-casual premium moderno

### CTAs principales
- "Pide ahora"
- "Arma tu burger"
- "Ver combo"

---

## 4. Catálogo de Productos (Demo)

### Hamburguesas (8)
1. Clásica — $4.500
2. Doble Carne — $6.500
3. BBQ Bacon — $7.200
4. Cheese Deluxe — $7.800
5. Trufa Pound — $9.500
6. Spicy Jalapeño — $7.500
7. Veggie Stack — $6.800
8. BBQ Smokehouse — $8.900

### Combos (4)
1. Combo Clásico — $6.500 (burger + papas + bebida)
2. Combo Doble — $8.900 (doble + papas + bebida)
3. Combo Kids — $4.500 (mini burger + nuggets + jugo)
4. Combo Full — $11.900 (premium + papas grandes + batido)

### Acompañamientos (4)
1. Papas Fritas — $2.200
2. Papas con Queso — $3.200
3. Nuggets (6 uds) — $3.500
4. Aros de Cebolla — $3.000

### Bebidas (4)
1. Bebida 500ml — $1.500
2. Jugo Natural — $2.000
3. Batidohelado — $3.200
4. Agua Mineral — $1.000

### Extras (6)
1. Queso Cheddar Extra — $800
2. Tocino Crujiente — $1.200
3. Pepinillos — $500
4. Cebolla Caramelizada — $800
5. Salsa Extra — $400
6. Huevo Frito — $900

### Promociones (3)
1. Martes de Doble: 2x1 en Dobles
2. Happy Hour: Bebidas 2x1 (18-20h)
3. Delivery Gratis: Pedidos sobre $15.000

---

## 5. Modelo de Datos (Supabase)

### Tablas principales

- **profiles** — users + datos extra (teléfono, dirección)
- **roles** — admin, usuario
- **categories** — entradas, burgers, combos, acompañamientos, bebidas, postres
- **products** — productos con precios, descripciones, stock
- **product_images** — imágenes múltiples por producto
- **product_variants** — tallas/versiones de producto
- **product_extras** — extras vendibles (tocino, huevo, etc.)
- **ingredients** — ingredientes base
- **product_ingredients** — relación producto-ingredientes
- **carts** — carritos por usuario/sesión
- **cart_items** — ítems del carrito con personalización
- **orders** — pedidos
- **order_items** — ítems del pedido
- **addresses** — direcciones de entrega
- **coupons** — cupones de descuento
- **reviews** — reseñas de productos
- **banners** — banners promocionales
- **site_settings** — configuración del sitio

### Estados de pedido
`pending → confirmed → preparing → delivering → delivered | cancelled`

---

## 6. Flujos Críticos

### Agregar al carrito
1. Usuario selecciona producto
2. Elige personalización (pan, extras, quitar ingredientes)
3. Elige cantidad
4. Se calcula precio en tiempo real
5. Se guarda en `carts` / `cart_items` (por sesión o usuario)

### Checkout
1. Revisar carrito (verificar stock)
2. Datos del cliente (invitado o autenticado)
3. Dirección de entrega
4. Método de entrega (delivery/retiro)
5. Método de pago (simulado por ahora)
6. Aplicar cupón si existe
7. Crear pedido en base de datos (RPC segura)
8. Confirmación

### Cupones
- Descuento porcentual o monto fijo
- Mínimo de compra
- Una sola vez / reutilizable
- Validación en servidor (RPC)

---

## 7. Rutas / Páginas

| Ruta | Descripción |
|------|-------------|
| `/` | Home/Landing |
| `/menu` | Catálogo completo |
| `/menu/[slug]` | Detalle de producto |
| `/cart` | Carrito |
| `/checkout` | Checkout |
| `/login` | Login |
| `/register` | Registro |
| `/perfil` | Cuenta usuario |
| `/perfil/pedidos` | Historial pedidos |
| `/perfil/pedidos/[id]` | Detalle pedido |
| `/admin` | Dashboard admin |
| `/admin/productos` | CRUD productos |
| `/admin/categorias` | CRUD categorías |
| `/admin/pedidos` | Gestión pedidos |
| `/admin/promociones` | Gestionar cupones/banners |

---

## 8. Variables de Entorno Necesarias

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Netlify
NEXT_PUBLIC_SITE_URL=
```

---

## 9. Netlify

- Build command: `npm run build`
- Publish directory: `.next`
- Variables de entorno vía Netlify Dashboard
- Posible uso de Netlify Dev para local

---

## 10. GitHub

- Rama principal: `main`
- Rama desarrollo: `develop`
- Convenciones: `feature/*`, `fix/*`, `docs/*`
- Pull requests con review

---

## 11. Pendientes

- [ ] Crear estructura base Next.js
- [ ] Configurar Tailwind + shadcn/ui
- [ ] Configurar Supabase (crear proyecto, ejecutar SQL)
- [ ] Implementar componentes UI base
- [ ] Crear todas las páginas
- [ ] Implementar autenticación
- [ ] Implementar carrito y checkout
- [ ] Implementar panel admin
- [ ] Configurar RLS completo
- [ ] Desplegar en Netlify
- [ ] Conectar a GitHub

---

## 12. Riesgos Técnicos

1. **RLS complejo** → Usar RPC para operaciones críticas
2. **Stock en tiempo real** → Validar en servidor antes de confirmar pedido
3. **Imágenes pesadas** → Next.js Image + lazy loading
4. **SSR en Netlify** → Revisar configuración de Next.js para Netlify

---

*Creado: 2026-04-24*
*Última actualización: 2026-04-24*
