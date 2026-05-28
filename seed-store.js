const { createClient } = require('@supabase/supabase-js');

// Credenciales sacadas de tu .env.local
const SUPABASE_URL = 'https://askwephlaypahmfoiufq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFza3dlcGhsYXlwYWhtZm9pdWZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2ODIzMzUsImV4cCI6MjA4OTI1ODMzNX0.m3t1QCKiwdrzl6g3AReGLdGfIdLx-zV2uSaUBu2kf2U';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const productsData = [
  {
    name: 'SIRIUS OVER TEE CLASSIC',
    category: 'REMERAS',
    base_price: 24500,
    description: 'Remera de calce oversize boxy confeccionada en jersey de algodón peinado premium de 240g. Cuenta con cuello de rib pesado de alta densidad de 3cm y tapacosturas de hombro a hombro reforzado. Una silueta rígida icónica que no pierde forma.',
    image_featured: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000',
    color: 'BLACK'
  },
  {
    name: 'SIRIUS TECH HEAVY TEE',
    category: 'REMERAS',
    base_price: 26800,
    description: 'Remera de manga media y hombros ultra caídos en punto grueso de 260g teñido en frío. Estampa tipográfica "SIRIUS LAB" en serigrafía al tacto cero. Algodón premium pre-lavado para evitar cualquier encogimiento.',
    image_featured: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1000',
    color: 'GRAY'
  },
  {
    name: 'SIRIUS ARCHIVAL HOODIE',
    category: 'HOODIES',
    base_price: 45000,
    description: 'Buzo con capucha confeccionado en Frisa Invisible pesada de 400g/m². Capucha anatómica de doble paño rígida y pesada sin cordones para un aspecto limpio. Costuras reforzadas tipo flatlock en sisas y puños anchos de rib elástico.',
    image_featured: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000',
    color: 'BLACK'
  },
  {
    name: 'SIRIUS ZIP-UP HEAVY SWEATSHIRT',
    category: 'HOODIES',
    base_price: 48500,
    description: 'Buzo con cierre metálico completo YKK de carro doble. Confeccionado en algodón frisado de alto gramaje con bolsillo canguro dividido. Capucha amplia y calce cuadrado relajado desarrollado para el uso diario urbano.',
    image_featured: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000',
    color: 'CHARCOAL'
  },
  {
    name: 'SIRIUS CARGO GABARDINE PANTS',
    category: 'PANTALONES',
    base_price: 52000,
    description: 'Pantalón cargo de gabardina pesada de 10oz ultra resistente al roce. Costuras triples de refuerzo en entrepierna y laterales. Seis bolsillos funcionales: dos laterales fuelle con solapa y botón oculto, dos traseros y dos delanteros profundos.',
    image_featured: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1000',
    color: 'KHAKI'
  },
  {
    name: 'SIRIUS RAW WIDE DENIM',
    category: 'PANTALONES',
    base_price: 55000,
    description: 'Jeans de calce ancho (loose fit) confeccionados en denim rígido premium de 12oz. Lavado crudo ("raw denim") que irá desgastando y tomando la forma de tu cuerpo con el uso. Botonería y remaches de bronce grabados Sirius.',
    image_featured: 'https://images.unsplash.com/photo-1582552938357-32b906df40cd?q=80&w=1000',
    color: 'INDIGO'
  },
  {
    name: 'SIRIUS TECHNICAL WIND JACKET',
    category: 'CAMPERAS',
    base_price: 68000,
    description: 'Campera cortaviento técnica con recubrimiento de teflón repelente al agua. Interior forrado en microfleece de alto rendimiento térmico. Cierres impermeables thermosellados, puños regulables con velcro de agarre fuerte y capucha ajustable.',
    image_featured: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=1000',
    color: 'BLACK'
  },
  {
    name: 'SIRIUS CORE RIB BEANIE',
    category: 'ACCESORIOS',
    base_price: 15000,
    description: 'Gorro beanie tejido en punto canalé inglés de alta densidad. Confeccionado en hilado acrílico premium doble hilado, sumamente suave al tacto y elástico sin deformar. Detalle de etiqueta Sirius bordada a tono en la vuelta.',
    image_featured: 'https://images.unsplash.com/photo-1576871337622-98d48d4353d3?q=80&w=1000',
    color: 'BLACK'
  }
];

async function seed() {
  console.log('⚡ Iniciando sembrado de base de datos Sirius Store...');

  try {
    // 1. Limpiar variantes previas para evitar conflictos de llaves foráneas
    console.log('🗑️  Limpiando base de datos de variantes antiguas...');
    const { error: vDeleteErr } = await supabase.from('product_variants').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    if (vDeleteErr) throw vDeleteErr;

    // 2. Limpiar productos previos
    console.log('🗑️  Limpiando base de datos de productos antiguos...');
    const { error: pDeleteErr } = await supabase.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    if (pDeleteErr) throw pDeleteErr;

    console.log('🌱 Base de datos limpia con éxito. Insertando productos...');

    for (const p of productsData) {
      console.log(`✨ Insertando producto: ${p.name}...`);
      const { data: insertedProduct, error: pInsertErr } = await supabase
        .from('products')
        .insert([{
          name: p.name,
          category: p.category,
          base_price: p.base_price,
          description: p.description,
          image_featured: p.image_featured
        }])
        .select()
        .single();

      if (pInsertErr) {
        console.error(`❌ Error insertando producto ${p.name}:`, pInsertErr.message);
        throw pInsertErr;
      }

      // 3. Crear las variantes de talle con stock real aleatorio para cada producto
      const sizes = p.category === 'ACCESORIOS' ? ['U'] : ['S', 'M', 'L', 'XL'];
      const variants = sizes.map((size) => ({
        product_id: insertedProduct.id,
        size: size,
        color: p.color,
        stock: Math.floor(2 + Math.random() * 8) // Stock dinámico real entre 2 y 9 unidades
      }));

      console.log(`   📦 Insertando ${variants.length} variantes de talle...`);
      const { error: vInsertErr } = await supabase.from('product_variants').insert(variants);
      if (vInsertErr) {
        console.error(`❌ Error insertando variantes de ${p.name}:`, vInsertErr.message);
        throw vInsertErr;
      }
    }

    console.log('\n🎉 ¡PROCESO FINALIZADO CON ÉXITO!');
    console.log('Se inyectaron 8 prendas urbanas premium con 32 variantes de talles listas para la venta en Baradero.');
  } catch (error) {
    console.error('❌ ERROR FATAL DURANTE EL SEMBRADO:', error.message);
  }
}

seed();
