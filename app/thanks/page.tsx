import Link from 'next/link';

interface ThanksPageProps {
  searchParams: Promise<{ status?: string; payment_id?: string; external_reference?: string }>;
}

export default async function ThanksPage({ searchParams }: ThanksPageProps) {
  const params = await searchParams;
  const rawStatus = params.status;
  const paymentId = params.payment_id;

  // MercadoPago can return "null" as a string, or omit status entirely on back-navigation.
  // Normalise to avoid false positives.
  const status = rawStatus === 'null' || rawStatus === 'undefined' ? undefined : rawStatus;

  const isRejected = status === 'rejected' || status === 'failure' || status === 'cancelled';
  const isPending = status === 'pending' || status === 'in_process';
  const isApproved = !isRejected && !isPending; // everything else (approved, undefined, etc.)

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
      <div className="text-center max-w-md w-full">
        {isRejected ? (
          <>
            <div className="text-6xl mb-6">😔</div>
            <h1 className="text-3xl font-bold mb-4">Pago rechazado</h1>
            <p className="text-gray-600 mb-8">
              No pudimos procesar tu pago. Podés intentar nuevamente con otro medio de pago.
            </p>
          </>
        ) : isPending ? (
          <>
            <div className="text-6xl mb-6">⏳</div>
            <h1 className="text-3xl font-bold mb-4">Pago pendiente</h1>
            <p className="text-gray-600 mb-8">
              Tu pago está siendo procesado. Te enviaremos un email cuando se confirme.
            </p>
          </>
        ) : (
          <>
            <div className="text-6xl mb-6">🎉</div>
            <h1 className="text-3xl font-bold mb-4">¡Gracias por tu compra!</h1>
            <p className="text-gray-600 mb-8">
              Tu pago ha sido procesado correctamente. Recibirás un email con los detalles de tu pedido.
            </p>
          </>
        )}

        {paymentId && (
          <p className="text-xs text-gray-400 mb-6">
            N° de pago: <span className="font-mono">{paymentId}</span>
          </p>
        )}

        <div className="space-y-4">
          <Link
            href="/"
            className="block w-full bg-[#F2C94C] text-black py-3 font-semibold hover:bg-[#E0B83D] transition-colors"
          >
            Volver a la tienda
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
