import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Política de Privacidad | Mirasoles Market',
  description: 'Conocé cómo Mirasoles Market protege tus datos personales y cómo los gestiona Mercado Pago como procesador de pagos.',
};

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      {/* Hero */}
      <div className="bg-gradient-to-b from-[#1A1A1A] to-[#0F0F0F] border-b border-gray-800 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-[#F2C94C] text-sm font-medium mb-2 tracking-wide uppercase">Legal</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Política de Privacidad</h1>
          <p className="text-gray-400 text-sm">Última actualización: abril de 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">

        <section className="prose-custom">
          <h2>1. Responsable del Tratamiento</h2>
          <p>
            <strong>Mirasoles Market</strong> es responsable del tratamiento de los datos personales
            que recopilamos a través del Sitio, en conformidad con la Ley N.° 25.326 de Protección
            de Datos Personales de la República Argentina y su normativa complementaria.
          </p>
        </section>

        <section className="prose-custom">
          <h2>2. Datos que Recopilamos</h2>
          <p>Recopilamos los siguientes tipos de datos:</p>
          <ul>
            <li>
              <strong>Datos de identificación:</strong> nombre, apellido, dirección de correo electrónico y contraseña cifrada.
            </li>
            <li>
              <strong>Datos de contacto:</strong> dirección de entrega y número de teléfono (cuando corresponda).
            </li>
            <li>
              <strong>Datos de uso:</strong> páginas visitadas, búsquedas realizadas, productos vistos y agregados al carrito.
            </li>
            <li>
              <strong>Datos de pago:</strong> procesados exclusivamente por Mercado Pago. Mirasoles Market <strong>no almacena</strong> datos de tarjetas de crédito/débito.
            </li>
          </ul>
        </section>

        <section className="prose-custom">
          <h2>3. Finalidad del Tratamiento</h2>
          <p>Utilizamos tus datos para:</p>
          <ul>
            <li>Gestionar tu cuenta y autenticación en el Sitio.</li>
            <li>Procesar y entregar tus pedidos.</li>
            <li>Enviarte confirmaciones de compra y novedades sobre el estado de tu pedido.</li>
            <li>Mejorar la experiencia de usuario y personalizar los contenidos del Sitio.</li>
            <li>Cumplir con obligaciones legales y prevenir fraudes.</li>
          </ul>
        </section>

        <section className="prose-custom">
          <h2>4. Pagos y Mercado Pago</h2>
          <p>
            Las transacciones económicas son procesadas por{' '}
            <a
              href="https://www.mercadopago.com.ar/privacidad"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mercado Pago
            </a>{' '}
            (Mercado Libre S.R.L.). Al efectuar un pago, tus datos financieros son tratados
            según la{' '}
            <a
              href="https://www.mercadopago.com.ar/privacidad"
              target="_blank"
              rel="noopener noreferrer"
            >
              Declaración de Privacidad de Mercado Pago
            </a>
            , que incluye:
          </p>
          <ul>
            <li>Encriptación de extremo a extremo de los datos de pago.</li>
            <li>Cumplimiento con el estándar PCI DSS (Payment Card Industry Data Security Standard).</li>
            <li>No almacenamiento de los datos de la tarjeta en los servidores de Mirasoles Market.</li>
            <li>Posible verificación de identidad adicional para proteger al usuario de fraudes.</li>
          </ul>
          <p>
            Te recomendamos leer la{' '}
            <a
              href="https://www.mercadopago.com.ar/privacidad"
              target="_blank"
              rel="noopener noreferrer"
            >
              Política de Privacidad de Mercado Pago
            </a>{' '}
            para conocer en detalle cómo gestionan tu información.
          </p>
        </section>

        <section className="prose-custom">
          <h2>5. Compartición de Datos con Terceros</h2>
          <p>
            No vendemos ni cedemos tus datos personales a terceros con fines comerciales. Sólo los
            compartimos con:
          </p>
          <ul>
            <li><strong>Mercado Pago:</strong> para procesar pagos de forma segura.</li>
            <li><strong>Empresas de logística:</strong> exclusivamente los datos necesarios para la entrega de tu pedido.</li>
            <li><strong>Autoridades competentes:</strong> cuando la ley lo exija o para proteger derechos legítimos.</li>
          </ul>
        </section>

        <section className="prose-custom">
          <h2>6. Cookies y Tecnologías de Rastreo</h2>
          <p>
            Utilizamos cookies propias y de terceros para mejorar la navegación, recordar tu sesión
            iniciada y analizar el tráfico del Sitio. Podés configurar tu navegador para rechazar
            cookies, aunque esto puede afectar el funcionamiento de algunas funcionalidades.
          </p>
        </section>

        <section className="prose-custom">
          <h2>7. Tus Derechos (ARCO)</h2>
          <p>
            En virtud de la Ley N.° 25.326, tenés derecho a:
          </p>
          <ul>
            <li><strong>Acceso:</strong> solicitar qué datos personales tuyos poseemos.</li>
            <li><strong>Rectificación:</strong> corregir datos inexactos o incompletos.</li>
            <li><strong>Cancelación:</strong> solicitar la eliminación de tus datos cuando ya no sean necesarios.</li>
            <li><strong>Oposición:</strong> oponerte al tratamiento de tus datos en determinados supuestos.</li>
          </ul>
          <p>
            Para ejercer estos derechos, podés escribirnos desde la sección de contacto del Sitio.
            El titular de los datos personales tiene la facultad de ejercer el derecho de acceso a
            los mismos en forma gratuita a intervalos no inferiores a seis meses, salvo que se
            acredite un interés legítimo al efecto conforme lo establecido en el artículo 14,
            inciso 3 de la Ley N.° 25.326. La DIRECCIÓN NACIONAL DE PROTECCIÓN DE DATOS PERSONALES,
            Órgano de Control de la Ley N.° 25.326, tiene la atribución de atender las denuncias y
            reclamos que se interpongan con relación al incumplimiento de las normas sobre protección
            de datos personales.
          </p>
        </section>

        <section className="prose-custom">
          <h2>8. Seguridad de los Datos</h2>
          <p>
            Aplicamos medidas técnicas y organizativas razonables para proteger tus datos contra
            accesos no autorizados, pérdida o divulgación. Sin embargo, ningún sistema de
            transmisión por Internet es 100% seguro, por lo que no podemos garantizar la seguridad
            absoluta de la información.
          </p>
        </section>

        <section className="prose-custom">
          <h2>9. Retención de Datos</h2>
          <p>
            Conservamos tus datos durante el tiempo necesario para cumplir las finalidades descritas
            o mientras tu cuenta esté activa, y por el tiempo adicional que exijan las obligaciones
            legales (impositivas, contables, etc.).
          </p>
        </section>

        <section className="prose-custom">
          <h2>10. Cambios en esta Política</h2>
          <p>
            Podemos actualizar esta Política periódicamente. Cuando lo hagamos, publicaremos la
            versión actualizada en esta página e indicaremos la fecha de la última modificación.
            Te recomendamos revisarla con regularidad.
          </p>
        </section>

        {/* Footer links */}
        <div className="pt-6 border-t border-gray-800 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <Link
            href="/terminos"
            className="text-[#F2C94C] hover:underline text-sm transition-colors"
          >
            Ver Términos de Uso →
          </Link>
          <a
            href="https://www.mercadopago.com.ar/privacidad"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            Política de Privacidad de Mercado Pago ↗
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
