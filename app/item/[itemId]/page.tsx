import { api } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ItemPageProps {
  params: Promise<{ itemId: string }>;
}

export default async function ItemPage({ params }: ItemPageProps) {
  const { itemId } = await params;
  
  let product;
  try {
    product = await api.products.getById(itemId);
  } catch (error) {
    console.error('Error fetching product:', error);
    notFound();
  }

  if (!product) {
    notFound();
  }

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
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
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              {product.name}
            </h1>
            
            <p className="text-3xl md:text-4xl font-bold mb-6">
              ${product.price}
            </p>

            <Link
              href={`/checkout/${product.id || product.objectID}`}
              className="bg-[#F2C94C] text-black text-center py-4 px-8 font-semibold text-lg hover:bg-[#E0B83D] transition-colors mb-6"
            >
              Comprar
            </Link>

            <div className="mt-4">
              <h2 className="text-sm font-medium text-gray-500 mb-2">Descripción:</h2>
              <p className="text-gray-700 leading-relaxed">
                {product.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet eros suscipit pulvinar euismod. Suspendisse potenti.'}
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
