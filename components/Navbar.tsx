'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/store/useCart';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const totalItems = useCart((state) => state.totalItems());
  const setCartIsOpen = useCart((state) => state.setCartIsOpen);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevenir scroll cuando el menú móvil de pantalla completa está abierto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const categories = [
    { name: 'Remeras', slug: 'remeras' },
    { name: 'Hoodies', slug: 'hoodies' },
    { name: 'Pantalones', slug: 'pantalones' },
    { name: 'Camperas', slug: 'camperas' },
    { name: 'Accesorios', slug: 'accesorios' },
  ];

  return (
    <>
      <nav className="bg-white/90 backdrop-blur-md text-black border-b border-black/5 sticky top-0 z-[100] py-6 md:py-8 uppercase font-black italic shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center tracking-[0.2em]">
          
          {/* LOGO */}
          <Link href="/" className="text-2xl md:text-3xl tracking-tighter hover:text-zinc-600 transition-colors">
            SIRIUS
          </Link>

          {/* NAVEGACIÓN DESKTOP (Solo visible en PC/Notebooks) */}
          <div className="hidden md:flex items-center space-x-12 text-xs md:text-sm">
            
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
            
            {/* CARRITO EN DESKTOP */}
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

          {/* NAVEGACIÓN MÓVIL (Compacto para Celular) */}
          <div className="flex md:hidden items-center space-x-6">
            {/* CARRITO MÓVIL */}
            <button 
              onClick={() => setCartIsOpen(true)}
              className="relative text-lg flex items-center justify-center p-1 outline-none"
            >
              🛒
              {mounted && totalItems > 0 && (
                <span className="absolute -top-1.5 -right-2.5 bg-black text-white text-[8px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-black/10 shadow-sm font-mono">
                  {totalItems}
                </span>
              )}
            </button>

            {/* BOTÓN DE MENÚ HAMBURGUESA */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="text-[10px] font-black tracking-widest border border-black/10 px-3.5 py-2.5 rounded-sm hover:bg-zinc-50 active:scale-[0.97] transition-all"
            >
              [ MENU ]
            </button>
          </div>

        </div>
      </nav>

      {/* MENÚ MÓVIL FULLSCREEN OVERLAY (Emerge en pantalla completa en celular) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-[250] flex flex-col justify-between p-8 animate-fade-in md:hidden font-black italic select-none">
          
          {/* HEADER DEL MENÚ MÓVIL */}
          <div className="flex justify-between items-center tracking-[0.2em] border-b border-black/5 pb-6">
            <Link 
              href="/" 
              className="text-2xl tracking-tighter"
              onClick={() => setMobileMenuOpen(false)}
            >
              SIRIUS
            </Link>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="text-[9px] uppercase tracking-[0.3em] font-bold text-zinc-400 border border-black/10 px-4 py-2 rounded-sm active:scale-95 transition-transform"
            >
              [ Cerrar ]
            </button>
          </div>

          {/* LISTADO DE ENLACES MÓVIL */}
          <div className="flex-1 flex flex-col justify-center space-y-10 text-2.5xl tracking-[0.15em] uppercase py-8 overflow-y-auto">
            
            <Link 
              href="/tienda" 
              className="hover:text-zinc-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tienda
            </Link>

            {/* Sublistado de Categorías */}
            <div className="space-y-4">
              <span className="text-[9px] text-zinc-400 uppercase tracking-[0.4em] font-sans not-italic font-bold block mb-1">
                Categorías
              </span>
              <div className="flex flex-col space-y-4 pl-4 border-l-2 border-black/10">
                {categories.map((cat) => (
                  <Link 
                    key={cat.slug} 
                    href={`/category/${cat.slug}`}
                    className="text-lg text-zinc-800 hover:text-black tracking-wider transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    • {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link 
              href="/drops" 
              className="hover:text-zinc-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Lookbook
            </Link>

          </div>

          {/* FOOTER DEL MENÚ MÓVIL */}
          <div className="text-center border-t border-black/5 pt-6 text-[8px] text-zinc-400 tracking-widest uppercase not-italic font-sans font-bold leading-relaxed">
            Sirius Studio &copy; 2026 // Colección Urbana
          </div>

        </div>
      )}
    </>
  );
}