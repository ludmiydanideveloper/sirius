// EMULADOR DE SUPABASE DE ARCHIVO LOCAL (FALLBACK LOCALHOST)
// Esta clase permite que tu tienda Sirius Studio funcione al 100% de manera local y offline
// sin costos y sin depender de una base de datos de pago remota que esté pausada.
// Si deseas reactivar Supabase en producción en el futuro, solo des-comentá las primeras líneas.

/*
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
*/

// ==========================================
// BASE DE DATOS LOCAL ESTÁTICA
// ==========================================

const LOCAL_CATEGORIES = [
  { id: 'REMERAS', name: 'Remeras' },
  { id: 'HOODIES', name: 'Hoodies' },
  { id: 'PANTALONES', name: 'Pantalones' },
  { id: 'CAMPERAS', name: 'Camperas' },
  { id: 'ACCESORIOS', name: 'Accesorios' }
];

const LOCAL_PRODUCTS: any[] = [
  {
    id: 'prod-01',
    name: 'SIRIUS OVER TEE CLASSIC',
    category: 'REMERAS',
    base_price: 24500,
    description: 'Remera de calce oversize boxy confeccionada en jersey de algodón peinado premium de 240g. Cuenta con cuello de rib pesado de alta densidad de 3cm y tapacosturas de hombro a hombro reforzado. Una silueta rígida icónica que no pierde forma.',
    image_featured: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000',
    created_at: '2026-05-26T22:00:00.000Z',
    color: 'BLACK',
    product_variants: [
      { id: 'v-1', size: 'S', color: 'BLACK', stock: 5 },
      { id: 'v-2', size: 'M', color: 'BLACK', stock: 8 },
      { id: 'v-3', size: 'L', color: 'BLACK', stock: 3 },
      { id: 'v-4', size: 'XL', color: 'BLACK', stock: 6 }
    ]
  },
  {
    id: 'prod-02',
    name: 'SIRIUS TECH HEAVY TEE',
    category: 'REMERAS',
    base_price: 26800,
    description: 'Remera de manga media y hombros ultra caídos en punto grueso de 260g teñido en frío. Estampa tipográfica "SIRIUS LAB" en serigrafía al tacto cero. Algodón premium pre-lavado para evitar cualquier encogimiento.',
    image_featured: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1000',
    created_at: '2026-05-26T21:00:00.000Z',
    color: 'GRAY',
    product_variants: [
      { id: 'v-5', size: 'S', color: 'GRAY', stock: 4 },
      { id: 'v-6', size: 'M', color: 'GRAY', stock: 7 },
      { id: 'v-7', size: 'L', color: 'GRAY', stock: 2 },
      { id: 'v-8', size: 'XL', color: 'GRAY', stock: 5 }
    ]
  },
  {
    id: 'prod-03',
    name: 'SIRIUS ARCHIVAL HOODIE',
    category: 'HOODIES',
    base_price: 45000,
    description: 'Buzo con capucha confeccionado en Frisa Invisible pesada de 400g/m². Capucha anatómica de doble paño rígida y pesada sin cordones para un aspecto limpio. Costuras reforzadas tipo flatlock en sisas y puños anchos de rib elástico.',
    image_featured: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000',
    created_at: '2026-05-26T20:00:00.000Z',
    color: 'BLACK',
    product_variants: [
      { id: 'v-9', size: 'S', color: 'BLACK', stock: 3 },
      { id: 'v-10', size: 'M', color: 'BLACK', stock: 6 },
      { id: 'v-11', size: 'L', color: 'BLACK', stock: 9 },
      { id: 'v-12', size: 'XL', color: 'BLACK', stock: 2 }
    ]
  },
  {
    id: 'prod-04',
    name: 'SIRIUS ZIP-UP HEAVY SWEATSHIRT',
    category: 'HOODIES',
    base_price: 48500,
    description: 'Buzo con cierre metálico completo YKK de carro doble. Confeccionado en algodón frisado de alto gramaje con bolsillo canguro dividido. Capucha amplia y calce cuadrado relajado desarrollado para el uso diario urbano.',
    image_featured: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000',
    created_at: '2026-05-26T19:00:00.000Z',
    color: 'CHARCOAL',
    product_variants: [
      { id: 'v-13', size: 'S', color: 'CHARCOAL', stock: 6 },
      { id: 'v-14', size: 'M', color: 'CHARCOAL', stock: 4 },
      { id: 'v-15', size: 'L', color: 'CHARCOAL', stock: 5 },
      { id: 'v-16', size: 'XL', color: 'CHARCOAL', stock: 8 }
    ]
  },
  {
    id: 'prod-05',
    name: 'SIRIUS CARGO GABARDINE PANTS',
    category: 'PANTALONES',
    base_price: 52000,
    description: 'Pantalón cargo de gabardina pesada de 10oz ultra resistente al roce. Costuras triples de refuerzo en entrepierna y laterales. Seis bolsillos funcionales: dos laterales fuelle con solapa y botón oculto, dos traseros y dos delanteros profundos.',
    image_featured: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1000',
    created_at: '2026-05-26T18:00:00.000Z',
    color: 'KHAKI',
    product_variants: [
      { id: 'v-17', size: 'S', color: 'KHAKI', stock: 2 },
      { id: 'v-18', size: 'M', color: 'KHAKI', stock: 5 },
      { id: 'v-19', size: 'L', color: 'KHAKI', stock: 8 },
      { id: 'v-20', size: 'XL', color: 'KHAKI', stock: 4 }
    ]
  },
  {
    id: 'prod-06',
    name: 'SIRIUS RAW WIDE DENIM',
    category: 'PANTALONES',
    base_price: 55000,
    description: 'Jeans de calce ancho (loose fit) confeccionados en denim rígido premium de 12oz. Lavado crudo ("raw denim") que irá desgastando y tomando la forma de tu cuerpo con el uso. Botonería y remaches de bronce grabados Sirius.',
    image_featured: 'https://images.unsplash.com/photo-1582552938357-32b906df40cd?q=80&w=1000',
    created_at: '2026-05-26T17:00:00.000Z',
    color: 'INDIGO',
    product_variants: [
      { id: 'v-21', size: 'S', color: 'INDIGO', stock: 5 },
      { id: 'v-22', size: 'M', color: 'INDIGO', stock: 8 },
      { id: 'v-23', size: 'L', color: 'INDIGO', stock: 3 },
      { id: 'v-24', size: 'XL', color: 'INDIGO', stock: 2 }
    ]
  },
  {
    id: 'prod-07',
    name: 'SIRIUS TECHNICAL WIND JACKET',
    category: 'CAMPERAS',
    base_price: 68000,
    description: 'Campera cortaviento técnica con recubrimiento de teflón repelente al agua. Interior forrado en microfleece de alto rendimiento térmico. Cierres impermeables thermosellados, puños regulables con velcro de agarre fuerte y capucha ajustable.',
    image_featured: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=1000',
    created_at: '2026-05-26T16:00:00.000Z',
    color: 'BLACK',
    product_variants: [
      { id: 'v-25', size: 'S', color: 'BLACK', stock: 4 },
      { id: 'v-26', size: 'M', color: 'BLACK', stock: 6 },
      { id: 'v-27', size: 'L', color: 'BLACK', stock: 2 },
      { id: 'v-28', size: 'XL', color: 'BLACK', stock: 3 }
    ]
  },
  {
    id: 'prod-08',
    name: 'SIRIUS CORE RIB BEANIE',
    category: 'ACCESORIOS',
    base_price: 15000,
    description: 'Gorro beanie tejido en punto canalé inglés de alta densidad. Confeccionado en hilado acrílico premium doble hilado, sumamente suave al tacto y elástico sin deformar. Detalle de etiqueta Sirius bordada a tono en la vuelta.',
    image_featured: 'https://images.unsplash.com/photo-1576871337622-98d48d4353d3?q=80&w=1000',
    created_at: '2026-05-26T15:00:00.000Z',
    color: 'BLACK',
    product_variants: [
      { id: 'v-29', size: 'U', color: 'BLACK', stock: 9 }
    ]
  }
];

