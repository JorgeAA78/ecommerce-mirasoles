'use client';

import { useState, useEffect, useRef, use, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { api, Product } from '@/lib/api';
import { auth } from '@/lib/auth';
import { formatPrice, buildProductUrl } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

function CheckoutContent({ itemId }: { itemId: string }) {
  const searchParams = useSearchParams();
  const shippingOption = searchParams.get('shipping') || 'pickup';

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [mpUrl, setMpUrl] = useState<string | null>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const router = useRouter();

  // Form states
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('Argentina');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  
  // Pickup options
  const [otherPerson, setOtherPerson] = useState(false);
  const [otherName, setOtherName] = useState('');
  const [otherDni, setOtherDni] = useState('');

  // Delivery options
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [apt, setApt] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [province, setProvince] = useState('');

  useEffect(() => {
    const token = auth.getToken();
    if (!token) {
      router.push('/signin');
      return;
    }
    
    // Pre-fill email
    const userEmail = auth.getUserEmail();
    if (userEmail) setEmail(userEmail);

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

  useEffect(() => {
    if (mpUrl && linkRef.current) {
      linkRef.current.click();
    }
  }, [mpUrl]);

  const isFormValid = () => {
    if (!email || !firstName || !lastName || !phone) return false;
    
    if (shippingOption === 'pickup') {
      if (otherPerson && (!otherName || !otherDni)) return false;
    } else {
      if (!street || !houseNumber || !neighborhood || !city || !zip || !province) return false;
    }
    return true;
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) {
      setError('Por favor completá todos los campos requeridos');
      return;
    }

    const token = auth.getToken();
    if (!token) {
      router.push('/signin');
      return;
    }

    setProcessing(true);
    setError('');

    try {
      const { initPoint } = await api.orders.create(token, itemId);
      setMpUrl(initPoint);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al procesar el pago');
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-[#F2C94C] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error && !product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Link href="/" className="text-[#FF69B4] hover:underline font-medium">Volver al inicio</Link>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const shippingCost = shippingOption === 'delivery' ? 3500 : 0;
  const finalTotal = product.price + shippingCost;

  return (
    <div className="py-8 px-4 max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
      {/* Formulario */}
      <div className="flex-1">
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-black">Inicio</Link>
          <span className="mx-2">/</span>
          <Link href="/cart" className="hover:text-black">Carrito</Link>
          <span className="mx-2">/</span>
          <span className="text-black">Checkout</span>
        </nav>

        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <form id="checkout-form" onSubmit={handleCheckout} className="space-y-8">
          
          {/* Datos de Contacto */}
          <section className="bg-white border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Datos del Contacto</h2>
            <div>
              <label className="block text-sm font-medium mb-2">Email *</label>
              <input 
                type="email" 
                required 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                className="w-full border border-gray-300 rounded px-4 py-2 focus:border-black outline-none"
              />
            </div>
          </section>

          {/* Entrega */}
          <section className="bg-white border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Entrega</h2>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded">
              <span className="font-semibold">
                {shippingOption === 'pickup' ? 'Retiro desde local' : 'Envío a domicilio'}
              </span>
              <span className="text-gray-500 ml-2">
                {shippingOption === 'pickup' ? '(Gratis)' : '($3.500)'}
              </span>
            </div>
            
            {shippingOption === 'delivery' && (
              <div className="mt-6 space-y-4">
                <h3 className="font-semibold text-lg">Dirección de envío</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium mb-1">Calle *</label>
                    <input type="text" required value={street} onChange={e => setStreet(e.target.value)} className="w-full border border-gray-300 rounded px-4 py-2" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium mb-1">Número *</label>
                    <input type="text" required value={houseNumber} onChange={e => setHouseNumber(e.target.value)} className="w-full border border-gray-300 rounded px-4 py-2" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium mb-1">Departamento (Opcional)</label>
                    <input type="text" value={apt} onChange={e => setApt(e.target.value)} className="w-full border border-gray-300 rounded px-4 py-2" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium mb-1">Barrio *</label>
                    <input type="text" required value={neighborhood} onChange={e => setNeighborhood(e.target.value)} className="w-full border border-gray-300 rounded px-4 py-2" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium mb-1">Ciudad *</label>
                    <input type="text" required value={city} onChange={e => setCity(e.target.value)} className="w-full border border-gray-300 rounded px-4 py-2" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium mb-1">Código Postal *</label>
                    <input type="text" required value={zip} onChange={e => setZip(e.target.value)} className="w-full border border-gray-300 rounded px-4 py-2" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">Provincia *</label>
                    <select required value={province} onChange={e => setProvince(e.target.value)} className="w-full border border-gray-300 rounded px-4 py-2 bg-white">
                      <option value="">Seleccionar provincia</option>
                      <option value="Buenos Aires">Buenos Aires</option>
                      <option value="CABA">Ciudad Autónoma de Buenos Aires</option>
                      <option value="Catamarca">Catamarca</option>
                      <option value="Chaco">Chaco</option>
                      <option value="Chubut">Chubut</option>
                      <option value="Córdoba">Córdoba</option>
                      <option value="Corrientes">Corrientes</option>
                      <option value="Entre Ríos">Entre Ríos</option>
                      <option value="Formosa">Formosa</option>
                      <option value="Jujuy">Jujuy</option>
                      <option value="La Pampa">La Pampa</option>
                      <option value="La Rioja">La Rioja</option>
                      <option value="Mendoza">Mendoza</option>
                      <option value="Misiones">Misiones</option>
                      <option value="Neuquén">Neuquén</option>
                      <option value="Río Negro">Río Negro</option>
                      <option value="Salta">Salta</option>
                      <option value="San Juan">San Juan</option>
                      <option value="San Luis">San Luis</option>
                      <option value="Santa Cruz">Santa Cruz</option>
                      <option value="Santa Fe">Santa Fe</option>
                      <option value="Santiago del Estero">Santiago del Estero</option>
                      <option value="Tierra del Fuego">Tierra del Fuego</option>
                      <option value="Tucumán">Tucumán</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Datos de Facturación */}
          <section className="bg-white border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Datos de Facturación</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">País *</label>
                <select required value={country} onChange={e => setCountry(e.target.value)} className="w-full border border-gray-300 rounded px-4 py-2 bg-white">
                  <option value="Argentina">Argentina</option>
                  <option value="Uruguay">Uruguay</option>
                  <option value="Chile">Chile</option>
                </select>
              </div>
              
              <h3 className="font-semibold text-lg mt-6">Persona que pagará el pedido</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium mb-1">Nombre *</label>
                  <input type="text" required value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full border border-gray-300 rounded px-4 py-2" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium mb-1">Apellido *</label>
                  <input type="text" required value={lastName} onChange={e => setLastName(e.target.value)} className="w-full border border-gray-300 rounded px-4 py-2" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Teléfono *</label>
                  <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)} className="w-full border border-gray-300 rounded px-4 py-2" />
                </div>
              </div>
            </div>

            {shippingOption === 'pickup' && (
              <div className="mt-6 border-t border-gray-200 pt-4">
                <label className="flex items-center gap-2 cursor-pointer mb-4">
                  <input 
                    type="checkbox" 
                    checked={otherPerson} 
                    onChange={e => setOtherPerson(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="font-medium text-sm">Otra persona retira el pedido</span>
                </label>

                {otherPerson && (
                  <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 border border-gray-200 rounded">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-medium mb-1">Nombre y Apellido *</label>
                      <input type="text" required value={otherName} onChange={e => setOtherName(e.target.value)} className="w-full border border-gray-300 rounded px-4 py-2" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-medium mb-1">DNI *</label>
                      <input type="text" required value={otherDni} onChange={e => setOtherDni(e.target.value)} className="w-full border border-gray-300 rounded px-4 py-2" />
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>

        </form>
      </div>

      {/* Resumen */}
      <div className="w-full lg:w-96 flex-shrink-0">
        <div className="bg-gray-50 border border-gray-200 p-6 sticky top-6">
          <h3 className="font-bold text-lg mb-4">Resumen del pedido</h3>
          
          <div className="flex gap-4 mb-6 bg-white p-3 border border-gray-200 rounded">
            <div className="w-16 h-16 bg-gray-100 relative flex-shrink-0">
              <Image src={product.imageUrl || '/placeholder.png'} alt={product.name} fill className="object-contain p-1" sizes="64px" />
            </div>
            <div>
              <p className="font-semibold text-sm line-clamp-2">{product.name}</p>
              <p className="text-[#FF69B4] font-bold mt-1">{formatPrice(product.price)}</p>
            </div>
          </div>

          <div className="space-y-2 text-sm text-gray-600 mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(product.price)}</span>
            </div>
            <div className="flex justify-between">
              <span>Envío</span>
              <span className={shippingCost === 0 ? "text-green-600 font-medium" : ""}>
                {shippingCost === 0 ? "Gratis" : formatPrice(shippingCost)}
              </span>
            </div>
          </div>
          
          <hr className="my-4 border-gray-200" />
          
          <div className="flex justify-between font-bold text-xl mb-6">
            <span>Total</span>
            <span>{formatPrice(finalTotal)}</span>
          </div>

          {error && <p className="text-red-500 mb-4 text-sm text-center font-medium">{error}</p>}

          {/* Hidden anchor used for mobile-compatible redirect to MercadoPago */}
          {mpUrl && <a ref={linkRef} href={mpUrl} className="hidden" aria-hidden="true" />}

          {mpUrl ? (
            <a href={mpUrl} className="block w-full bg-[#F2C94C] text-black py-4 font-bold text-sm text-center uppercase hover:bg-[#E0B83D] transition-colors tracking-wider rounded">
              Ir a MercadoPago →
            </a>
          ) : (
            <button
              form="checkout-form"
              type="submit"
              disabled={processing}
              className="w-full bg-[#F2C94C] text-black py-4 font-bold text-sm tracking-wider uppercase rounded hover:bg-[#E0B83D] transition-colors disabled:opacity-50"
            >
              {processing ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin h-4 w-4 border-2 border-black border-t-transparent rounded-full"></span>
                  Procesando...
                </span>
              ) : (
                'Continuar para el pago'
              )}
            </button>
          )}

          <div className="text-center mt-4">
            <p className="text-xs text-gray-500">
              Serás redirigido a MercadoPago para completar el pago de forma segura.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface CheckoutPageProps {
  params: Promise<{ itemId: string }>;
}

export default function CheckoutPage({ params }: CheckoutPageProps) {
  const { itemId } = use(params);
  
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><div className="animate-spin h-8 w-8 border-4 border-[#F2C94C] border-t-transparent rounded-full"></div></div>}>
      <CheckoutContent itemId={itemId} />
    </Suspense>
  );
}
