'use client';

import { useState, useEffect, useRef } from 'react';
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
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendSuccess, setResendSuccess] = useState(false);
  const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const router = useRouter();

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (cooldownRef.current) clearInterval(cooldownRef.current);
    };
  }, []);

  const startCooldown = (seconds = 60) => {
    setResendCooldown(seconds);
    if (cooldownRef.current) clearInterval(cooldownRef.current);
    cooldownRef.current = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(cooldownRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResendCode = async () => {
    if (resendCooldown > 0 || loading) return;
    setError('');
    setResendSuccess(false);
    setLoading(true);
    try {
      await api.auth.sendCode(email);
      setResendSuccess(true);
      startCooldown(60);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al reenviar el código');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.auth.sendCode(email);
      auth.setUserEmail(email);
      setStep('code');
      startCooldown(60);
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
                ✉️ Te enviamos un código a <strong>{email}</strong>. Revisá tu bandeja de entrada y también la carpeta de <strong>spam o correo no deseado</strong>.
              </p>
            </div>

            {/* Resend code */}
            <div className="text-center">
              {resendSuccess && (
                <p className="text-green-600 text-sm mb-2">✅ Código reenviado con éxito.</p>
              )}
              <button
                type="button"
                onClick={handleResendCode}
                disabled={resendCooldown > 0 || loading}
                className="text-sm text-[#F2C94C] hover:underline disabled:text-gray-400 disabled:no-underline disabled:cursor-not-allowed transition-colors"
              >
                {resendCooldown > 0
                  ? `Reenviar código (${resendCooldown}s)`
                  : '¿No recibiste el código? Reenviar'}
              </button>
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
                setResendSuccess(false);
                if (cooldownRef.current) clearInterval(cooldownRef.current);
                setResendCooldown(0);
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
