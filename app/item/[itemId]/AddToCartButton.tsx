'use client';

import { useState } from 'react';
import { Product } from '@/lib/api';
import { useCart } from '@/lib/cart';

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      onClick={handleClick}
      className={`py-4 px-8 font-semibold text-lg transition-all border-2 ${
        added
          ? 'bg-green-500 text-white border-green-500'
          : 'border-black text-black hover:bg-black hover:text-white'
      }`}
    >
      {added ? '✓ Agregado al carrito' : 'Añadir al carrito'}
    </button>
  );
}
