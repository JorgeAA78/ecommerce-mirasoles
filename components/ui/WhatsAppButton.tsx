'use client';

export default function WhatsAppButton() {
  const phoneNumber = "1161966833";
  const message = "Hola, me gustaría obtener más información sobre Mirasoles Market.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 flex items-center justify-center"
      aria-label="Contactar por WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8"
      >
        <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.148.563 4.167 1.543 5.924L.198 24l6.22-1.332A11.968 11.968 0 0012.031 24c6.646 0 12.031-5.385 12.031-12.031S18.677 0 12.031 0zm0 22.015c-1.802 0-3.528-.46-5.074-1.328l-.364-.214-3.774.808.825-3.666-.234-.374A9.97 9.97 0 012.016 12.03c0-5.541 4.505-10.046 10.046-10.046s10.046 4.505 10.046 10.046-4.505 10.046-10.046 10.046zm5.503-7.514c-.302-.151-1.785-.88-2.062-.981-.277-.101-.478-.151-.68.151-.202.302-.78 1.006-.957 1.208-.176.202-.353.227-.655.076-.302-.151-1.274-.47-2.427-1.496-.897-.8-1.503-1.788-1.68-2.09-.176-.302-.019-.465.132-.616.136-.136.302-.352.453-.529.151-.176.202-.302.302-.503.101-.202.05-.378-.025-.529-.076-.151-.68-1.636-.931-2.242-.244-.593-.494-.513-.68-.522-.176-.008-.378-.008-.58-.008-.202 0-.529.076-.806.378-.277.302-1.057 1.031-1.057 2.515 0 1.484 1.082 2.918 1.233 3.119.151.202 2.127 3.245 5.152 4.549.719.31 1.28.495 1.716.634.721.229 1.378.196 1.897.119.58-.087 1.785-.729 2.036-1.433.251-.704.251-1.308.176-1.433-.075-.125-.276-.201-.578-.352z" />
      </svg>
    </a>
  );
}
