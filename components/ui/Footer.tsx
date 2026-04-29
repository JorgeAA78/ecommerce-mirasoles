import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <nav className="space-y-2 text-sm">
              <Link href="/terminos" className="block text-gray-400 hover:text-[#F2C94C] transition-colors">
                Términos de Uso
              </Link>
              <Link href="/privacidad" className="block text-gray-400 hover:text-[#F2C94C] transition-colors">
                Política de Privacidad
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-500">© 2026 Mirasoles Market. Hecho con ❤️ para el barrio.</p>
          {/* Mercado Pago logo */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">Pagos procesados por</span>
            <a
              href="https://www.mercadopago.com.ar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center opacity-70 hover:opacity-100 transition-opacity"
              aria-label="Mercado Pago"
            >
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/9/98/Mercado_Pago.svg"
                alt="Mercado Pago"
                width={120}
                height={30}
                className="h-7 w-auto object-contain"
                unoptimized
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
