'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { auth } from '@/lib/auth';

type Step = 'email' | 'code';

export default function SignInPage() {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.auth.sendCode(email);
      auth.setUserEmail(email);
      setStep('code');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar el código');
    } finally {
      setLoading(false);
    }
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { token } = await api.auth.verifyCode(email, code);
      auth.setToken(token);
      
      // Verificar si el usuario tiene perfil completo
      const user = await api.user.getMe(token);
      if (!user.name) {
        // Usuario nuevo - redirigir a completar perfil
        router.push('/profile?new=true');
      } else {
        // Usuario existente - redirigir al inicio
        router.push('/');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Código inválido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8">Ingresar</h1>

        {step === 'email' ? (
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-[#F2C94C]"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#F2C94C] text-black py-3 font-semibold hover:bg-[#E0B83D] transition-colors disabled:opacity-50"
            >
              {loading ? 'Enviando...' : 'Continuar'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleCodeSubmit} className="space-y-6">
            <div>
              <label htmlFor="code" className="block text-sm font-medium mb-2">
                Código
              </label>
              <input
                type="text"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="123456"
                required
                maxLength={6}
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-[#F2C94C] text-center text-2xl tracking-widest"
              />
              <p className="text-sm text-gray-500 mt-2">
                Te enviamos un código a tu mail
              </p>
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#F2C94C] text-black py-3 font-semibold hover:bg-[#E0B83D] transition-colors disabled:opacity-50"
            >
              {loading ? 'Verificando...' : 'Ingresar'}
            </button>

            <button
              type="button"
              onClick={() => {
                setStep('email');
                setCode('');
                setError('');
              }}
              className="w-full text-gray-500 hover:text-black transition-colors"
            >
              Volver
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
