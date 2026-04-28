'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api, Product } from '@/lib/api';
import { auth } from '@/lib/auth';
import Image from 'next/image';
import { use } from 'react';

interface CheckoutPageProps {
  params: Promise<{ itemId: string }>;
}

export default function CheckoutPage({ params }: CheckoutPageProps) {
  const { itemId } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = auth.getToken();
    if (!token) {
      router.push('/signin');
      return;
    }

    const fetchProduct = async () => {
      try {
        const productData = await api.products.getById(itemId);
        setProduct(productData);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Producto no encontrado');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [itemId, router]);

  const handleCheckout = async () => {
    const token = auth.getToken();
    if (!token) {
      router.push('/signin');
      return;
    }

    setProcessing(true);
    setError('');

    try {
      const { initPoint } = await api.orders.create(token, itemId);
      window.location.href = initPoint;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al procesar el pago');
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500">Cargando...</p>
      </div>
    );
  }

  if (error && !product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="bg-white border border-gray-200 p-6 mb-6">
          <div className="flex gap-6">
            <div className="w-32 h-32 bg-gray-100 relative flex-shrink-0">
              <Image
                src={product.imageUrl || '/placeholder.png'}
                alt={product.name}
                fill
                className="object-contain p-2"
                sizes="128px"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-2xl font-bold">${product.price}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 mb-6">
          <h3 className="font-semibold mb-4">Resumen del pedido</h3>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>${product.price}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Envío</span>
            <span>Gratis</span>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${product.price}</span>
          </div>
        </div>

        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}

        <button
          onClick={handleCheckout}
          disabled={processing}
          className="w-full bg-[#F2C94C] text-black py-4 font-semibold text-lg hover:bg-[#E0B83D] transition-colors disabled:opacity-50"
        >
          {processing ? 'Procesando...' : 'Pagar con MercadoPago'}
        </button>

        <p className="text-sm text-gray-500 text-center mt-4">
          Serás redirigido a MercadoPago para completar el pago de forma segura.
        </p>
      </div>
    </div>
  );
}
