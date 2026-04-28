import { api, Product } from '@/lib/api';
import { ProductCard } from '@/components/ui';
import Link from 'next/link';

interface SearchPageProps {
  searchParams: Promise<{ q?: string; offset?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || '';
  const offset = parseInt(params.offset || '0', 10);
  const limit = 9;

  let products: Product[] = [];
  let totalHits = 0;
  let error = '';

  try {
    const result = await api.products.search(query, offset, limit);
    products = result.hits || [];
    totalHits = result.total || result.nbHits || 0;
  } catch (err) {
    console.error('Search error:', err);
    error = 'Error al buscar productos';
  }

  const hasMore = offset + products.length < totalHits;
  const hasPrev = offset > 0;

  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Search Form */}
        <form action="/search" method="GET" className="mb-8">
          <div className="flex flex-col sm:flex-row gap-2 max-w-xl">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Buscar productos..."
              className="flex-1 px-4 py-3 border border-gray-300 focus:outline-none focus:border-[#F2C94C]"
            />
            <button
              type="submit"
              className="bg-[#F2C94C] text-black px-8 py-3 font-semibold hover:bg-[#E0B83D] transition-colors"
            >
              Buscar
            </button>
          </div>
        </form>

        {/* Results Count */}
        <p className="text-sm text-gray-600 mb-6">
          {totalHits} resultados de {query ? `"${query}"` : 'todos los productos'}
        </p>

        {error ? (
          <p className="text-red-500">{error}</p>
        ) : products.length > 0 ? (
          <>
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id || product.objectID} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-4 mt-8">
              {hasPrev && (
                <Link
                  href={`/search?q=${encodeURIComponent(query)}&offset=${Math.max(0, offset - limit)}`}
                  className="text-black hover:underline"
                >
                  &lt; Anterior
                </Link>
              )}
              {hasMore && (
                <Link
                  href={`/search?q=${encodeURIComponent(query)}&offset=${offset + limit}`}
                  className="text-black hover:underline"
                >
                  ver más &gt;
                </Link>
              )}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500 py-12">
            No se encontraron productos
          </p>
        )}
      </div>
    </div>
  );
}
