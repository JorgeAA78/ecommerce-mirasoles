'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { api, User } from '@/lib/api';
import { auth } from '@/lib/auth';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    name: '',
    street: '',
    city: '',
    phone: '',
  });

  useEffect(() => {
    const token = auth.getToken();
    if (!token) {
      router.push('/signin');
      return;
    }

    // Detectar si es usuario nuevo
    if (searchParams.get('new') === 'true') {
      setIsNewUser(true);
    }

    const fetchUser = async () => {
      try {
        const userData = await api.user.getMe(token);
        setUser(userData);
        setFormData({
          name: userData.name || '',
          street: userData.address?.street || '',
          city: userData.address?.city || '',
          phone: userData.phone || '',
        });
      } catch (err) {
        console.error('Error fetching user:', err);
        auth.removeToken();
        router.push('/signin');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);

    const token = auth.getToken();
    if (!token) {
      router.push('/signin');
      return;
    }

    try {
      await api.user.updateMe(token, {
        name: formData.name,
        phone: formData.phone,
      });

      if (formData.street && formData.city) {
        await api.user.updateAddress(token, {
          street: formData.street,
          city: formData.city,
        });
      }

      setSuccess('Perfil actualizado correctamente');
      
      // Si es usuario nuevo, redirigir al inicio después de guardar
      if (isNewUser) {
        setTimeout(() => router.push('/'), 1500);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 
        (typeof err === 'object' && err !== null && 'message' in err) ? String((err as {message: unknown}).message) : 
        'Error al guardar';
      setError(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] py-12 px-4">
      <div className="max-w-md mx-auto">
        {isNewUser && (
          <div className="bg-[#F2C94C] text-black p-4 mb-6">
            <p className="font-semibold">¡Bienvenido a Mirasoles Market!</p>
            <p className="text-sm">Completá tu perfil para continuar.</p>
          </div>
        )}
        
        <h1 className="text-3xl font-bold mb-8">
          {isNewUser ? 'Completá tu perfil' : 'Perfil'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Nombre Completo
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-[#F2C94C]"
            />
          </div>

          <div>
            <label htmlFor="street" className="block text-sm font-medium mb-2">
              Dirección
            </label>
            <input
              type="text"
              id="street"
              value={formData.street}
              onChange={(e) => setFormData({ ...formData, street: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-[#F2C94C]"
            />
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium mb-2">
              Ciudad
            </label>
            <input
              type="text"
              id="city"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-[#F2C94C]"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">
              Teléfono
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-[#F2C94C]"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          {success && (
            <p className="text-green-600 text-sm">{success}</p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-[#F2C94C] text-black py-3 font-semibold hover:bg-[#E0B83D] transition-colors disabled:opacity-50"
          >
            {saving ? 'Guardando...' : 'Guardar'}
          </button>
        </form>
      </div>
    </div>
  );
}
