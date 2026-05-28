'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

interface Variant {
  id: string;
  size: string;
  color: string;
  stock: number;
}

interface Product {
  id: string;
  name: string;
  description: string;
  base_price: number;
  image_featured: string;
  category: string;
  created_at: string;
  product_variants: Variant[];
}

export default function StoreCatalog({ initialProducts }: { initialProducts: Product[] }) {
  // Estados para los filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('TODAS');
  const [selectedBrand, setSelectedBrand] = useState('TODAS');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [sortBy, setSortBy] = useState('NUEVOS'); // 'NUEVOS' | 'MIN_PRECIO' | 'MAX_PRECIO'

  // Lista de categorías para hombres
  const categoriesList = ['TODAS', 'REMERAS', 'HOODIES', 'PANTALONES', 'CAMPERAS', 'ACCESORIOS'];

  // Derivamos marcas ficticias basadas en el nombre del producto para dar aspecto premium y simular marcas
  const getProductBrand = (productName: string) => {
    const upper = productName.toUpperCase();
    if (upper.includes('LAB') || upper.includes('OVER')) return 'SIRIUS LAB';
    if (upper.includes('CORE') || upper.includes('TEE')) return 'SIRIUS CORE';
    if (upper.includes('SPORT') || upper.includes('FIT')) return 'SIRIUS ATHLETICS';
    return 'SIRIUS CLASSICS';
  };

  // Marcas únicas disponibles
  const brandsList = ['TODAS', 'SIRIUS CORE', 'SIRIUS LAB', 'SIRIUS ATHLETICS', 'SIRIUS CLASSICS'];

  // Encontrar el precio máximo absoluto para inicializar el slider de precio
  const maxProductPrice = useMemo(() => {
    if (initialProducts.length === 0) return 100000;
    return Math.max(...initialProducts.map((p) => Number(p.base_price)));
  }, [initialProducts]);

  // Inicializar precio máximo si no está asignado
  useMemo(() => {
    if (maxPrice === 0 && maxProductPrice > 0) {
      setMaxPrice(maxProductPrice);
    }
  }, [maxProductPrice]);

  // Manejo del filtro de talles
  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  // Filtrado y ordenamiento de productos reactivo en cliente
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // 1. Filtrar por término de búsqueda (nombre o descripción)
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description?.toLowerCase().includes(term)
      );
    }

    // 2. Filtrar por Categoría
    if (selectedCategory !== 'TODAS') {
      result = result.filter((p) => p.category?.toUpperCase() === selectedCategory);
    }

    // 3. Filtrar por Marca
    if (selectedBrand !== 'TODAS') {
      result = result.filter((p) => getProductBrand(p.name) === selectedBrand);
    }

    // 4. Filtrar por Rango de Precios
    result = result.filter((p) => Number(p.base_price) <= maxPrice);

    // 5. Filtrar por Talle (mostrar si el talle seleccionado tiene variantes en stock > 0)
    if (selectedSizes.length > 0) {
      result = result.filter((p) => {
        // El producto debe tener al menos un talle seleccionado con stock > 0
        return p.product_variants?.some(
          (v) => selectedSizes.includes(v.size.toUpperCase()) && v.stock > 0
        );
      });
    }

    // 6. Ordenar
    if (sortBy === 'NUEVOS') {
      result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else if (sortBy === 'MIN_PRECIO') {
      result.sort((a, b) => Number(a.base_price) - Number(b.base_price));
    } else if (sortBy === 'MAX_PRECIO') {
      result.sort((a, b) => Number(b.base_price) - Number(a.base_price));
    }

    return result;
  }, [initialProducts, searchTerm, selectedCategory, selectedBrand, selectedSizes, maxPrice, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('TODAS');
    setSelectedBrand('TODAS');
    setSelectedSizes([]);
    setMaxPrice(maxProductPrice);
    setSortBy('NUEVOS');
  };

  return (
    <main className="min-h-screen bg-white text-zinc-900 p-6 md:p-20 selection:bg-black selection:text-white italic font-black transition-all duration-300">
      
      {/* HEADER DE LA SECCIÓN */}
      <header className="mb-16 border-b border-black/5 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.5em] text-zinc-400 block mb-2 font-sans not-italic font-bold">
            Colección Masculina // Sirius Studio
          </span>
          <h1 className="text-6xl md:text-8xl tracking-tighter uppercase leading-none text-black">
            La Tienda
          </h1>
        </div>
        <div className="flex flex-col md:items-end gap-2 font-sans not-italic text-xs text-zinc-500 w-full md:w-auto">
          <label className="text-[9px] uppercase tracking-widest font-black text-zinc-400 italic">Ordenar Por:</label>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-zinc-50 border border-black/10 p-3 text-[10px] font-black uppercase tracking-wider outline-none focus:border-black cursor-pointer appearance-none text-black w-48 font-black italic shadow-sm"
          >
            <option value="NUEVOS">Últimos Lanzamientos</option>
            <option value="MIN_PRECIO">Precio: Menor a Mayor</option>
            <option value="MAX_PRECIO">Precio: Mayor a Menor</option>
          </select>
        </div>
      </header>

      {/* CONTENEDOR PRINCIPAL */}
      <div className="grid lg:grid-cols-4 gap-12 items-start">
        
        {/* PANEL DE FILTROS */}
        <aside className="bg-zinc-50 border border-black/5 p-6 space-y-8 font-sans not-italic shadow-sm rounded-sm">
          
          <div className="flex justify-between items-center border-b border-black/10 pb-4">
            <h2 className="text-sm font-black uppercase tracking-widest text-zinc-800 italic">Filtros</h2>
            <button 
              onClick={clearFilters}
              className="text-[9px] text-zinc-400 hover:text-black uppercase tracking-wider font-bold italic transition"
            >
              [ Limpiar ]
            </button>
          </div>

          {/* BUSCADOR POR TEXTO */}
          <div className="space-y-2">
            <label className="block text-[8px] uppercase tracking-widest text-zinc-400 font-bold italic">Buscar Prenda</label>
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-black/10 p-3 text-xs font-bold text-black uppercase outline-none focus:border-black transition italic shadow-inner rounded-sm"
              placeholder="Ej: remera, hoodie..."
            />
          </div>

          {/* CATEGORÍAS */}
          <div className="space-y-2">
            <label className="block text-[8px] uppercase tracking-widest text-zinc-400 font-bold italic mb-3">Categoría</label>
            <div className="flex flex-wrap lg:flex-col gap-2">
              {categoriesList.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`py-2.5 px-4 text-left text-[10px] uppercase font-black tracking-wider transition-all duration-300 italic border rounded-sm ${
                    selectedCategory === cat 
                      ? 'bg-black text-white border-black' 
                      : 'bg-white border-black/5 text-zinc-600 hover:border-black/20 hover:bg-zinc-100'
                  }`}
                >
                  {cat.toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          {/* MARCAS SIMULADAS */}
          <div className="space-y-2">
            <label className="block text-[8px] uppercase tracking-widest text-zinc-400 font-bold italic mb-3">Línea / Marca</label>
            <div className="flex flex-wrap lg:flex-col gap-2">
              {brandsList.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`py-2.5 px-4 text-left text-[10px] uppercase font-black tracking-wider transition-all duration-300 italic border rounded-sm ${
                    selectedBrand === brand 
                      ? 'bg-black text-white border-black' 
                      : 'bg-white border-black/5 text-zinc-600 hover:border-black/20 hover:bg-zinc-100'
                  }`}
                >
                  {brand.toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          {/* FILTRO DE PRECIO MÁXIMO */}
          <div className="space-y-4">
            <div className="flex justify-between items-center text-[8px] uppercase tracking-widest text-zinc-400 font-bold italic">
              <span>Precio Máximo</span>
              <span className="text-black font-mono font-bold">${maxPrice.toLocaleString('es-AR')}</span>
            </div>
            <input 
              type="range" 
              min="0"
              max={maxProductPrice || 100000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-black cursor-pointer bg-zinc-200 h-1"
            />
            <div className="flex justify-between text-[8px] font-mono text-zinc-400">
              <span>$0</span>
              <span>${(maxProductPrice || 100000).toLocaleString('es-AR')}</span>
            </div>
          </div>

          {/* DISPONIBILIDAD DE TALLE */}
          <div className="space-y-3">
            <label className="block text-[8px] uppercase tracking-widest text-zinc-400 font-bold italic">Stock por Talle</label>
            <div className="grid grid-cols-4 gap-2">
              {['S', 'M', 'L', 'XL'].map((size) => {
                const isSelected = selectedSizes.includes(size);
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`h-10 text-[10px] font-black border transition-all duration-300 italic rounded-sm ${
                      isSelected 
                        ? 'bg-black text-white border-black shadow-sm' 
                        : 'bg-white border-black/10 text-black hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
            <p className="text-[7px] text-zinc-400 uppercase tracking-widest leading-relaxed">
              Muestra solo artículos que tengan stock en cualquiera de los talles seleccionados.
            </p>
          </div>

        </aside>

        {/* LISTADO DE PRODUCTOS */}
        <div className="lg:col-span-3">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
              {filteredProducts.map((p) => {
                const brand = getProductBrand(p.name);
                return (
                  <Link key={p.id} href={`/product/${p.id}`} className="group flex flex-col">
                    <div className="relative aspect-[3/4] bg-zinc-50 border border-black/5 overflow-hidden mb-6 rounded-sm">
                      <img 
                        src={p.image_featured} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1s] ease-in-out group-hover:scale-105" 
                        alt={p.name} 
                      />
                      <div className="absolute top-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <span className="bg-black text-white text-[10px] font-black uppercase px-3 py-1.5 italic tracking-widest rounded-sm shadow-md">
                          {brand}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-[7px] text-zinc-400 uppercase tracking-widest font-sans not-italic font-bold">
                        {p.category} // {brand}
                      </p>
                      <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-800 group-hover:text-zinc-600 transition leading-tight">
                        {p.name}
                      </h3>
                      <p className="text-xl font-black italic tracking-tighter text-black">
                        ${Number(p.base_price).toLocaleString('es-AR')}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="py-32 text-center border border-dashed border-black/10 space-y-4">
              <p className="text-[10px] uppercase tracking-[0.5em] text-zinc-400 animate-pulse font-black italic">
                Sin_Resultados // 0 prendas encontradas
              </p>
              <p className="text-xl uppercase tracking-tighter text-zinc-500 font-sans not-italic">
                Ninguna prenda coincide con tus filtros
              </p>
              <button 
                onClick={clearFilters}
                className="bg-black text-white text-[9px] uppercase tracking-[0.4em] py-4 px-8 hover:bg-zinc-800 transition font-black italic shadow-sm"
              >
                Restablecer Filtros
              </button>
            </div>
          )}
        </div>

      </div>

      <footer className="py-20 border-t border-black/5 text-center mt-20 opacity-40">
        <p className="text-[8px] text-zinc-400 uppercase tracking-[1.5em] font-bold">Tienda Online Oficial Sirius &copy; 2026</p>
      </footer>
    </main>
  );
}
