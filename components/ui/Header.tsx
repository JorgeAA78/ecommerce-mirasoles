'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/auth';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    setIsAuthenticated(auth.isAuthenticated());
    setUserEmail(auth.getUserEmail());
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="bg-[#1A1A1A] text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">🛒</span>
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

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-300">{userEmail}</span>
                <Link
                  href="/logout"
                  className="text-sm text-[#F2C94C] hover:underline"
                >
                  Cerrar sesión
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
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
                className="w-full px-4 py-3 text-black border-none outline-none"
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
              <Link
                href="/signin"
                className="block py-2 hover:text-[#F2C94C]"
                onClick={() => setIsMenuOpen(false)}
              >
                Ingresar
              </Link>
              <Link
                href="/profile"
                className="block py-2 hover:text-[#F2C94C]"
                onClick={() => setIsMenuOpen(false)}
              >
                Mi perfil
              </Link>
              <Link
                href="/search?q="
                className="block py-2 hover:text-[#F2C94C]"
                onClick={() => setIsMenuOpen(false)}
              >
                Buscar
              </Link>
              {isAuthenticated && (
                <Link
                  href="/logout"
                  className="block py-2 hover:text-[#F2C94C]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Logout
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
