'use client';

import { useCart } from '@/store/useCart';
import { useState } from 'react';

export default function AddToCartButton({ product, selectedSize }: { product: any, selectedSize: string }) {
  const addItem = useCart((state) => state.addItem);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    if (!selectedSize) {
      alert("POR FAVOR, SELECCIONÁ UN TALLE");
      return;
    }

    console.log("Agregando producto:", product.name, "Talle:", selectedSize);

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
    <button 
      onClick={handleAdd}
      disabled={isAdded}
      className={`w-full py-8 text-sm font-black uppercase tracking-[0.6em] transition-all active:scale-[0.98] italic relative z-10 border ${
        isAdded 
          ? 'bg-zinc-100 text-zinc-400 border-zinc-200 cursor-default' 
          : 'bg-white text-black hover:bg-zinc-200 border-white'
      }`}
    >
      {isAdded ? '¡Agregado con Éxito!' : `Agregar al Carrito — $${Number(product.base_price).toLocaleString('es-AR')}`}
    </button>
  );
}