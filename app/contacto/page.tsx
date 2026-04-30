'use client';

import { useState } from 'react';

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ nombre: '', email: '', telefono: '', mensaje: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-[80vh] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contacto</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            ¿Te interesa sumarte para publicitar tu comercio o producto? Completá el formulario o contactanos por nuestros canales directos.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Contact Info */}
            <div className="bg-[#1A1A1A] p-10 text-white flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-[#F2C94C]">Información de Contacto</h3>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  Estamos para ayudarte a potenciar tu negocio en el barrio. Escribinos para conocer los planes de publicidad y exposición en Mirasoles Market.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                        <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.148.563 4.167 1.543 5.924L.198 24l6.22-1.332A11.968 11.968 0 0012.031 24c6.646 0 12.031-5.385 12.031-12.031S18.677 0 12.031 0zm0 22.015c-1.802 0-3.528-.46-5.074-1.328l-.364-.214-3.774.808.825-3.666-.234-.374A9.97 9.97 0 012.016 12.03c0-5.541 4.505-10.046 10.046-10.046s10.046 4.505 10.046 10.046-4.505 10.046-10.046 10.046zm5.503-7.514c-.302-.151-1.785-.88-2.062-.981-.277-.101-.478-.151-.68.151-.202.302-.78 1.006-.957 1.208-.176.202-.353.227-.655.076-.302-.151-1.274-.47-2.427-1.496-.897-.8-1.503-1.788-1.68-2.09-.176-.302-.019-.465.132-.616.136-.136.302-.352.453-.529.151-.176.202-.302.302-.503.101-.202.05-.378-.025-.529-.076-.151-.68-1.636-.931-2.242-.244-.593-.494-.513-.68-.522-.176-.008-.378-.008-.58-.008-.202 0-.529.076-.806.378-.277.302-1.057 1.031-1.057 2.515 0 1.484 1.082 2.918 1.233 3.119.151.202 2.127 3.245 5.152 4.549.719.31 1.28.495 1.716.634.721.229 1.378.196 1.897.119.58-.087 1.785-.729 2.036-1.433.251-.704.251-1.308.176-1.433-.075-.125-.276-.201-.578-.352z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">WhatsApp</p>
                      <a href="https://wa.me/5491161966833" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold hover:text-[#F2C94C] transition-colors">
                        11 6196-6833
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                        <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                        <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <a href="mailto:infosoporte25@gmail.com" className="text-lg font-semibold hover:text-[#F2C94C] transition-colors">
                        infosoporte25@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Envianos tu consulta</h3>
              
              {submitted ? (
                <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-6 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-lg font-medium">¡Mensaje enviado con éxito!</p>
                  <p className="mt-2 text-green-600">Nos pondremos en contacto con vos a la brevedad.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre y Apellido
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      required
                      value={formData.nombre}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F2C94C] focus:border-transparent outline-none transition-all"
                      placeholder="Juan Pérez"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F2C94C] focus:border-transparent outline-none transition-all"
                        placeholder="tu@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        required
                        value={formData.telefono}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F2C94C] focus:border-transparent outline-none transition-all"
                        placeholder="11 1234-5678"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-2">
                      Mensaje
                    </label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      rows={4}
                      required
                      value={formData.mensaje}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F2C94C] focus:border-transparent outline-none transition-all resize-none"
                      placeholder="Contanos sobre tu negocio..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#1A1A1A] hover:bg-[#F2C94C] hover:text-black text-white font-bold py-4 rounded-lg transition-colors duration-300"
                  >
                    Enviar Mensaje
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
