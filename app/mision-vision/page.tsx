export default function MisionVisionPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 min-h-[60vh]">
      <h1 className="text-4xl font-bold mb-8">Misión y Visión</h1>
      
      <div className="grid md:grid-cols-2 gap-12 mt-8">
        <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
          <div className="text-4xl mb-4">🚀</div>
          <h2 className="text-2xl font-bold mb-4">Nuestra Misión</h2>
          <p className="text-gray-700 leading-relaxed">
            Nuestra misión es democratizar el comercio electrónico para los negocios locales, ofreciendo una plataforma tecnológica accesible y fácil de usar que les permita expandir su alcance, aumentar sus ventas y fortalecer el vínculo con la comunidad de vecinos.
          </p>
        </div>

        <div className="bg-[#2A2A2A] text-white p-8 rounded-lg">
          <div className="text-4xl mb-4">👁️</div>
          <h2 className="text-2xl font-bold mb-4 text-[#F2C94C]">Nuestra Visión</h2>
          <p className="text-gray-300 leading-relaxed">
            Aspiramos a ser la principal plataforma de comercio barrial a nivel nacional, creando una red sólida donde la tecnología sea el puente que una a compradores y vendedores de forma justa, transparente y sostenible.
          </p>
        </div>
      </div>
    </div>
  );
}
