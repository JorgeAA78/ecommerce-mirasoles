import Link from 'next/link';

export default function ThanksPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-3xl font-bold mb-4">¡Gracias por tu compra!</h1>
        <p className="text-gray-600 mb-8">
          Tu pago ha sido procesado correctamente. Recibirás un email con los detalles de tu pedido.
        </p>
        <div className="space-y-4">
          <Link
            href="/"
            className="block w-full bg-[#F2C94C] text-black py-3 font-semibold hover:bg-[#E0B83D] transition-colors"
          >
            Volver al inicio
          </Link>
          <Link
            href="/search?q="
            className="block w-full border-2 border-black text-black py-3 font-semibold hover:bg-gray-100 transition-colors"
          >
            Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  );
}
