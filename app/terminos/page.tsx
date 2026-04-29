import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Términos de Uso | Mirasoles Market',
  description: 'Conocé los términos y condiciones de uso de Mirasoles Market y las condiciones del procesador de pagos Mercado Pago.',
};

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      {/* Hero */}
      <div className="bg-gradient-to-b from-[#1A1A1A] to-[#0F0F0F] border-b border-gray-800 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-[#F2C94C] text-sm font-medium mb-2 tracking-wide uppercase">Legal</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Términos de Uso</h1>
          <p className="text-gray-400 text-sm">Última actualización: abril de 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">

        <section className="prose-custom">
          <h2>1. Aceptación de los Términos</h2>
          <p>
            Al ingresar, registrarte o realizar una compra en <strong>Mirasoles Market</strong>
            (&quot;el Sitio&quot;), aceptás en forma irrevocable los presentes Términos de Uso. Si no
            estás de acuerdo con alguna de estas condiciones, te pedimos que te abstengas de
            utilizar el Sitio.
          </p>
        </section>

        <section className="prose-custom">
          <h2>2. Uso del Sitio</h2>
          <p>
            Mirasoles Market es una plataforma de comercio electrónico orientada a potenciar los
            comercios del barrio. El uso del Sitio está destinado exclusivamente a personas mayores
            de 18 años o menores con supervisión de un adulto responsable.
          </p>
          <ul>
            <li>Queda prohibido el uso del Sitio para actividades ilícitas, fraudulentas o que violen derechos de terceros.</li>
            <li>No podrás compartir ni reutilizar las credenciales de acceso de tu cuenta.</li>
            <li>El contenido del Sitio (imágenes, textos, marcas) es propiedad de sus respectivos titulares.</li>
          </ul>
        </section>

        <section className="prose-custom">
          <h2>3. Registro y Cuenta de Usuario</h2>
          <p>
            Para acceder a ciertas funcionalidades como el carrito de compras y el historial de
            pedidos, debés crear una cuenta. Sos responsable de mantener la confidencialidad de tu
            contraseña y de todas las actividades que ocurran bajo tu cuenta.
          </p>
          <p>
            Nos reservamos el derecho de suspender o eliminar cuentas que violen estos Términos.
          </p>
        </section>

        <section className="prose-custom">
          <h2>4. Compras y Pagos — Mercado Pago</h2>
          <p>
            Los pagos en Mirasoles Market son procesados de forma segura a través de{' '}
            <a
              href="https://www.mercadopago.com.ar/ayuda/terminos-y-condiciones-uso_193"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mercado Pago
            </a>
            , un servicio de Mercado Libre S.R.L. Al realizar una compra, aceptás también los{' '}
            <a
              href="https://www.mercadopago.com.ar/ayuda/terminos-y-condiciones-uso_193"
              target="_blank"
              rel="noopener noreferrer"
            >
              Términos y Condiciones de Mercado Pago
            </a>
            .
          </p>
          <ul>
            <li>Los precios publicados incluyen IVA cuando corresponda.</li>
            <li>El pago es exigible al momento de confirmar el pedido.</li>
            <li>En caso de error en el precio, te notificaremos antes de procesar el cobro.</li>
            <li>Mercado Pago puede requerir verificación adicional de identidad para aprobar transacciones.</li>
          </ul>
          <p>
            Para disputas relacionadas con pagos, podés comunicarte directamente con el{' '}
            <a
              href="https://www.mercadopago.com.ar/ayuda"
              target="_blank"
              rel="noopener noreferrer"
            >
              Centro de Ayuda de Mercado Pago
            </a>
            .
          </p>
        </section>

        <section className="prose-custom">
          <h2>5. Envíos y Entregas</h2>
          <p>
            Los tiempos y costos de envío se informan al momento del checkout. Mirasoles Market no
            se hace responsable por demoras ocasionadas por causas ajenas a su control (fuerza
            mayor, huelgas, fenómenos climáticos, etc.).
          </p>
        </section>

        <section className="prose-custom">
          <h2>6. Devoluciones y Arrepentimiento</h2>
          <p>
            Conforme a la Ley de Defensa del Consumidor N.° 24.240 (Argentina), tenés derecho a
            arrepentirte de la compra dentro de los <strong>10 días hábiles</strong> desde la
            recepción del producto, sin necesidad de expresar causa ni abonar penalidad alguna.
            Para iniciar el proceso, contactanos a través de nuestro correo de soporte.
          </p>
        </section>

        <section className="prose-custom">
          <h2>7. Limitación de Responsabilidad</h2>
          <p>
            Mirasoles Market no garantiza la disponibilidad ininterrumpida del Sitio ni se
            responsabiliza por daños directos o indirectos derivados del uso o la imposibilidad de
            uso de la plataforma, más allá de lo que establezca la legislación aplicable.
          </p>
        </section>

        <section className="prose-custom">
          <h2>8. Modificaciones</h2>
          <p>
            Nos reservamos el derecho de modificar estos Términos en cualquier momento. Los
            cambios entrarán en vigencia desde su publicación en el Sitio. El uso continuado del
            Sitio implica la aceptación de los Términos actualizados.
          </p>
        </section>

        <section className="prose-custom">
          <h2>9. Ley Aplicable y Jurisdicción</h2>
          <p>
            Estos Términos se rigen por las leyes de la República Argentina. Cualquier controversia
            será sometida a los tribunales competentes de la Ciudad Autónoma de Buenos Aires, con
            renuncia a cualquier otro fuero o jurisdicción.
          </p>
        </section>

        {/* Footer link */}
        <div className="pt-6 border-t border-gray-800 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <Link
            href="/privacidad"
            className="text-[#F2C94C] hover:underline text-sm transition-colors"
          >
            Ver Política de Privacidad →
          </Link>
          <a
            href="https://www.mercadopago.com.ar/ayuda/terminos-y-condiciones-uso_193"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            Términos y Condiciones de Mercado Pago ↗
          </a>
        </div>
      </div>

      <style>{`
        .prose-custom h2 {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          color: #F2C94C;
        }
        .prose-custom p {
          color: #9ca3af;
          line-height: 1.75;
          margin-bottom: 0.75rem;
        }
        .prose-custom ul {
          list-style: disc;
          padding-left: 1.5rem;
          color: #9ca3af;
          space-y: 0.5rem;
          line-height: 1.75;
          margin-bottom: 0.75rem;
        }
        .prose-custom a {
          color: #F2C94C;
          text-decoration: underline;
        }
        .prose-custom a:hover {
          color: #fff;
        }
      `}</style>
    </div>
  );
}
