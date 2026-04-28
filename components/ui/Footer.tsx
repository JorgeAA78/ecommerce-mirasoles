import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🌻</span>
              <span className="font-bold text-lg">Mirasoles Market</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Potenciamos los comercios del barrio conectándolos con sus vecinos a través de la tecnología.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-semibold mb-3">Navegación</h4>
            <nav className="space-y-2 text-sm">
              <Link href="/" className="block text-gray-400 hover:text-[#F2C94C] transition-colors">
                Inicio
              </Link>
              <Link href="/search?q=" className="block text-gray-400 hover:text-[#F2C94C] transition-colors">
                Productos
              </Link>
              <Link href="/cart" className="block text-gray-400 hover:text-[#F2C94C] transition-colors">
                Carrito
              </Link>
              <Link href="/profile" className="block text-gray-400 hover:text-[#F2C94C] transition-colors">
                Mi perfil
              </Link>
            </nav>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-3">Categorías</h4>
            <nav className="space-y-2 text-sm">
              <Link href="/search?category=ropa" className="block text-gray-400 hover:text-[#F2C94C] transition-colors">
                Ropa
              </Link>
              <Link href="/search?category=calzado" className="block text-gray-400 hover:text-[#F2C94C] transition-colors">
                Calzado
              </Link>
              <Link href="/search?category=accesorios" className="block text-gray-400 hover:text-[#F2C94C] transition-colors">
                Accesorios
              </Link>
              <Link href="/search?category=electronica" className="block text-gray-400 hover:text-[#F2C94C] transition-colors">
                Electrónica
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center">
          <p className="text-sm text-gray-500">© 2026 Mirasoles Market. Hecho con 🌻 para el barrio.</p>
        </div>
      </div>
    </footer>
  );
}
