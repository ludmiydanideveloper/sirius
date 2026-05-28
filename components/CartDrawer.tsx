'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/store/useCart';

export default function CartDrawer() {
  const [mounted, setMounted] = useState(false);
  const { cart, cartIsOpen, setCartIsOpen, updateQuantity, removeItem, totalPrice } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevenir scroll en el fondo cuando el carrito está abierto
  useEffect(() => {
    if (cartIsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [cartIsOpen]);

  if (!mounted) return null;

  const total = totalPrice();

  return (
    <div className={`fixed inset-0 z-[200] ${cartIsOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      
      {/* FONDO TRANSLÚCIDO DESENFOCADO (BACKDROP) */}
      <div 
        onClick={() => setCartIsOpen(false)}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ease-in-out ${
          cartIsOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* PANEL LATERAL (DRAWER) */}
      <div 
        className={`fixed right-0 top-0 h-full w-full sm:w-[460px] bg-white border-l border-black/10 shadow-[0_0_60px_rgba(0,0,0,0.15)] flex flex-col transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${
          cartIsOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* HEADER */}
        <header className="px-6 py-8 border-b border-black/5 flex items-center justify-between bg-white italic font-black">
          <div className="space-y-1">
            <span className="text-[8px] text-zinc-400 uppercase tracking-[0.5em] font-sans not-italic font-bold">Sirius Studio // Carrito</span>
            <h2 className="text-xl uppercase tracking-tighter text-black">TU COMPRA</h2>
          </div>
          <button 
            onClick={() => setCartIsOpen(false)}
            className="text-[9px] uppercase tracking-[0.3em] font-bold text-zinc-400 hover:text-black transition-all border border-black/10 px-4 py-2 hover:border-black rounded-sm"
          >
            [ Cerrar ]
          </button>
        </header>

        {/* LISTADO DE PRODUCTOS */}
        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6 selection:bg-black selection:text-white">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div 
                key={`${item.id}-${item.size}`} 
                className="flex gap-4 border-b border-black/5 pb-6 group items-start"
              >
                {/* Imagen Miniatura */}
                <div className="w-16 h-20 bg-zinc-50 border border-black/5 overflow-hidden shrink-0 rounded-sm">
                  <img 
                    src={item.image || "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=200"} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                    alt={item.name} 
                  />
                </div>

                {/* Detalles e Interactividad */}
                <div className="flex-1 flex flex-col justify-between h-20 py-0.5">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="text-xs uppercase tracking-wider font-black text-black leading-tight truncate max-w-[200px]">
                        {item.name}
                      </h4>
                      <p className="text-[8px] text-zinc-400 tracking-widest uppercase font-sans not-italic font-bold mt-1">
                        Talle: <span className="text-zinc-950 font-black italic">{item.size}</span>
                      </p>
                    </div>
                    <span className="text-sm font-mono font-black text-black shrink-0">
                      ${(item.price * item.quantity).toLocaleString('es-AR')}
                    </span>
                  </div>

                  {/* Controles del artículo */}
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center border border-black/10 bg-white rounded-sm text-[10px] shadow-sm overflow-hidden">
                      <button 
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                        className="px-2.5 py-1 hover:bg-black hover:text-white transition font-black"
                      >
                        -
                      </button>
                      <span className="px-3 font-mono font-bold text-zinc-800">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        className="px-2.5 py-1 hover:bg-black hover:text-white transition font-black"
                      >
                        +
                      </button>
                    </div>

                    <button 
                      onClick={() => removeItem(item.id, item.size)}
                      className="text-[8px] text-zinc-400 hover:text-red-600 uppercase tracking-widest transition-colors font-bold"
                    >
                      [ Quitar ]
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // VISTA VACÍA
            <div className="py-24 text-center space-y-6">
              <span className="text-[9px] uppercase tracking-[0.5em] text-zinc-400 block animate-pulse font-black italic">
                Carrito_Vacío // Sin prendas
              </span>
              <p className="text-lg uppercase tracking-tighter text-zinc-500 font-sans not-italic">
                No has seleccionado ninguna prenda todavía.
              </p>
              <button 
                onClick={() => setCartIsOpen(false)}
                className="inline-block border border-black/10 text-black px-8 py-3.5 text-[8px] font-black uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-300 rounded-sm"
              >
                Explorar Catálogo
              </button>
            </div>
          )}
        </div>

        {/* PIE DE PÁGINA (RESUMEN Y BOTONES) */}
        {cart.length > 0 && (
          <footer className="bg-zinc-50 border-t border-black/5 p-6 space-y-6 italic font-black shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
            
            {/* Totales */}
            <div className="space-y-2">
              <div className="flex justify-between text-[9px] uppercase tracking-widest text-zinc-400 font-sans not-italic font-bold">
                <span>Subtotal ({cart.reduce((acc, item) => acc + item.quantity, 0)} prendas)</span>
                <span className="font-mono text-zinc-800">${total.toLocaleString('es-AR')}</span>
              </div>
              <div className="flex justify-between text-2xl pt-2 border-t border-black/10">
                <span className="uppercase tracking-tighter text-xs self-end pb-0.5 text-zinc-600">Total Estimado</span>
                <span className="tracking-tighter font-mono text-black">${total.toLocaleString('es-AR')}</span>
              </div>
            </div>

            {/* Acciones */}
            <div className="flex flex-col gap-3 pt-2">
              <Link 
                href="/cart"
                onClick={() => setCartIsOpen(false)}
                className="w-full bg-black text-white py-5 text-[9px] uppercase tracking-[0.4em] hover:bg-zinc-800 transition active:scale-[0.98] rounded-sm text-center shadow-md font-black"
              >
                IR AL CHECKOUT
              </Link>
              
              <button 
                onClick={() => setCartIsOpen(false)}
                className="w-full border border-black/10 bg-white text-black py-4 text-[9px] uppercase tracking-[0.4em] hover:bg-zinc-50 transition active:scale-[0.98] rounded-sm font-black"
              >
                SEGUIR COMPRANDO
              </button>
            </div>

            <div className="text-center text-[7px] text-zinc-400 uppercase tracking-widest not-italic font-sans font-bold leading-relaxed">
              El checkout procesará tu orden y abrirá WhatsApp para coordinar el pago y envío.
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}
