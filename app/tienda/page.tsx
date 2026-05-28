import { supabase } from '@/lib/supabase';
import StoreCatalog from '@/components/StoreCatalog';

export const dynamic = 'force-dynamic';

export default async function TiendaPage() {
  const { data: products } = await supabase
    .from('products')
    .select('*, product_variants(*)')
    .order('created_at', { ascending: false });

  return <StoreCatalog initialProducts={products || []} />;
}
