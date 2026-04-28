'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/api';
import { useCart } from '@/lib/cart';
import { buildProductUrl, formatPrice } from '@/lib/utils';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="border-2 border-[#FF69B4] bg-white overflow-hidden hover:shadow-lg transition-shadow group">
      <Link href={buildProductUrl(product)} className="block">
        <div className="relative aspect-square bg-gray-100">
          <Image
            src={product.imageUrl || '/placeholder.png'}
            alt={product.name}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.category && (
            <span className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              {product.category}
            </span>
          )}
        </div>
      </Link>
      <div className="p-4 bg-[#FF69B4] text-white">
        <Link href={buildProductUrl(product)}>
          <div className="flex justify-between items-start gap-2 mb-3">
            <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
            <span className="font-bold text-lg whitespace-nowrap">{formatPrice(product.price)}</span>
          </div>
        </Link>
        <button
          onClick={handleAddToCart}
          className={`w-full py-2 text-sm font-semibold transition-all ${
            added
              ? 'bg-green-500 text-white'
              : 'bg-white text-[#FF69B4] hover:bg-[#F2C94C] hover:text-black'
          }`}
        >
          {added ? '✓ Agregado' : 'Añadir al carrito'}
        </button>
      </div>
    </div>
  );
}