// ==========================================
// EMULADOR QUERY BUILDER (COMPATIBLE AWAIT/THEN)
// ==========================================

class MockSupabaseQuery {
  private table: string;
  private data: any[];

  constructor(table: string, data: any[]) {
    this.table = table;
    this.data = JSON.parse(JSON.stringify(data)); // deep copy
  }

  select(queryStr?: string) {
    // Si seleccionan variants uniendo en productos, el array ya viene pre-cargado
    return this;
  }

  order(field: string, options?: { ascending: boolean }) {
    if (field === 'created_at') {
      const asc = options?.ascending ?? true;
      this.data.sort((a, b) => {
        const timeA = new Date(a.created_at || 0).getTime();
        const timeB = new Date(b.created_at || 0).getTime();
        return asc ? timeA - timeB : timeB - timeA;
      });
    }
    return this;
  }

  eq(field: string, value: any) {
    if (field === 'id') {
      this.data = this.data.filter(item => item.id === value);
    } else if (field === 'category') {
      this.data = this.data.filter(item => item.category?.toUpperCase() === String(value).toUpperCase());
    } else if (field === 'product_id') {
      // Filtrar por ID de producto (útil si se buscan variantes directamente)
      this.data = this.data.filter(item => item.product_id === value);
    }
    return this;
  }

