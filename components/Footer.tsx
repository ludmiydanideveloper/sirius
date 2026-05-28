import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-zinc-50 border-t border-black/5 text-zinc-900 py-20 px-6 font-sans italic font-black selection:bg-black selection:text-white transition-all duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 items-start">
        
        {/* COLUMNA 1: LOGO & CONCEPTO */}
        <div className="space-y-4">
          <Link href="/" className="text-3xl font-black italic tracking-tighter text-black uppercase leading-none block">
            SIRIUS
          </Link>
          <p className="text-[10px] text-zinc-400 font-sans not-italic font-bold uppercase tracking-wider leading-relaxed">
            INDUMENTARIA URBANA PREMIUM DESARROLLADA Y CONFECCIONADA CON ATENCIÓN EXTREMA AL DETALLE DESDE BARADERO, BUENOS AIRES AL MUNDO.
          </p>
        </div>

        {/* COLUMNA 2: NAVEGACIÓN COMPRA */}
        <div className="space-y-4">
          <h4 className="text-[10px] uppercase tracking-widest text-zinc-400 font-black italic">Tienda</h4>
          <div className="flex flex-col gap-2.5 text-xs">
            <Link href="/tienda" className="hover:text-zinc-600 transition">TIENDA ONLINE</Link>
            <Link href="/drops" className="hover:text-zinc-600 transition">LOOKBOOK DE CAMPAÑA</Link>
            <Link href="/cart" className="hover:text-zinc-600 transition">CARRITO DE COMPRAS</Link>
            <Link href="/admin" className="text-[7px] text-zinc-300 hover:text-zinc-500 transition uppercase tracking-widest">
              [ ACCESO_SISTEMA_ENCRIPTADO ]
            </Link>
          </div>
        </div>

        {/* COLUMNA 3: REDES SOCIALES */}
        <div className="space-y-4">
          <h4 className="text-[10px] uppercase tracking-widest text-zinc-400 font-black italic">Redes Sociales</h4>
          <div className="flex flex-col gap-2.5 text-xs not-italic font-sans text-zinc-700">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 hover:text-black transition uppercase font-black italic text-xs tracking-wider"
            >
              📸 Instagram
            </a>
            <a 
              href="https://tiktok.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 hover:text-black transition uppercase font-black italic text-xs tracking-wider"
            >
              🎵 TikTok
            </a>
            <a 
              href="https://wa.me/5493329606115" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 hover:text-black transition uppercase font-black italic text-xs tracking-wider"
            >
              💬 WhatsApp Soporte
            </a>
          </div>
        </div>

        {/* COLUMNA 4: ATRIBUTOS DE ARCHIVO */}
        <div className="space-y-4">
          <h4 className="text-[10px] uppercase tracking-widest text-zinc-400 font-black italic">Información Técnica</h4>
          <div className="space-y-2 text-[9px] uppercase font-sans not-italic font-bold text-zinc-400 leading-normal">
            <p>• ALGODÓN PEINADO PREMIUM DE 240G</p>
            <p>• FRISA INVISIBLE HEAVY DE 400G</p>
            <p>• ENVIOS NACIONALES GRATIS EN BARADERO</p>
            <p>• 30 DÍAS PARA CAMBIOS DE PRENDAS</p>
          </div>
        </div>

      </div>

      {/* FOOTER BOTTOM */}
      <div className="max-w-7xl mx-auto border-t border-black/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[8px] tracking-widest text-zinc-400 font-sans not-italic font-bold">
        <p>SIRIUS OFFICIAL ONLINE SHOP &copy; 2026. TODOS LOS DERECHOS RESERVADOS.</p>
        <p>CONFECCIÓN ÉTICA // HECHO EN BARADERO, BUENOS AIRES.</p>
      </div>
    </footer>
  );
}
