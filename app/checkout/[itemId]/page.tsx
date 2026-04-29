'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { api, Product } from '@/lib/api';
import { auth } from '@/lib/auth';
import { formatPrice, buildProductUrl } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
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
  const [mpUrl, setMpUrl] = useState<string | null>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
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

  // When mpUrl is set, auto-click the link for mobile compatibility
  useEffect(() => {
    if (mpUrl && linkRef.current) {
      linkRef.current.click();
    }
  }, [mpUrl]);

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
      // Store the URL in state — the useEffect above will auto-click the <a> tag,
      // which works correctly on both desktop and mobile (avoids popup-blocker on async).
      setMpUrl(initPoint);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al procesar el pago');
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-[#F2C94C] border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-500">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (error && !product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Link href="/" className="text-[#FF69B4] hover:underline font-medium">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Breadcrumb + Back */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-black">Inicio</Link>
          <span className="mx-2">/</span>
          <Link href={buildProductUrl(product)} className="hover:text-black">{product.name}</Link>
          <span className="mx-2">/</span>
          <span className="text-black">Checkout</span>
        </nav>

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
              <p className="text-2xl font-bold text-[#FF69B4]">{formatPrice(product.price)}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 mb-6">
          <h3 className="font-semibold mb-4">Resumen del pedido</h3>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>{formatPrice(product.price)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Envío</span>
            <span className="text-green-600">Gratis</span>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>{formatPrice(product.price)}</span>
          </div>
        </div>

        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}

        {/* Hidden anchor used for mobile-compatible redirect to MercadoPago */}
        {mpUrl && (
          <a
            ref={linkRef}
            href={mpUrl}
            className="hidden"
            aria-hidden="true"
          />
        )}

        {mpUrl ? (
          // Show a visible fallback button in case auto-redirect doesn't fire
          <a
            href={mpUrl}
            className="block w-full bg-[#F2C94C] text-black py-4 font-semibold text-lg text-center hover:bg-[#E0B83D] transition-colors"
          >
            Ir a MercadoPago →
          </a>
        ) : (
          <button
            onClick={handleCheckout}
            disabled={processing}
            className="w-full bg-[#F2C94C] text-black py-4 font-semibold text-lg hover:bg-[#E0B83D] transition-colors disabled:opacity-50"
          >
            {processing ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin h-5 w-5 border-2 border-black border-t-transparent rounded-full"></span>
                Procesando...
              </span>
            ) : (
              'Pagar con MercadoPago'
            )}
          </button>
        )}

        <div className="text-center mt-4 space-y-2">
          {mpUrl ? (
            <p className="text-sm text-green-600 font-medium">
              ✓ Orden creada. Si no fuiste redirigido automáticamente, tocá el botón de arriba.
            </p>
          ) : (
            <p className="text-sm text-gray-500">
              Serás redirigido a MercadoPago para completar el pago de forma segura.
            </p>
          )}
          <Link
            href={buildProductUrl(product)}
            className="text-sm text-[#FF69B4] hover:underline"
          >
            ← Volver al producto
          </Link>
        </div>
      </div>
    </div>
  );
}
