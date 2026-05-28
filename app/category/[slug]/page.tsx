import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  
  // Esperamos a que lleguen los params
  const { slug } = await params;

  // Buscamos los productos asociados
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('category', slug.toUpperCase());

  // Derivar marca para mantener consistencia visual
  const getProductBrand = (productName: string) => {
    const upper = productName.toUpperCase();
    if (upper.includes('LAB') || upper.includes('OVER')) return 'SIRIUS LAB';
    if (upper.includes('CORE') || upper.includes('TEE')) return 'SIRIUS CORE';
    if (upper.includes('SPORT') || upper.includes('FIT')) return 'SIRIUS ATHLETICS';
    return 'SIRIUS CLASSICS';
  };

  return (
    <main className="min-h-screen bg-white text-zinc-900 p-10 md:p-24 selection:bg-black selection:text-white font-sans transition-all duration-300">
      <header className="mb-20 border-b border-black/5 pb-10 flex flex-col gap-2">
        <span className="text-[10px] text-zinc-400 uppercase tracking-[0.6em] font-black italic block">
          Explorando Sirius Studio // 2026
        </span>
        <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-none text-black">
          {slug}
        </h1>
      </header>

      {products && products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-16">
          {products.map((p: any) => {
            const brand = getProductBrand(p.name);
            return (
              <Link key={p.id} href={`/product/${p.id}`} className="group flex flex-col">
                <div className="relative aspect-[3/4] bg-zinc-50 border border-black/5 overflow-hidden mb-6 rounded-sm">
                  {/* Badge de Marca Agrandado */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-black text-white text-[10px] font-black uppercase px-3 py-1.5 italic tracking-widest rounded-sm shadow-md">
                      {brand}
                    </span>
                  </div>
                  
                  <img 
                    src={p.image_featured} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
                    alt={p.name} 
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-[8px] text-zinc-400 uppercase tracking-widest font-sans not-italic font-bold">
                    Lanzamiento 01 // {brand}
                  </p>
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-800 group-hover:text-zinc-600 transition leading-tight">
                    {p.name}
                  </h3>
                  <p className="text-xl font-black italic tracking-tighter text-black mt-1">
                    ${Number(p.base_price).toLocaleString('es-AR')}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="py-40 text-center border border-dashed border-black/10 rounded-sm bg-zinc-50/50">
          <p className="text-xs uppercase font-black tracking-[0.5em] italic text-zinc-400 animate-pulse">No hay stock activo en esta sección</p>
        </div>
      )}
    </main>
  );
}