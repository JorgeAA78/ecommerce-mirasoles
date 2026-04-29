'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cart';
import { formatPrice, buildProductUrl } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/auth';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart();
  const [shippingOption, setShippingOption] = useState<'pickup' | 'delivery'>('pickup');
  const [zipCode, setZipCode] = useState('');
  const router = useRouter();

  const handleCheckout = () => {
    if (!auth.isAuthenticated()) {
      router.push('/signin');
      return;
    }
    if (items.length > 0) {
      const id = items[0].product.id || items[0].product.objectID;
      router.push(`/checkout/${id}?shipping=${shippingOption}`);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">🛒</div>
          <h1 className="text-2xl font-bold mb-4">Tu carrito está vacío</h1>
          <p className="text-gray-600 mb-8">Agregá productos para empezar a comprar.</p>
          <Link
            href="/search?q="
            className="inline-block bg-[#F2C94C] text-black py-3 px-8 font-semibold hover:bg-[#E0B83D] transition-colors"
          >
            Ver productos
          </Link>
        </div>
      </div>
    );
  }

  const shippingCost = shippingOption === 'delivery' ? 3500 : 0;
  const finalTotal = totalPrice + shippingCost;

  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Cart Items */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">Tu carrito</h1>
            <button
              onClick={clearCart}
              className="text-sm text-gray-500 hover:text-red-500 transition-colors"
            >
              Vaciar carrito
            </button>
          </div>

          <div className="space-y-4 mb-8">
            {items.map(({ product, quantity }) => {
              const productId = product.id || product.objectID || '';
              return (
                <div key={productId} className="flex gap-4 bg-white border border-gray-200 p-4">
                  <Link href={buildProductUrl(product)} className="w-24 h-24 bg-gray-100 relative flex-shrink-0">
                    <Image
                      src={product.imageUrl || '/placeholder.png'}
                      alt={product.name}
                      fill
                      className="object-contain p-2"
                      sizes="96px"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={buildProductUrl(product)} className="font-semibold text-sm line-clamp-2 hover:underline">
                      {product.name}
                    </Link>
                    <p className="text-lg font-bold mt-1">{formatPrice(product.price)}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => updateQuantity(productId, quantity - 1)}
                        className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      >
                        −
                      </button>
                      <span className="font-medium">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(productId, quantity + 1)}
                        disabled={quantity >= product.stock}
                        className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(productId)}
                        className="ml-auto text-sm text-red-500 hover:underline"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Summary & Shipping */}
        <div className="w-full md:w-96 flex-shrink-0">
          <div className="bg-gray-50 p-6 border border-gray-200">
            <h3 className="font-bold text-lg mb-4">Resumen de compra</h3>
            
            <div className="flex justify-between mb-4 text-sm text-gray-600">
              <span>Subtotal (sin envío)</span>
              <span className="font-medium text-black">{formatPrice(totalPrice)}</span>
            </div>

            {/* Calculadora de CP */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Código Postal</label>
              <div className="flex">
                <input 
                  type="text" 
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="Tu código postal" 
                  className="flex-1 border border-gray-300 rounded-l px-3 py-2 text-sm focus:outline-none focus:border-black"
                />
                <button className="bg-white text-black font-bold text-sm tracking-wider uppercase border border-l-0 border-gray-300 rounded-r px-4 py-2 hover:bg-gray-100">
                  Calcular
                </button>
              </div>
            </div>

            {/* Opciones de Envío */}
            <div className="mb-6 space-y-3">
              <label className="block text-sm font-medium mb-2">Opciones de entrega</label>
              
              <label className="flex items-start gap-3 cursor-pointer p-3 border border-gray-200 rounded hover:border-black transition-colors bg-white">
                <input 
                  type="radio" 
                  name="shipping" 
                  value="pickup" 
                  checked={shippingOption === 'pickup'}
                  onChange={() => setShippingOption('pickup')}
                  className="mt-1"
                />
                <div>
                  <p className="font-medium text-sm">Retiro desde local</p>
                  <p className="text-xs text-green-600 font-bold mt-1">Gratis</p>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer p-3 border border-gray-200 rounded hover:border-black transition-colors bg-white">
                <input 
                  type="radio" 
                  name="shipping" 
                  value="delivery" 
                  checked={shippingOption === 'delivery'}
                  onChange={() => setShippingOption('delivery')}
                  className="mt-1"
                />
                <div>
                  <p className="font-medium text-sm">Envío a domicilio</p>
                  <p className="text-xs text-gray-600 mt-1">{formatPrice(3500)}</p>
                </div>
              </label>
            </div>

            <hr className="my-4 border-gray-200" />
            
            <div className="flex justify-between font-bold text-xl mb-6">
              <span>Total</span>
              <span>{formatPrice(finalTotal)}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-[#F2C94C] text-black py-4 font-bold text-sm uppercase tracking-wider hover:bg-[#E0B83D] transition-colors"
            >
              Ir a pagar
            </button>
            <p className="text-xs text-gray-500 text-center mt-3">
              Actualmente se procesa un producto por orden vía MercadoPago.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
