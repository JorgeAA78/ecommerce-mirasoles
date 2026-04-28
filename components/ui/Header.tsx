'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/auth';
import { useCart } from '@/lib/cart';

const CATEGORIES = [
  { label: 'Todos', value: '' },
  { label: 'Ropa', value: 'ropa' },
  { label: 'Calzado', value: 'calzado' },
  { label: 'Accesorios', value: 'accesorios' },
  { label: 'Electrónica', value: 'electronica' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { totalItems } = useCart();

  useEffect(() => {
    setIsAuthenticated(auth.isAuthenticated());
    setUserEmail(auth.getUserEmail());
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-[#1A1A1A] text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">🌻</span>
            <span className="font-bold text-lg">Mirasoles Market</span>
          </Link>

          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 text-black bg-white border border-gray-300 outline-none placeholder-gray-500"
            />
            <button
              type="submit"
              className="bg-[#F2C94C] text-black px-6 py-2 font-semibold hover:bg-[#E0B83D] transition-colors"
            >
              Buscar
            </button>
          </form>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Cart Icon */}
            <Link href="/cart" className="relative p-2 hover:text-[#F2C94C] transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF69B4] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <>
                <Link href="/profile" className="text-sm text-gray-300 hover:text-[#F2C94C] transition-colors">
                  {userEmail}
                </Link>
                <Link
                  href="/logout"
                  className="text-sm text-[#F2C94C] hover:underline"
                >
                  Salir
                </Link>
              </>
            ) : (
              <Link
                href="/signin"
                className="bg-[#FF69B4] text-white px-6 py-2 font-semibold hover:bg-[#E05A9E] transition-colors"
              >
                Ingresar
              </Link>
            )}
          </div>

          {/* Mobile Right */}
          <div className="flex md:hidden items-center gap-2">
            <Link href="/cart" className="relative p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF69B4] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Category Bar */}
      <div className="bg-[#2A2A2A] border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.value}
                href={cat.value ? `/search?category=${cat.value}` : '/search?q='}
                className="text-sm text-gray-300 hover:text-[#F2C94C] px-3 py-1 whitespace-nowrap transition-colors"
              >
                {cat.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#1A1A1A] border-t border-gray-700">
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 text-black bg-white border-none outline-none placeholder-gray-500"
              />
              <button
                type="submit"
                className="w-full bg-[#F2C94C] text-black py-3 font-semibold"
              >
                Buscar
              </button>
            </form>

            {/* Mobile Navigation */}
            <nav className="space-y-2">
              {!isAuthenticated && (
                <Link href="/signin" className="block py-2 hover:text-[#F2C94C]" onClick={() => setIsMenuOpen(false)}>
                  Ingresar
                </Link>
              )}
              {isAuthenticated && (
                <Link href="/profile" className="block py-2 hover:text-[#F2C94C]" onClick={() => setIsMenuOpen(false)}>
                  Mi perfil
                </Link>
              )}
              <Link href="/cart" className="block py-2 hover:text-[#F2C94C]" onClick={() => setIsMenuOpen(false)}>
                Carrito {totalItems > 0 && `(${totalItems})`}
              </Link>
              {isAuthenticated && (
                <Link href="/logout" className="block py-2 hover:text-[#F2C94C]" onClick={() => setIsMenuOpen(false)}>
                  Cerrar sesión
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
