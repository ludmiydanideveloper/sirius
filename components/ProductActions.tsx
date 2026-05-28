'use client';

import { useState } from 'react';
import { useCart } from '@/store/useCart';

interface Variant {
  id: string;
  size: string;
  stock: number;
}

interface Product {
  id: string;
  name: string;
  base_price: number;
  image_featured: string;
}

export default function ProductActions({ product, variants }: { product: Product, variants: Variant[] }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isAdded, setIsAdded] = useState(false);
  const addItem = useCart((state) => state.addItem);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("POR FAVOR, SELECCIONÁ UN TALLE");
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.base_price,
      image: product.image_featured,
      size: selectedSize,
      quantity: 1
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="space-y-12">
      {/* SELECTOR DE TALLES */}
      <section>
        <h4 className="text-[10px] uppercase tracking-[0.5em] text-zinc-400 font-black mb-6 italic">Seleccionar Talle</h4>
        <div className="grid grid-cols-4 gap-3">
          {variants && variants.length > 0 ? (
            variants.map((v) => (
              <button 
                key={v.id}
                onClick={() => v.stock > 0 && setSelectedSize(v.size)}
                disabled={v.stock === 0}
                className={`h-16 border flex flex-col items-center justify-center transition-all duration-300 rounded-sm ${
                  v.stock === 0 
                    ? 'border-zinc-100 bg-zinc-50 text-zinc-300 cursor-not-allowed opacity-40 line-through' 
                    : selectedSize === v.size
                    ? 'border-black bg-black text-white scale-105 z-10 shadow-sm'
                    : 'border-black/10 text-black hover:border-black hover:bg-zinc-50'
                }`}
              >
                <span className="text-lg font-black italic uppercase">{v.size}</span>
                {v.stock <= 3 && v.stock > 0 && (
                  <span className={`text-[9px] font-black tracking-tight uppercase mt-0.5 ${selectedSize === v.size ? 'text-white' : 'text-red-600 animate-pulse'}`}>
                    Últimas {v.stock}
                  </span>
                )}
              </button>
            ))
          ) : (
            <p className="text-zinc-400 text-[10px] uppercase italic font-sans not-italic">Agotado / Sin variantes</p>
          )}
        </div>
      </section>

      {/* BOTÓN DE COMPRA */}
      <section className="pt-8">
        <button 
          onClick={handleAddToCart}
          className={`w-full py-8 text-xs font-black uppercase tracking-[0.8em] transition-all duration-500 active:scale-[0.98] rounded-sm ${
            isAdded 
              ? 'bg-zinc-100 text-zinc-400 cursor-default border border-zinc-200' 
              : 'bg-black text-white hover:bg-zinc-800 shadow-md'
          }`}
        >
          {isAdded ? '¡Agregado con Éxito!' : 'Agregar al Carrito'}
        </button>
      </section>
    </div>
  );
}