  single() {
    const item = this.data[0] || null;
    return {
      data: item,
      error: item ? null : { message: 'Elemento no encontrado en base de datos local emulada.' }
    };
  }

  insert(values: any[]) {
    if (this.table === 'products') {
      const inserted = {
        id: `prod-mock-${Math.floor(Math.random() * 90000 + 10000)}`,
        name: values[0].name,
        category: values[0].category,
        base_price: Number(values[0].base_price),
        description: values[0].description,
        image_featured: values[0].image_featured,
        created_at: new Date().toISOString(),
        product_variants: []
      };
      
      LOCAL_PRODUCTS.unshift(inserted);
      this.data = [inserted];
    } else if (this.table === 'product_variants') {
      const productId = values[0].product_id;
      const targetProduct = LOCAL_PRODUCTS.find(p => p.id === productId);
      if (targetProduct) {
        const formatted = values.map((v, i) => ({
          id: `v-mock-${Math.floor(Math.random() * 90000) + i}`,
          ...v
        }));
        targetProduct.product_variants = formatted;
      }
      this.data = values;
    }
    return this;
  }

  // Método then para actuar como una Promesa nativa ante el operador await
  async then(onfulfilled?: (value: any) => any) {
    const res = { data: this.data, error: null };
    return onfulfilled ? onfulfilled(res) : res;
  }
}

// ==========================================
// OBJETO EMULADOR PRINCIPAL (supabase)
// ==========================================

export const supabase = {
  from: (table: string) => {
    if (table === 'products') {
      return new MockSupabaseQuery(table, LOCAL_PRODUCTS);
    }
    if (table === 'categories') {
      return new MockSupabaseQuery(table, LOCAL_CATEGORIES);
    }
    if (table === 'product_variants') {
      // Extraemos todas las variantes de todos los productos
      const allVariants = LOCAL_PRODUCTS.flatMap(p => p.product_variants || []);
      return new MockSupabaseQuery(table, allVariants);
    }
    // Fallback general
    return new MockSupabaseQuery(table, []);
  },
  storage: {
    from: (bucketName: string) => ({
      upload: async (fileName: string, file: any) => {
        // Simulamos subida exitosa
        return { data: { path: fileName }, error: null };
      },
      getPublicUrl: (fileName: string) => {
        // Simulamos link de retorno usando una foto de stock premium
        return { data: { publicUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=600' } };
      }
    })
  }
};