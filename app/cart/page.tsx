'use client';

import { useCart } from '@/lib/cart';
import { formatPrice, buildProductUrl } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/auth';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    if (!auth.isAuthenticated()) {
      router.push('/signin');
      return;
    }
    if (items.length === 1) {
      const id = items[0].product.id || items[0].product.objectID;
      router.push(`/checkout/${id}`);
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

  return (
    <div className="py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
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

        <div className="bg-gray-50 p-6 mb-6">
          <div className="flex justify-between mb-2">
            <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} productos)</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Envío</span>
            <span className="text-green-600">Gratis</span>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          className="w-full bg-[#F2C94C] text-black py-4 font-semibold text-lg hover:bg-[#E0B83D] transition-colors"
        >
          Ir a pagar
        </button>
        <p className="text-xs text-gray-500 text-center mt-3">
          Actualmente se procesa un producto por orden vía MercadoPago.
        </p>
      </div>
    </div>
  );
}
