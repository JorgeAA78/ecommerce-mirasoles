'use client';

import { useState } from 'react';
import { Product } from '@/lib/api';
import { useCart } from '@/lib/cart';

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleClick = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      {/* Selector de Cantidad */}
      <div className="flex items-center justify-between border border-gray-300 rounded px-4 py-2 sm:w-32 bg-white">
        <button 
          onClick={handleDecrease}
          className="text-2xl font-medium text-black focus:outline-none hover:text-gray-600"
          aria-label="Disminuir cantidad"
        >
          −
        </button>
        <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
        <button 
          onClick={handleIncrease}
          className="text-2xl font-medium text-black focus:outline-none hover:text-gray-600"
          aria-label="Aumentar cantidad"
        >
          +
        </button>
      </div>

      {/* Botón Agregar */}
      <button
        onClick={handleClick}
        className={`flex-1 py-4 px-8 font-bold text-sm tracking-wider uppercase rounded-full transition-all ${
          added
            ? 'bg-green-500 text-white'
            : 'bg-[#2D2D2D] text-white hover:bg-[#1a1a1a]'
        }`}
      >
        {added ? '✓ Agregado al carrito' : 'Agregar al carrito'}
      </button>
    </div>
  );
}
