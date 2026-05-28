'use client';

import Link from 'next/link';

export default function HomePromoBanner() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="relative w-full h-[460px] md:h-[490px] bg-[#bbb8b9] overflow-hidden rounded-sm border border-black/5 shadow-sm flex italic font-black">
        
        {/* IMAGEN DE FONDO / DERECHA */}
        <div className="absolute inset-y-0 right-0 w-full md:w-1/2 h-full z-0 select-none pointer-events-none">
          <img 
            src="/banner_model.png" 
            alt="Sirius Imbatibles Campaign" 
            className="w-full h-full object-cover object-top grayscale md:grayscale-0 md:group-hover:grayscale-0 transition-all duration-[1.5s] ease-in-out scale-100 hover:scale-103"
          />
          {/* Degradado oscuro en móvil para legibilidad de textos */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent md:hidden z-10" />
          {/* Sutil fundido lateral en desktop para empalme perfecto de color */}
          <div className="hidden md:block absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#bbb8b9] to-transparent z-10" />
        </div>

        {/* CONTENEDOR DE TEXTOS (LADO IZQUIERDO) */}
        <div className="relative w-full md:w-1/2 h-full p-8 md:p-16 flex flex-col justify-between z-20">
          
          <div className="space-y-1">
            <span className="text-[8px] md:text-[9px] uppercase tracking-[0.5em] text-zinc-100 md:text-white/60 font-sans not-italic font-bold block mb-4">
              Campaña Especial // Sirius Studio
            </span>
            
            <h2 className="text-5xl md:text-7.5xl tracking-tighter uppercase leading-[0.8] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.15)] md:drop-shadow-none">
              IMBATIBLES
            </h2>
            
            <p className="text-[10px] md:text-[12px] uppercase tracking-[0.4em] text-zinc-100 md:text-white/80 mt-4 leading-none">
              Desde
            </p>
            
            <p className="text-6xl md:text-[6.5rem] font-mono leading-none tracking-tighter text-white drop-shadow-[0_4px_15px_rgba(0,0,0,0.2)] md:drop-shadow-none mt-1">
              $25.990
            </p>
            
            <p className="text-[9px] md:text-[10px] text-zinc-100 md:text-white/90 uppercase tracking-widest leading-relaxed pt-4 max-w-xs font-sans not-italic font-bold">
              Nuestra selección de prendas, infaltables de la temporada, al mejor precio.
            </p>
          </div>

          {/* BOTÓN / BADGE ROJO DE INTERACCIÓN */}
          <div className="pt-6">
            <Link 
              href="/tienda" 
              className="bg-red-600 hover:bg-red-700 text-white text-[10px] uppercase font-black tracking-widest px-8 py-3.5 italic rounded-full inline-block shadow-md hover:scale-105 active:scale-[0.98] transition duration-300"
            >
              Más elegidos
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
