import { api, Product } from '@/lib/api';
import { ProductCard } from '@/components/ui';
import Link from 'next/link';

const CATEGORIES = [
  { label: 'Todos', value: '' },
  { label: 'Ropa', value: 'ropa' },
  { label: 'Calzado', value: 'calzado' },
  { label: 'Accesorios', value: 'accesorios' },
  { label: 'Electrónica', value: 'electronica' },
];

interface SearchPageProps {
  searchParams: Promise<{ q?: string; offset?: string; category?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || '';
  const category = params.category || '';
  const offset = parseInt(params.offset || '0', 10);
  const limit = 9;

  let products: Product[] = [];
  let totalHits = 0;
  let error = '';

  try {
    const searchQuery = category || query;
    const result = await api.products.search(searchQuery, offset, limit);
    products = result.hits || [];
    totalHits = result.total || result.nbHits || 0;

    if (category) {
      products = products.filter(p => p.category === category);
      totalHits = products.length;
    }
  } catch (err) {
    console.error('Search error:', err);
    error = 'Error al buscar productos';
  }

  const hasMore = offset + products.length < totalHits;
  const hasPrev = offset > 0;

  const buildPaginationUrl = (newOffset: number) => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (category) params.set('category', category);
    params.set('offset', String(newOffset));
    return `/search?${params.toString()}`;
  };

  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Search Form */}
        <form action="/search" method="GET" className="mb-6">
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

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.value}
              href={cat.value ? `/search?category=${cat.value}` : '/search?q='}
              className={`px-4 py-2 text-sm font-medium border-2 transition-colors ${
                category === cat.value
                  ? 'bg-[#F2C94C] text-black border-[#F2C94C]'
                  : 'border-gray-300 text-gray-700 hover:border-[#F2C94C]'
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-sm text-gray-600 mb-6">
          {totalHits} resultados
          {query && ` de "${query}"`}
          {category && ` en ${category}`}
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
                  href={buildPaginationUrl(Math.max(0, offset - limit))}
                  className="px-6 py-2 border-2 border-black text-black hover:bg-black hover:text-white transition-colors font-medium"
                >
                  &lt; Anterior
                </Link>
              )}
              {hasMore && (
                <Link
                  href={buildPaginationUrl(offset + limit)}
                  className="px-6 py-2 bg-[#F2C94C] text-black hover:bg-[#E0B83D] transition-colors font-medium"
                >
                  Ver más &gt;
                </Link>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No se encontraron productos</p>
            <Link href="/search?q=" className="text-[#FF69B4] hover:underline font-medium">
              Ver todos los productos
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
