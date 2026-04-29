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
│   ├── cart/                # Carrito de compras con calculadora de CP y opciones de envío
│   ├── checkout/[itemId]/   # Formulario completo de checkout y redirección a MercadoPago
│   ├── contacto/            # Formulario de contacto y publicidad
│   ├── item/[itemId]/       # Detalle avanzado de producto (promos, cuotas, envío)
│   ├── logout/              # Cierre de sesión (Actualización en tiempo real)
│   ├── mision-vision/       # Página estática: Misión y Visión
│   ├── privacidad/          # Política de Privacidad
│   ├── profile/             # Perfil del usuario
│   ├── quienes-somos/       # Página estática: Quiénes Somos
│   ├── search/              # Búsqueda de productos
│   ├── signin/              # Login (passwordless) con reenvío de código y cooldown
│   ├── terminos/            # Términos de Uso
│   ├── thanks/              # Confirmación post-pago
│   ├── globals.css          # Estilos globales y design system
│   ├── layout.tsx           # Layout raíz (Header + Footer + WhatsApp)
│   └── page.tsx             # Home con productos destacados
├── components/
│   └── ui/
│       ├── Header.tsx           # Header con barra de navegación completa y dropdown de categorías
│       ├── Footer.tsx           # Footer con links legales, medios de pago y medios de envío
│       ├── ProductCard.tsx      # Card de producto reutilizable (con stock y descripción)
│       ├── WhatsAppButton.tsx   # Botón flotante global de WhatsApp
│       └── index.ts             # Barrel exports
├── lib/
│   ├── api.ts              # Cliente API tipado (auth, user, products, orders)
│   ├── auth.ts             # Manejo de JWT en localStorage con eventos globales (`auth-change`)
│   └── cart.tsx            # Contexto del carrito de compras
├── next.config.ts          # Configuración de Next.js (dominios permitidos como Wikimedia)
└── package.json
```

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Página de inicio con productos destacados |
| `/signin` | Login passwordless (email + código) |
| `/profile` | Perfil del usuario (nombre, dirección, teléfono) |
| `/search?q={query}` | Búsqueda de productos |
| `/item/{itemId}` | Detalle avanzado de producto |
| `/cart` | Carrito con cálculo de envío y subtotal |
| `/checkout/{itemId}` | Formulario de facturación, entrega y conexión con MercadoPago |
| `/contacto` | Página para contactarse o publicar productos |
| `/quienes-somos` | Información sobre la empresa y compromiso |
| `/mision-vision` | Detalles de misión y visión corporativa |
| `/terminos` | Términos de Uso del sitio |
| `/privacidad` | Política de Privacidad del sitio |
| `/thanks` | Confirmación después de pagar |
| `/logout` | Cierra sesión y redirige al home |

## Funcionalidades Recientes Destacadas

- **Autenticación en Tiempo Real:** El `Header` detecta automáticamente (mediante eventos globales) cuando el usuario inicia o cierra sesión sin necesidad de recargar la página.
- **Navegación Intuitiva:** El header cuenta con un dropdown interactivo para las categorías y accesos rápidos a las páginas institucionales.
- **Flujo de Checkout Completo:**
  - El carrito permite seleccionar *Retiro desde local* o *Envío a domicilio*.
  - La página de checkout recolecta obligatoriamente *Datos de contacto, Facturación y Entrega* (incluyendo DNI si retira un tercero) antes de habilitar la derivación a Mercado Pago.
- **Botón de WhatsApp Flotante:** Visible a lo largo de toda la aplicación para contacto inmediato.
- **Transparencia Legal e Información Comercial:** Inclusión de tarjetas aceptadas (Visa, Mastercard, Amex), métodos de envío (Correo Argentino, Rapi Moto), y las políticas de privacidad y términos adaptadas a la legislación argentina.

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
2. Hace clic en un producto → ve el detalle avanzado (promociones, cuotas)
3. Agrega productos al carrito (`/cart`)
4. Elige método de entrega y hace clic en "Ir a pagar"
5. Completa el formulario de facturación en el **Checkout**
6. Se genera una orden via `POST /order` → obtiene link de MercadoPago
7. Usuario paga en MercadoPago (sandbox con tarjetas de prueba)
8. MercadoPago redirige a `/thanks`

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
| `#FF69B4` (rosa) | Bordes de cards, detalles y precios destacados |
| `#87CEEB` (celeste) | Fondos de secciones |
| `#54A0B8` (azul verdoso) | Promociones y mensajes de cuotas |

## Autor

Jorge Altamirano
