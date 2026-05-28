import Link from 'next/link';

export const metadata = {
  title: 'Lookbook Drop 01 // Sirius Studio',
  description: 'Explorá la campaña editorial de nuestra primera colección de indumentaria urbana.',
};

export default function DropsPage() {
  const looks = [
    {
      id: 'look-01',
      number: 'LOOK 01 // CORE',
      title: 'SIRIUS HEAVY HOODIE',
      description: 'Hoodie de algodón de alto gramaje (400 GSM) con capucha reforzada y calce oversize. Diseñado para resistir la intemperie urbana.',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1200',
      link: '/category/hoodies',
      linkText: 'Ver Hoodies',
    },
    {
      id: 'look-02',
      number: 'LOOK 02 // LAB',
      title: 'OVERSIZED ESSENTIAL TEE',
      description: 'Remera con hombros caídos de punto grueso y tacto premium. Color negro mate absoluto con sutiles detalles bordados a tono.',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200',
      link: '/category/remeras',
      linkText: 'Ver Remeras',
    },
    {
      id: 'look-03',
      number: 'LOOK 03 // ARCHIVE',
      title: 'STREET BEANIE & DETAILS',
      description: 'Gorro tejido de lana acrílica acanalada y accesorios urbanos. Aislación térmica superior con diseño compacto y logo oculto.',
      image: 'https://images.unsplash.com/photo-1576871337622-98d48d4353d3?q=80&w=1200',
      link: '/category/accesorios',
      linkText: 'Ver Accesorios',
    },
    {
      id: 'look-04',
      number: 'LOOK 04 // EDITORIAL',
      title: 'FULL STREET FIT',
      description: 'La silueta completa de Sirius. Una declaración estética que conjuga comodidad, protección e identidad en la oscuridad.',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200',
      link: '/tienda',
      linkText: 'Ver Catálogo Completo',
    },
  ];

  return (
    <main className="bg-white text-zinc-950 min-h-screen selection:bg-black selection:text-white italic font-black transition-all duration-300">
      
      {/* NAVEGACIÓN SUPERIOR */}
      <nav className="p-6 md:px-20 border-b border-black/5 flex justify-between items-center bg-white/85 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black text-zinc-500 hover:text-black transition">
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Volver al Inicio
        </Link>
        <div className="text-[10px] font-mono text-zinc-400 tracking-tighter uppercase">
          Lookbook_Campaña // Drop_01
        </div>
      </nav>

      {/* CABECERA EDITORIAL */}
      <section className="py-24 md:py-40 px-6 max-w-7xl mx-auto border-b border-black/5 relative">
        <span className="text-[10px] uppercase tracking-[1em] text-zinc-400 font-bold block mb-6 animate-pulse">
          Lookbook 2026 // Campaña
        </span>
        <h1 className="text-6xl md:text-[10rem] font-black tracking-tighter uppercase leading-[0.8] text-black">
          DARK<br/>LIGHT<br/>
          <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>
            PROJECT
          </span>
        </h1>
        <p className="text-zinc-500 font-sans not-italic text-sm max-w-xl mt-12 leading-relaxed uppercase tracking-wide">
          Presentamos el registro visual de nuestra primera cápsula urbana. Capturado en el microclima industrial y nocturno de Baradero, Buenos Aires. Materiales crudos, calces exagerados y confort absoluto.
        </p>
      </section>

      {/* LOOKS - DISPLAY LISTADO EDITORIAL */}
      <section className="max-w-7xl mx-auto px-6 py-24 space-y-40">
        {looks.map((look, index) => (
          <div 
            key={look.id} 
            className={`grid md:grid-cols-2 gap-12 items-center ${
              index % 2 === 1 ? 'md:flex-row-reverse' : ''
            }`}
          >
            {/* Imagen del Look */}
            <div className={`aspect-[4/5] bg-zinc-50 border border-black/5 overflow-hidden group rounded-sm ${
              index % 2 === 1 ? 'md:order-last' : ''
            }`}>
              <img 
                src={look.image} 
                alt={look.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[2s] ease-out scale-100 group-hover:scale-105"
              />
            </div>

            {/* Texto Descriptivo */}
            <div className="space-y-6 md:p-8">
              <span className="text-[10px] uppercase tracking-[0.5em] text-zinc-400 block">
                {look.number}
              </span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none text-black">
                {look.title}
              </h2>
              <p className="text-zinc-600 font-sans not-italic text-sm leading-relaxed max-w-md uppercase tracking-tight text-justify">
                {look.description}
              </p>
              <div className="pt-6">
                <Link 
                  href={look.link} 
                  className="inline-block bg-black text-white px-8 py-4 text-[9px] uppercase tracking-[0.4em] hover:bg-zinc-800 transition-all font-black italic border border-black rounded-sm shadow-sm"
                >
                  {look.linkText}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* CTA FINAL */}
      <section className="py-40 bg-zinc-50 border-t border-black/5 px-6 text-center space-y-8">
        <h3 className="text-4xl md:text-7xl font-black uppercase tracking-tighter italic text-black">SIRIUS GEAR 2026</h3>
        <p className="text-zinc-400 max-w-md mx-auto font-sans not-italic text-xs uppercase tracking-widest leading-relaxed">
          Todas las prendas fotografiadas en esta campaña se encuentran disponibles para encargar de manera inmediata hasta agotar stock físico.
        </p>
        <div className="pt-6">
          <Link href="/tienda" className="bg-black text-white px-12 py-5 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-zinc-800 transition-all duration-500 rounded-sm shadow-md">
            Comprar Ahora
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 text-center opacity-40">
        <p className="text-[8px] text-zinc-500 uppercase tracking-[1em] font-bold">
          Tienda Oficial Online Sirius &copy; 2026
        </p>
      </footer>

    </main>
  );
}
