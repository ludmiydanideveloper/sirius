import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductActions from '@/components/ProductActions';

// Definimos la interfaz para Next.js 15
interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: Props) {
  // 1. Desempaquetamos el ID de la URL
  const { id } = await params;

  // 2. Traemos el producto y sus variantes desde Supabase
  const { data: product, error } = await supabase
    .from('products')
    .select('*, product_variants(*)')
    .eq('id', id)
    .single();

  // 3. Si hay error o el producto no existe, mandamos al 404
  if (error || !product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-zinc-900 selection:bg-black selection:text-white transition-all duration-300">
      
      {/* NAVEGACIÓN SUPERIOR */}
      <nav className="p-6 md:px-20 border-b border-black/5 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <Link href="/tienda" className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black text-zinc-500 hover:text-black transition">
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Volver a la Tienda
        </Link>
        <div className="text-[10px] font-mono text-zinc-400 tracking-tighter hidden md:block uppercase">
          Sistema_Sirius_v1 // {id.slice(0, 8)}
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-12 md:py-24 px-6">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-32 items-start">
          
          {/* COLUMNA 1: IMAGEN */}
          <div className="md:sticky md:top-32 space-y-6">
            <div className="aspect-[3/4] bg-zinc-50 border border-black/5 overflow-hidden group rounded-sm">
              <img 
                src={product.image_featured || "https://via.placeholder.com/800x1000?text=SIRIUS"} 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out scale-100 hover:scale-105"
                alt={product.name}
              />
            </div>
            <div className="flex justify-between items-center px-2 opacity-40">
              <p className="text-[8px] text-zinc-400 uppercase tracking-[0.5em] font-bold italic">Recursos Visuales Sirius</p>
              <p className="text-[8px] text-zinc-400 uppercase tracking-[0.5em] font-bold italic">Edición 2026</p>
            </div>
          </div>

          {/* COLUMNA 2: INFO Y ACCIONES DINÁMICAS */}
          <div className="flex flex-col pt-4">
            <header className="mb-12 border-b border-black/5 pb-12">
              <h1 className="text-7xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.85] mb-8 text-black">
                {product.name}
              </h1>
              <div className="flex items-end gap-4">
                <span className="text-5xl font-black italic tracking-tighter text-black">
                  ${Number(product.base_price).toLocaleString('es-AR')}
                </span>
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-[0.3em] pb-2 font-sans not-italic">
                  AR$ / Precio Contado
                </span>
              </div>
            </header>

            <div className="space-y-12">
              {/* DESCRIPCIÓN */}
              <section>
                <h4 className="text-[10px] uppercase tracking-[0.5em] text-zinc-400 font-black mb-4 italic tracking-widest">
                  Descripción
                </h4>
                <p className="text-zinc-600 text-sm leading-relaxed max-w-md uppercase tracking-tight text-justify italic font-sans not-italic">
                  {product.description || "Prenda urbana de alta calidad diseñada para mayor durabilidad y comodidad. Algodón premium con costuras reforzadas. Creada para la calle."}
                </p>
              </section>

              {/* COMPONENTE DE ACCIÓN (Selector de talles y Botón Add to Cart) */}
              <ProductActions 
                product={product} 
                variants={product.product_variants} 
              />

              {/* INFO EXTRA DE ENVÍO */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-zinc-50 p-4 border border-black/5 rounded-sm">
                  <p className="text-[8px] text-zinc-400 uppercase font-black mb-1 tracking-widest">Información de Envío</p>
                  <p className="text-[10px] text-zinc-600 uppercase font-bold tracking-tighter">Gratis en Baradero / Envíos a todo el país</p>
                </div>
                <div className="bg-zinc-50 p-4 border border-black/5 rounded-sm">
                  <p className="text-[8px] text-zinc-400 uppercase font-black mb-1 tracking-widest">Cambios y Devoluciones</p>
                  <p className="text-[10px] text-zinc-600 uppercase font-bold tracking-tighter">30 días para realizar cambios gratis</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <footer className="py-20 border-t border-black/5 text-center mt-20 opacity-40">
        <p className="text-[8px] text-zinc-400 uppercase tracking-[1.5em] font-bold">Tienda Online Oficial Sirius &copy; 2026</p>
      </footer>
    </main>
  );
}