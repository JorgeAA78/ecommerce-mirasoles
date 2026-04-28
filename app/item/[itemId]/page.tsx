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
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              {product.name}
            </h1>
            
            <p className="text-3xl md:text-4xl font-bold text-[#FF69B4] mb-6">
              {formatPrice(product.price)}
            </p>

            <div className="flex flex-col gap-3 mb-6">
              <Link
                href={`/checkout/${checkoutId}`}
                className="bg-[#F2C94C] text-black text-center py-4 px-8 font-semibold text-lg hover:bg-[#E0B83D] transition-colors"
              >
                Comprar ahora
              </Link>
              <AddToCartButton product={product} />
            </div>

            <div className="mt-4">
              <h2 className="text-sm font-medium text-gray-500 mb-2">Descripción:</h2>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
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
