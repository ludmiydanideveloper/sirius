'use client';

import { useEffect, useState } from 'react';

export default function NewsletterModal() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    setMounted(true);
    // Verificamos si ya cerró o se suscribió antes
    const dismissed = localStorage.getItem('sirius-newsletter-dismissed');
    if (!dismissed) {
      // Aparece con un elegante retardo de 1.5 segundos
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!mounted || !isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('sirius-newsletter-dismissed', 'true');
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      localStorage.setItem('sirius-newsletter-dismissed', 'true');
    }
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fade-in">
      <div className="relative w-full max-w-[850px] bg-black border border-white/10 text-white flex flex-col md:flex-row overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.6)] italic font-black rounded-sm max-h-[90vh] md:h-[460px]">
        
        {/* BOTÓN DE CIERRE GLOBAL */}
        <button 
          onClick={handleClose} 
          className="absolute top-4 right-4 text-zinc-400 hover:text-white transition text-xs border border-white/10 px-3 py-2 hover:border-white rounded-sm z-50 bg-black/50 backdrop-blur-sm"
          aria-label="Cerrar modal"
        >
          ✕
        </button>

        {/* COLUMNA IZQUIERDA: IMAGEN (Solo en PC) */}
        <div className="hidden md:block w-1/2 relative bg-zinc-950 overflow-hidden">
          <img 
            src="/newsletter_crew.png" 
            alt="Sirius Crew Streetwear Lookbook" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[1.5s] ease-in-out scale-100 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
        </div>

        {/* COLUMNA DERECHA: FORMULARIO */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative space-y-6 bg-zinc-950/80">
          
          {!isSubscribed ? (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <span className="text-[8px] uppercase tracking-[0.4em] text-zinc-400 font-sans not-italic font-bold block">
                  Sumate a la crew Sirius
                </span>
                <h2 className="text-3xl md:text-4.5xl tracking-tighter uppercase leading-[0.9] text-white">
                  10% OFF EN TU PRIMERA COMPRA.
                </h2>
                <p className="text-[10px] text-zinc-400 uppercase tracking-widest leading-relaxed mt-2 font-normal not-italic font-sans">
                  Drops nuevos, promos exclusivas y mucho más.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <p className="text-[9px] uppercase tracking-widest text-zinc-300 font-sans not-italic font-bold">
                  📩 Dejanos tu mail y vestite distinto.
                </p>
                
                <form onSubmit={handleSubscribe} className="space-y-3 font-sans not-italic">
                  <input 
                    type="email" 
                    required 
                    placeholder="tunombre@email.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 p-4 text-xs font-bold text-white uppercase outline-none focus:border-white transition shadow-inner rounded-sm"
                  />
                  <button 
                    type="submit"
                    className="w-full bg-white text-black py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-zinc-200 transition active:scale-[0.98] rounded-sm italic"
                  >
                    Suscribirme
                  </button>
                </form>
              </div>
            </div>
          ) : (
            // PANTALLA DE ÉXITO
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-[0.5em] text-green-500 font-sans not-italic font-bold block">
                  ¡Bienvenido a la Crew!
                </span>
                <h2 className="text-3xl tracking-tighter uppercase leading-none text-white">
                  ¡SUSCRIPCIÓN EXITOSA!
                </h2>
                <p className="text-[10px] text-zinc-400 uppercase tracking-widest leading-relaxed mt-2">
                  Usá el siguiente código de descuento en el checkout:
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-6 text-center rounded-sm font-mono text-3xl text-white tracking-widest font-black select-all shadow-inner my-4">
                SIRIUS10
              </div>

              <div className="space-y-4">
                <p className="text-[8px] uppercase tracking-widest text-zinc-500 font-sans not-italic font-bold">
                  * Copiá el código y úsalo al confirmar tu orden por WhatsApp.
                </p>
                <button 
                  onClick={handleClose}
                  className="w-full border border-white/15 text-white py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition active:scale-[0.98] rounded-sm"
                >
                  Comenzar a Comprar
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
