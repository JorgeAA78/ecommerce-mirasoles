import { api, Product } from '@/lib/api';
import { ProductCard } from '@/components/ui';
import Link from 'next/link';

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const result = await api.products.search('', 0, 6);
    return result.hits || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function Home() {
  const products = await getFeaturedProducts();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-[#F2C94C] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-black mb-6">
            El mejor<br />e-commerce
          </h1>
          <form action="/search" method="GET" className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                name="q"
                placeholder="Escribí lo que quieras..."
                className="flex-1 px-4 py-3 border-2 border-black focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#87CEEB] text-black px-8 py-3 font-semibold hover:bg-[#6BB8D9] transition-colors"
              >
                Buscar
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-[#87CEEB] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Productos destacados
          </h2>
          
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id || product.objectID} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">
              No hay productos disponibles en este momento.
            </p>
          )}

          {products.length > 0 && (
            <div className="text-center mt-8">
              <Link
                href="/search?q="
                className="text-black hover:underline font-medium"
              >
                ver más &gt;
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

