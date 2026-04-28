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
          <span className="text-5xl md:text-6xl mb-4 block">🌻</span>
          <h1 className="text-3xl md:text-5xl font-bold text-black mb-4">
            Mirasoles Market
          </h1>
          <p className="text-lg md:text-xl text-black/80 mb-8 max-w-lg mx-auto">
            El marketplace de tu barrio. Encontrá todo lo que necesitás de los comercios locales.
          </p>
          <form action="/search" method="GET" className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                name="q"
                placeholder="¿Qué estás buscando?"
                className="flex-1 px-4 py-3 border-2 border-black focus:outline-none bg-white placeholder-gray-500"
              />
              <button
                type="submit"
                className="bg-black text-white px-8 py-3 font-semibold hover:bg-gray-800 transition-colors"
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
                className="inline-block bg-black text-white px-8 py-3 font-semibold hover:bg-gray-800 transition-colors"
              >
                Ver todos los productos
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Quiénes Somos Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Quiénes Somos</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            <strong>Mirasoles Market</strong> nació con una misión clara: potenciar los comercios del barrio 
            conectándolos con sus vecinos a través de la tecnología. Creemos que los negocios locales son el 
            corazón de nuestra comunidad, y merecen las mismas herramientas que las grandes tiendas.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            Desde almacenes y panaderías hasta ferreterías y barberías, nuestra plataforma reúne 
            lo mejor del barrio en un solo lugar. Comprá fácil, recibí rápido, y apoyá a tu vecino.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            <div className="p-6">
              <div className="text-4xl mb-3">🏪</div>
              <h3 className="font-bold mb-2">Comercios locales</h3>
              <p className="text-sm text-gray-600">Comprá directo de los negocios de tu barrio.</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="font-bold mb-2">Entrega rápida</h3>
              <p className="text-sm text-gray-600">Cerca tuyo, todo llega más rápido.</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-3">🤝</div>
              <h3 className="font-bold mb-2">Comunidad</h3>
              <p className="text-sm text-gray-600">Cada compra fortalece a tu barrio.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

