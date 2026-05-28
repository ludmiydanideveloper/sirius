import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import HomePromoBanner from '@/components/HomePromoBanner';

export default async function Home() {
  // Traemos productos y categorías en paralelo desde Supabase
  const [productsRes, categoriesRes] = await Promise.all([
    supabase.from('products').select('*').order('created_at', { ascending: false }),
    supabase.from('categories').select('*')
  ]);

  const products = productsRes.data || [];
  const categories = categoriesRes.data || [];

  // Explicación técnica y fotos dinámicas por categoría para aportar información de valor
  const getCategoryDetails = (catName: string) => {
    const name = catName.toUpperCase();
    if (name.includes('REMERAS')) {
      return {
        desc: 'Remeras de 240g de Algodón Peinado premium con cuello rib de alta densidad y calce oversize de hombros caídos.',
        img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000'
      };
    }
    if (name.includes('HOODIES') || name.includes('BUZOS')) {
      return {
        desc: 'Buzos en Frisa Invisible pesada de 400g con capuchas de doble paño, cordones de algodón y costuras planas reforzadas.',
        img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000'
      };
    }
    if (name.includes('PANTALONES')) {
      return {
        desc: 'Pantalones cargo y carpinteros de gabardina pesada de 10oz y denim premium rígido con costuras triples y bolsillos funcionales.',
        img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1000'
      };
    }
    if (name.includes('CAMPERAS') || name.includes('ABRIGOS')) {
      return {
        desc: 'Abrigos y camperas técnicas cortavientos impermeables con forrería térmica de microfleece y cierres termosellados.',
        img: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=1000'
      };
    }
    return {
      desc: 'Gorros Beanie tejidos en lana acrílica acanalada de alta densidad, bolsos de cordura militar y accesorios clave de archivo.',
      img: 'https://images.unsplash.com/photo-1576871337622-98d48d4353d3?q=80&w=1000'
    };
  };

  return (
    <main className="bg-white min-h-screen text-zinc-950 selection:bg-black selection:text-white transition-all duration-300">
      
      {/* 1. HERO SECTION - VIDEO DE CAMPAÑA EN LOOP */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden border-b border-black/5 bg-black">
        {/* Gradiente blanco translúcido en la base para fundir con la sección inferior y sutil viñeta oscura arriba */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/25 z-10" />
        
        {/* Video de campaña loopable a color real y opacidad completa para máxima definición y viveza */}
        <video 
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-95 hover:scale-105 transition-all duration-[20s] ease-linear z-0"
        >
          <source src="/campaign.mp4" type="video/mp4" />
          Tu navegador no soporta videos.
        </video>

        <div className="relative z-20 text-center space-y-8 px-6">
          <div className="space-y-2">
            <span className="text-[9px] uppercase tracking-[1.2em] font-black text-black bg-white/90 backdrop-blur-sm px-5 py-2.5 inline-block rounded-sm shadow-md animate-pulse mb-3">
              Lanzamiento 01 // Colección 2026
            </span>
            <h1 className="text-8xl md:text-[12rem] font-black italic tracking-tighter uppercase leading-[0.8] text-black drop-shadow-[0_4px_20px_rgba(255,255,255,0.85)]">
              SIRIUS<br/>
              <span className="text-transparent" style={{ WebkitTextStroke: '2.5px black', textShadow: '0 0 30px rgba(255,255,255,0.9)' }}>
                STUDIO
              </span>
            </h1>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8">
            <Link href="/tienda" className="bg-black text-white px-12 py-5 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-zinc-800 transition-all duration-500 shadow-lg rounded-sm">
              Comprar Ahora
            </Link>
            <Link href="/drops" className="border border-black/30 bg-white/80 backdrop-blur-sm text-black px-12 py-5 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-black hover:text-white hover:border-black transition-all duration-500 rounded-sm shadow-md">
              Ver Lookbook
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 opacity-60 animate-bounce">
          <span className="text-[8px] uppercase tracking-[0.5em] font-bold italic text-black rotate-90 block bg-white/70 backdrop-blur-sm py-1 px-2 rounded-sm shadow-sm">Deslizar</span>
        </div>
      </section>

      {/* 2. CATEGORIES GRID - CON DETALLES DE VALOR MASCULINOS */}
      <section className="py-24 px-6 max-w-7xl mx-auto space-y-12">
        <div className="border-b border-black/5 pb-6">
          <h2 className="text-3xl font-black italic uppercase tracking-tighter text-black">Categorías // Colección Hombre</h2>
          <p className="text-[9px] text-zinc-400 uppercase tracking-widest mt-1">Confección y gramajes desarrollados a medida.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.length > 0 ? categories.map((cat: any) => {
            const details = getCategoryDetails(cat.name);
            return (
              <Link key={cat.id} href={`/category/${cat.id.toLowerCase()}`} className="group relative aspect-[16/9] md:aspect-[3/4] bg-zinc-50 border border-black/5 overflow-hidden flex flex-col justify-end p-8 rounded-sm shadow-sm">
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10" />
                  <img src={details.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-1000 group-hover:scale-105" alt={cat.name} />
                </div>

                <div className="relative z-20 space-y-3">
                  <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">{cat.name}</h3>
                  <p className="text-[10px] font-sans not-italic text-zinc-200 uppercase leading-normal tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] opacity-90 max-w-xs">
                    {details.desc}
                  </p>
                  <span className="inline-block text-[8px] uppercase tracking-[0.3em] font-bold text-white group-hover:underline transition drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] pt-2">Ver Colección →</span>
                </div>
              </Link>
            );
          }) : (
            <div className="col-span-full text-center py-20 border border-dashed border-black/10 text-zinc-400 uppercase text-[10px] font-black tracking-widest">
              No se encontraron categorías
            </div>
          )}
        </div>
      </section>

      {/* 3. PRODUCT GRID - EL CATÁLOGO DESTACADO */}
      <section id="shop" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16 border-b border-black/5 pb-8">
          <div>
            <h2 className="text-4xl font-black italic uppercase tracking-tighter text-black">Lanzamiento Activo</h2>
            <p className="text-[10px] text-zinc-400 uppercase tracking-[0.4em] mt-2 italic font-bold">Prendas Disponibles // Stock en Baradero</p>
          </div>
          <div className="hidden md:block">
            <span className="text-[10px] text-zinc-300 font-mono tracking-tighter uppercase italic">Modelos_Activos // {products.length}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-16">
          {products.map((product: any) => (
            <Link key={product.id} href={`/product/${product.id}`} className="group flex flex-col">
              <div className="relative aspect-[3/4] bg-zinc-50 border border-black/5 overflow-hidden mb-6 rounded-sm">
                
                {/* Badge de Novedad Agrandado */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-black text-white text-[10px] font-black uppercase px-3 py-1.5 italic tracking-widest rounded-sm shadow-md opacity-0 group-hover:opacity-100 transition-all duration-500">
                    Novedad
                  </span>
                </div>
                
                <img 
                  src={product.image_featured} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out group-hover:scale-110" 
                  alt={product.name} 
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-800 group-hover:text-zinc-600 transition leading-tight">
                    {product.name}
                  </h3>
                </div>
                <p className="text-xl font-black italic tracking-tighter text-black">
                  ${Number(product.base_price).toLocaleString('es-AR')}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BANNER PROMOCIONAL IMBATIBLES */}
      <HomePromoBanner />

      {/* 4. SECCIÓN EDITORIAL: IMAGEN + EXPLICACIÓN TÉCNICA */}
      <section className="py-24 bg-zinc-50 border-y border-black/5 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          
          <div className="space-y-8 md:sticky md:top-32">
            <div className="space-y-6">
              <span className="text-[9px] uppercase tracking-[0.5em] text-zinc-400 font-bold block">
                Confección de Archivo // Proceso Sirius
              </span>
              <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-black leading-[0.9]">
                PRENDAS CONSTRUIDAS PARA RESISTIR
              </h2>
              <p className="text-zinc-500 font-sans not-italic text-sm leading-relaxed uppercase tracking-wide">
                No hacemos moda rápida. Cada cápsula urbana está diseñada con especificaciones industriales, materiales pesados y confeccionada por manos expertas de manera justa.
              </p>
            </div>

            {/* Imagen Editorial agregada abajo del bloque de texto */}
            <div className="aspect-[16/10] bg-white border border-black/10 overflow-hidden rounded-sm shadow-md w-full max-w-lg relative group">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition duration-500 z-10" />
              <img 
                src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000" 
                alt="Detalle de Confección Sirius" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1.5s] scale-100 group-hover:scale-105"
              />
            </div>
          </div>

          <div className="space-y-10 font-sans not-italic">
            
            <div className="space-y-2">
              <span className="text-xs font-mono font-black text-black">01 // HILADO MÁXIMO CONFORT</span>
              <h4 className="text-sm font-black uppercase tracking-widest text-zinc-800 italic">Algodón Peinado 100%</h4>
              <p className="text-xs text-zinc-500 leading-relaxed uppercase tracking-tight">
                Tejemos exclusivamente con algodón peinado de fibra larga. Este peinado elimina las impurezas y fibras más cortas del hilado, dando como resultado un tejido sumamente suave, denso y con una durabilidad extrema lavado tras lavado.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-black text-black">02 // CAÍDA RÍGIDA ESTRUCTURADA</span>
              <h4 className="text-sm font-black uppercase tracking-widest text-zinc-800 italic">Gramaje Pesado (Heavyweight)</h4>
              <p className="text-xs text-zinc-500 leading-relaxed uppercase tracking-tight">
                Utilizamos remeras de 240 gramos por metro cuadrado y buzos de frisa de 400 gramos. Aportamos una caída rígida estructurada de corte "oversize boxy" que conserva su arquitectura volumétrica sin pegarse al cuerpo.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-black text-black">03 // RESPONSABILIDAD LOCAL</span>
              <h4 className="text-sm font-black uppercase tracking-widest text-zinc-800 italic">Talleres Éticos de Baradero</h4>
              <p className="text-xs text-zinc-500 leading-relaxed uppercase tracking-tight">
                Creemos en el comercio justo. Toda nuestra confección se realiza de forma ética y artesanal en pequeños talleres locales en Baradero, Buenos Aires. Producimos drops limitados a demanda para mitigar los excesos industriales de indumentaria en nuestro planeta.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-black text-black">04 // REFUERZO URBANO EXTREMO</span>
              <h4 className="text-sm font-black uppercase tracking-widest text-zinc-800 italic">Costuras de Seguridad Flatlock</h4>
              <p className="text-xs text-zinc-500 leading-relaxed uppercase tracking-tight">
                Rematamos los hombros con cinta tapacostura de lado a lado, los cuellos con rib elástico pesado para evitar deformaciones con el uso, y costuras reforzadas en bolsillos y capuchas para resistir las fricciones diarias de la calle.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. BRAND INFO */}
      <section className="py-32 bg-white px-6">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <h4 className="text-[10px] uppercase tracking-[1em] text-zinc-400 font-black italic">El Concepto Sirius</h4>
          <p className="text-2xl md:text-4xl font-black italic uppercase tracking-tighter leading-tight text-zinc-800">
            "Diseñado para quienes caminan en la oscuridad pero llevan su propia luz. Indumentaria urbana de alta calidad desde Baradero al mundo."
          </p>
          <div className="flex justify-center gap-10 pt-10 opacity-40">
             <span className="text-[8px] font-black uppercase tracking-[0.5em] text-zinc-600">100% Algodón</span>
             <span className="text-[8px] font-black uppercase tracking-[0.5em] text-zinc-600">Gramaje Pesado</span>
             <span className="text-[8px] font-black uppercase tracking-[0.5em] text-zinc-600">Corte Urbano</span>
          </div>
        </div>
      </section>

    </main>
  );
}