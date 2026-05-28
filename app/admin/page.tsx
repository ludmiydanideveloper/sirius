'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminPage() {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    base_price: '',
    image_featured: '',
    color: 'BLACK',
    category: ''
  });

  // Lista dinámica de variantes (talle y stock)
  const [variantsList, setVariantsList] = useState<{ size: string; stock: number }[]>([
    { size: 'S', stock: 0 },
    { size: 'M', stock: 0 },
    { size: 'L', stock: 0 },
    { size: 'XL', stock: 0 },
  ]);

  // Estados para nuevo talle personalizado
  const [customSize, setCustomSize] = useState('');
  const [customStock, setCustomStock] = useState(0);

  // Manejo de carga de imagen
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) return;
      const file = event.target.files[0];
      const fileName = `${Math.random()}.${file.name.split('.').pop()}`;
      const { error: uploadError } = await supabase.storage.from('product-images').upload(fileName, file);
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from('product-images').getPublicUrl(fileName);
      setForm({ ...form, image_featured: data.publicUrl });
    } catch (error: any) {
      alert("Error de imagen: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  // Agregar talle personalizado al listado
  const handleAddCustomSize = (e: React.MouseEvent) => {
    e.preventDefault();
    const cleanSize = customSize.trim().toUpperCase();
    if (!cleanSize) return alert("INGRESÁ EL NOMBRE DEL TALLE");
    if (variantsList.some(v => v.size === cleanSize)) {
      return alert("ESTE TALLE YA EXISTE EN EL LISTADO");
    }
    setVariantsList([...variantsList, { size: cleanSize, stock: customStock }]);
    setCustomSize('');
    setCustomStock(0);
  };

  // Quitar talle del listado
  const handleRemoveSize = (sizeToRemove: string) => {
    setVariantsList(variantsList.filter(v => v.size !== sizeToRemove));
  };

  // Actualizar stock de un talle del listado
  const handleUpdateStock = (sizeToUpdate: string, newStock: number) => {
    setVariantsList(variantsList.map(v => 
      v.size === sizeToUpdate ? { ...v, stock: Math.max(0, newStock) } : v
    ));
  };

  // Publicar producto en Supabase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.image_featured || !form.category) return alert("SUBÍ FOTO Y SELECCIONÁ CATEGORÍA");
    if (variantsList.length === 0) return alert("DEBES CARGAR AL MENOS UN TALLE CON STOCK");
    setLoading(true);

    try {
      const { data: product, error: pError } = await supabase.from('products').insert([{ 
        name: form.name.toUpperCase(), 
        description: form.description, 
        base_price: parseFloat(form.base_price),
        image_featured: form.image_featured,
        category: form.category.toUpperCase()
      }]).select().single();

      if (pError) throw pError;

      const variants = variantsList.map(v => ({
        product_id: product.id,
        size: v.size,
        color: form.color.toUpperCase(),
        stock: v.stock
      }));

      await supabase.from('product_variants').insert(variants);
      alert("PRODUCTO PUBLICADO EN " + form.category);
      
      // Limpiar Formulario
      setForm({ name: '', description: '', base_price: '', image_featured: '', color: 'BLACK', category: '' });
      setVariantsList([
        { size: 'S', stock: 0 },
        { size: 'M', stock: 0 },
        { size: 'L', stock: 0 },
        { size: 'XL', stock: 0 },
      ]);
      setCustomSize('');
      setCustomStock(0);
    } catch (error: any) {
      alert("ERROR AL PUBLICAR: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-20 font-sans selection:bg-white selection:text-black">
      <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-10 border-b border-white/5 pb-6">Panel de Administración Sirius</h1>
      
      <form onSubmit={handleSubmit} className="max-w-5xl grid lg:grid-cols-2 gap-12">
        
        {/* COLUMNA IZQUIERDA: IMAGEN */}
        <div className="space-y-6">
          <div className="aspect-[3/4] bg-zinc-900 border border-white/10 flex items-center justify-center relative overflow-hidden rounded-sm group">
            {form.image_featured ? (
              <img src={form.image_featured} className="w-full h-full object-cover" alt="Vista previa del producto" />
            ) : (
              <div className="text-center space-y-2 select-none">
                <span className="text-4xl block">📷</span>
                <span className="text-[9px] uppercase tracking-widest font-black text-zinc-500 block">Subir Imagen Destacada</span>
              </div>
            )}
            <input type="file" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer z-20" />
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none z-10" />
          </div>
          {uploading && <p className="text-[9px] animate-pulse text-center uppercase font-black text-zinc-400">Subiendo archivo a Supabase...</p>}
        </div>

        {/* COLUMNA DERECHA: FORMULARIO */}
        <div className="space-y-6">
          
          {/* Nombre */}
          <input 
            className="w-full bg-zinc-900 border border-white/5 p-4 text-sm font-black uppercase outline-none focus:border-white rounded-sm" 
            placeholder="Nombre del Producto" 
            value={form.name} 
            onChange={(e) => setForm({...form, name: e.target.value})} 
            required 
          />
          
          {/* Categoría */}
          <select 
            className="w-full bg-zinc-900 border border-white/5 p-4 text-[10px] font-black uppercase tracking-widest outline-none focus:border-white appearance-none cursor-pointer rounded-sm" 
            value={form.category} 
            onChange={(e) => setForm({...form, category: e.target.value})} 
            required
          >
            <option value="">Seleccionar Categoría</option>
            <option value="REMERAS">Remeras</option>
            <option value="HOODIES">Hoodies</option>
            <option value="PANTALONES">Pantalones</option>
            <option value="CAMPERAS">Camperas</option>
            <option value="ACCESORIOS">Accesorios</option>
          </select>

          {/* Color y Precio */}
          <div className="grid grid-cols-2 gap-4">
            <input 
              className="bg-zinc-900 border border-white/5 p-4 text-sm font-black uppercase outline-none focus:border-white rounded-sm" 
              placeholder="Color" 
              value={form.color} 
              onChange={(e) => setForm({...form, color: e.target.value})} 
              required 
            />
            <input 
              type="number" 
              className="bg-zinc-900 border border-white/5 p-4 text-sm font-black outline-none focus:border-white rounded-sm" 
              placeholder="Precio ARS" 
              value={form.base_price} 
              onChange={(e) => setForm({...form, base_price: e.target.value})} 
              required 
            />
          </div>

          {/* Descripción (Campo Faltante Restaurado) */}
          <textarea 
            className="w-full bg-zinc-900 border border-white/5 p-4 text-xs font-black uppercase outline-none focus:border-white h-24 resize-none rounded-sm placeholder-zinc-600" 
            placeholder="Descripción del producto (Hilado, Calce, Detalles...)" 
            value={form.description} 
            onChange={(e) => setForm({...form, description: e.target.value})} 
            required 
          />

          {/* GESTIÓN DINÁMICA DE TALLES Y STOCK */}
          <div className="space-y-4 pt-2 border-t border-white/5">
            <div className="flex justify-between items-center">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 italic">Lista de Talles y Stock</h3>
              <span className="text-[8px] font-mono text-zinc-500 uppercase">{variantsList.length} Variante(s)</span>
            </div>
            
            {/* Tabla/Listado dinámico */}
            <div className="bg-zinc-950 border border-white/5 rounded-sm p-4 space-y-3 max-h-52 overflow-y-auto">
              {variantsList.length > 0 ? (
                variantsList.map((v) => (
                  <div key={v.size} className="flex items-center justify-between bg-zinc-900/40 p-2.5 border border-white/5 rounded-sm">
                    <div className="flex items-center space-x-3">
                      <span className="text-[10px] font-black italic bg-white text-black px-2.5 py-1 rounded-sm leading-none">{v.size}</span>
                      <span className="text-[8px] text-zinc-500 uppercase tracking-wider font-black">Stock asignado:</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input 
                        type="number" 
                        className="w-16 bg-zinc-900 border border-white/10 p-2 text-xs font-bold text-center text-white outline-none focus:border-white rounded-sm"
                        value={v.stock}
                        onChange={(e) => handleUpdateStock(v.size, parseInt(e.target.value) || 0)}
                        min="0"
                      />
                      <button 
                        type="button"
                        onClick={() => handleRemoveSize(v.size)}
                        className="text-[8px] text-red-500 hover:text-red-400 font-black uppercase tracking-widest px-2.5 py-2 border border-red-950 hover:border-red-500 rounded-sm transition"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-[8px] text-zinc-600 uppercase tracking-widest text-center py-4">Sin talles agregados.</p>
              )}
            </div>

            {/* Fila para agregar talle rápido */}
            <div className="bg-zinc-900/50 border border-white/5 p-4 rounded-sm flex items-end gap-3">
              <div className="flex-1 space-y-1.5">
                <label className="block text-[8px] uppercase tracking-widest text-zinc-500 font-black">Nombre del Talle (Ej: XXL, 38, UNICO)</label>
                <input 
                  type="text" 
                  placeholder="Talle" 
                  className="w-full bg-zinc-950 border border-white/15 p-3 text-xs font-black uppercase outline-none focus:border-white rounded-sm"
                  value={customSize}
                  onChange={(e) => setCustomSize(e.target.value)}
                />
              </div>
              <div className="w-20 space-y-1.5">
                <label className="block text-[8px] uppercase tracking-widest text-zinc-500 font-black">Stock</label>
                <input 
                  type="number" 
                  placeholder="0"
                  className="w-full bg-zinc-950 border border-white/15 p-3 text-xs font-bold text-center text-white outline-none focus:border-white rounded-sm"
                  value={customStock}
                  onChange={(e) => setCustomStock(parseInt(e.target.value) || 0)}
                  min="0"
                />
              </div>
              <button 
                type="button"
                onClick={handleAddCustomSize}
                className="bg-white text-black hover:bg-zinc-200 py-3 px-4 text-[9px] font-black uppercase tracking-widest transition duration-300 rounded-sm h-[42px] shrink-0"
              >
                [+] Agregar
              </button>
            </div>

          </div>

          {/* Publicación */}
          <button 
            disabled={loading || uploading} 
            className="w-full bg-white text-black py-5 font-black uppercase tracking-[0.5em] text-[10px] hover:bg-zinc-300 transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
          >
            {loading ? 'Publicando en Tienda...' : 'Publicar Producto'}
          </button>

        </div>

      </form>
    </main>
  );
}