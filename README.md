# Mirasoles Market - Frontend

E-commerce frontend responsive construido con Next.js que consume el backend [E-commerce-Backend](../E-commerce-Backend/).

## Tech Stack

- **Next.js 16** (App Router + Turbopack)
- **React 19**
- **TypeScript**
- **TailwindCSS v4**
- **MercadoPago** (integración de pagos vía backend)

## Estructura del Proyecto

```
ecomerce/
├── app/
│   ├── checkout/[itemId]/   # Página de checkout con MercadoPago
│   ├── item/[itemId]/       # Detalle de producto
│   ├── logout/              # Cierre de sesión
│   ├── profile/             # Perfil del usuario
│   ├── search/              # Búsqueda de productos
│   ├── signin/              # Login (passwordless)
│   ├── thanks/              # Confirmación post-pago
│   ├── globals.css          # Estilos globales y design system
│   ├── layout.tsx           # Layout raíz (Header + Footer)
│   └── page.tsx             # Home con productos destacados
├── components/
│   └── ui/
│       ├── Header.tsx       # Header con navegación y buscador
│       ├── Footer.tsx       # Footer con links y redes
│       ├── ProductCard.tsx  # Card de producto reutilizable
│       └── index.ts         # Barrel exports
├── lib/
│   ├── api.ts              # Cliente API tipado (auth, user, products, orders)
│   └── auth.ts             # Manejo de JWT en localStorage
├── next.config.ts          # Configuración de Next.js (dominios de imágenes)
└── package.json
```

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Página de inicio con productos destacados |
| `/signin` | Login passwordless (email + código) |
| `/profile` | Perfil del usuario (nombre, dirección, teléfono) |
| `/search?q={query}` | Búsqueda de productos |
| `/item/{itemId}` | Detalle de un producto |
| `/checkout/{itemId}` | Inicio del pago con MercadoPago |
| `/thanks` | Confirmación después de pagar |
| `/logout` | Cierra sesión y redirige al home |

## Requisitos Previos

- Node.js >= 18
- Backend corriendo en `http://localhost:3000` (ver [E-commerce-Backend](../E-commerce-Backend/))

## Instalación

```bash
npm install
```

## Variables de Entorno

Crear un archivo `.env.local` en la raíz:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Desarrollo

```bash
# Iniciar el backend primero (en otra terminal)
cd ../E-commerce-Backend
npm run dev

# Iniciar el frontend
npm run dev -- -p 3001
```

Abrir [http://localhost:3001](http://localhost:3001)

## Flujo de Compra

1. Usuario navega productos en el home o busca
2. Hace clic en un producto → ve el detalle
3. Hace clic en "Comprar" → va al checkout
4. Se genera una orden via `POST /order` → obtiene link de MercadoPago
5. Usuario paga en MercadoPago (sandbox con tarjetas de prueba)
6. MercadoPago redirige a `/thanks`

### Tarjetas de Prueba (MercadoPago Sandbox)

| Campo | Valor |
|-------|-------|
| Número | 5031 7557 3453 0604 |
| Vencimiento | 11/25 |
| CVV | 123 |
| Nombre | APRO |
| DNI | 12345678 |

> Usar nombre "APRO" para aprobado, "OTHE" para rechazado.

## Build para Producción

```bash
npm run build
npm start
```

## Deploy en Vercel

1. Subir el proyecto a GitHub
2. Importar en [Vercel](https://vercel.com)
3. Configurar variable de entorno: `NEXT_PUBLIC_API_URL` = URL del backend en producción
4. Deploy automático

## Design System

| Color | Uso |
|-------|-----|
| `#F2C94C` (amarillo) | Botones principales, acentos |
| `#1A1A1A` (negro) | Header, footer, textos |
| `#FF69B4` (rosa) | Bordes de cards, detalles |
| `#87CEEB` (celeste) | Fondos de secciones |

## Autor

Jorge Altamirano
