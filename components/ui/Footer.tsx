import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
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
              <Link href="/contacto" className="block text-gray-400 hover:text-[#F2C94C] transition-colors">
                Contacto / Publicitar
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

          {/* Medios de Pago */}
          <div>
            <h4 className="font-semibold mb-3">Medios de Pago</h4>
            <div className="flex flex-wrap gap-2 text-gray-400">
              {/* Tarjetas Generales SVG */}
              <div className="flex items-center justify-center bg-white p-1 rounded w-10 h-6" title="Visa">
                <span className="text-[#1A1F71] font-bold text-[10px] italic">VISA</span>
              </div>
              <div className="flex items-center justify-center bg-white p-1 rounded w-10 h-6" title="Mastercard">
                <div className="flex">
                  <div className="w-3 h-3 rounded-full bg-red-500 opacity-80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80 -ml-1"></div>
                </div>
              </div>
              <div className="flex items-center justify-center bg-white p-1 rounded w-10 h-6" title="American Express">
                <span className="text-blue-500 font-bold text-[8px] leading-none text-center">AMEX</span>
              </div>
            </div>
          </div>

          {/* Medios de Envío */}
          <div>
            <h4 className="font-semibold mb-3">Medios de Envío</h4>
            <div className="flex flex-col gap-3 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Correo Argentino</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#F2C94C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                <span>Rapi Moto</span>
              </div>
            </div>
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
