'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/store/useCart';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const totalItems = useCart((state) => state.totalItems());
  const setCartIsOpen = useCart((state) => state.setCartIsOpen);

  useEffect(() => {
    setMounted(true);
  }, []);

  const categories = [
    { name: 'Remeras', slug: 'remeras' },
    { name: 'Hoodies', slug: 'hoodies' },
    { name: 'Pantalones', slug: 'pantalones' },
    { name: 'Camperas', slug: 'camperas' },
    { name: 'Accesorios', slug: 'accesorios' },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md text-black border-b border-black/5 sticky top-0 z-[100] py-8 uppercase font-black italic shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center tracking-[0.2em]">
        
        {/* LOGO */}
        <Link href="/" className="text-3xl tracking-tighter hover:text-zinc-600 transition-colors">
          SIRIUS
        </Link>

        {/* NAVEGACIÓN */}
        <div className="flex items-center space-x-12 text-xs md:text-sm">
          
          <Link href="/tienda" className="hover:text-zinc-600 transition-colors">
            Tienda
          </Link>

          {/* CONTENEDOR DEL DROPDOWN */}
          <div 
            className="relative h-full"
            onMouseEnter={() => setIsOpen(true)} 
            onMouseLeave={() => setIsOpen(false)}
          >
            <button className="hover:text-zinc-600 transition-colors flex items-center gap-2 outline-none py-2">
              Categorías {isOpen ? '[-]' : '[+]'}
            </button>

            {/* EL DESPLEGABLE */}
            {isOpen && (
              <div className="absolute top-full -left-6 w-56 pt-2"> 
                <div className="bg-white border border-black/5 py-6 flex flex-col shadow-[0_15px_45px_rgba(0,0,0,0.05)] animate-in fade-in slide-in-from-top-1 duration-200">
                  {categories.map((cat) => (
                    <Link 
                      key={cat.slug} 
                      href={`/category/${cat.slug}`}
                      className="px-8 py-4 text-[12px] tracking-[0.3em] text-zinc-800 hover:bg-black hover:text-white transition-all"
                      onClick={() => setIsOpen(false)}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/drops" className="hover:text-zinc-600 transition-colors">Lookbook</Link>
          
          {/* CARRITO */}
          <button 
            onClick={() => setCartIsOpen(true)}
            className="relative text-xl hover:scale-110 transition-transform flex items-center justify-center p-1 outline-none"
          >
            🛒
            {mounted && totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2.5 bg-black text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border border-black/10 shadow-sm transition-all duration-300 animate-pulse font-mono">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}