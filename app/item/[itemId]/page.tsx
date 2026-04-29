import { api } from '@/lib/api';
import { extractIdFromSlug, formatPrice } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AddToCartButton from './AddToCartButton';

interface ItemPageProps {
  params: Promise<{ itemId: string }>;
}

export default async function ItemPage({ params }: ItemPageProps) {
  const { itemId } = await params;
  const productId = extractIdFromSlug(itemId);
  
  let product;
  try {
    product = await api.products.getById(productId);
  } catch (error) {
    console.error('Error fetching product:', error);
    notFound();
  }

  if (!product) {
    notFound();
  }

  const checkoutId = product.id || product.objectID;

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-black">Inicio</Link>
          <span className="mx-2">/</span>
          {product.category && (
            <>
              <Link href={`/search?category=${product.category}`} className="hover:text-black capitalize">{product.category}</Link>
              <span className="mx-2">/</span>
            </>
          )}
          <span className="text-black">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-gray-100 aspect-square relative">
            <Image
              src={product.imageUrl || '/placeholder.png'}
              alt={product.name}
              fill
              className="object-contain p-8"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {product.category && (
              <span className="absolute top-4 left-4 bg-black/70 text-white text-xs px-3 py-1 rounded">
                {product.category}
              </span>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col text-gray-800">
            <h1 className="text-2xl md:text-[28px] font-bold leading-tight mb-4">
              {product.name}
            </h1>
            
            <div className="mb-6">
              <p className="text-4xl font-black mb-1">
                {formatPrice(product.price)}
              </p>
              <p className="text-sm text-gray-500">
                Precio sin impuestos {formatPrice(product.price * 0.79)}
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-[#54A0B8] mb-2">¡Llevá 3 y pagá 2!</h3>
              <p className="text-gray-700 mb-1">
                Vas a poder aprovechar esta promoción en cualquier producto de la tienda.
              </p>
              <p className="text-sm text-gray-500">
                No acumulable con algunas promociones
              </p>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-2 text-[#54A0B8] font-bold mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span>3 cuotas sin interés de {formatPrice(product.price / 3)}</span>
              </div>
              <a href="#detalles" className="text-sm font-bold underline cursor-pointer hover:text-gray-600">Ver más detalles</a>
            </div>

            {/* Selector de cantidad y Agregar al carrito */}
            <AddToCartButton product={product} />

            {/* Medios de envío */}
            <div className="border-t border-gray-200 py-6 mb-2">
              <div className="flex items-center gap-2 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                <span className="text-sm font-medium">Medios de envío</span>
              </div>
              <div className="flex w-full mb-3">
                <input 
                  type="text" 
                  placeholder="Tu código postal" 
                  className="flex-1 border border-gray-300 rounded-l px-4 py-3 text-sm focus:outline-none focus:border-black"
                />
                <button className="bg-white text-black font-bold text-sm tracking-wider uppercase border border-l-0 border-black rounded-r px-6 py-3 hover:bg-gray-50">
                  Calcular
                </button>
              </div>
              <a href="#" className="text-sm text-gray-500 hover:underline">No sé mi código postal</a>
            </div>

            {/* Devolvelo gratis */}
            <div className="py-4 mb-6">
              <h4 className="font-bold mb-1">¡Devolvelo gratis!</h4>
              <p className="text-sm text-gray-700">
                Si no te gustó o no te convence, podés devolverlo cuando quieras.
              </p>
            </div>

            <div id="detalles" className="mt-8 pt-8 border-t border-gray-200">
              <h2 className="text-lg font-bold mb-4">Descripción del producto</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {product.description || "Sin descripción detallada disponible."}
              </p>
            </div>

            {product.stock !== undefined && (
              <p className="mt-4 text-sm text-gray-500">
                Stock disponible: {product.stock} unidades
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
