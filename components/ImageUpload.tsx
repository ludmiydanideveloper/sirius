'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function ImageUpload({ onUpload }: { onUpload: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Debes seleccionar una imagen para subir.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      // Creamos un nombre único para que no se pisen las fotos
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // 1. Subimos el archivo al bucket 'product-images'
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Obtenemos la URL pública para guardarla en la base de datos
      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      onUpload(data.publicUrl);
      alert("Imagen subida con éxito");

    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <label className="text-[10px] uppercase font-black text-zinc-600 italic">Foto del Producto</label>
      <div className="relative border-2 border-dashed border-zinc-800 hover:border-white transition-colors p-10 text-center cursor-pointer group">
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={uploading}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        <span className="text-xs uppercase font-bold tracking-widest text-zinc-500 group-hover:text-white transition">
          {uploading ? 'Subiendo...' : 'Haz clic para subir foto'}
        </span>
      </div>
    </div>
  );
}