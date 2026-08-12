import { supabaseFetch, isSupabaseConfigured } from './client';
import { PRODUCTS, type Product } from '@/data/products';

const isUUID = (str: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);

export async function fetchProductsFromSupabase(): Promise<Product[] | null> {
  if (!isSupabaseConfigured) return null;

  const { data, error } = await supabaseFetch<any[]>('/rest/v1/products?select=*&order=created_at.desc');
  if (error || !data) {
    return null;
  }

  return data.map((p: any) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    description: p.description || '',
    details: p.details || '',
    material: p.material || '',
    fit: p.fit || '',
    price: Number(p.price),
    compareAtPrice: p.compare_at_price ? Number(p.compare_at_price) : undefined,
    images: p.images && p.images.length > 0 ? p.images : ['/ed2.jpeg'],
    category: p.category,
    collection: p.collection_id,
    sizes: p.sizes || ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    availableSizes: p.available_sizes || ['S', 'M', 'L', 'XL'],
    stock: Number(p.stock),
    featured: p.featured || false,
    badge: p.badge,
  }));
}

export async function updateProductStockInSupabase(productId: string, stock: number) {
  if (!isSupabaseConfigured) return;
  const param = isUUID(productId) ? `id=eq.${productId}` : `slug=eq.${productId}`;
  await supabaseFetch(`/rest/v1/products?${param}`, {
    method: 'PATCH',
    body: JSON.stringify({ stock }),
  });
}

export async function updateProductPriceInSupabase(productId: string, price: number) {
  if (!isSupabaseConfigured) return;
  const param = isUUID(productId) ? `id=eq.${productId}` : `slug=eq.${productId}`;
  await supabaseFetch(`/rest/v1/products?${param}`, {
    method: 'PATCH',
    body: JSON.stringify({ price }),
  });
}

export async function createProductInSupabase(product: Omit<Product, 'id'>) {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabaseFetch('/rest/v1/products', {
    method: 'POST',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify({
      slug: product.slug || `prod-${Date.now()}`,
      name: product.name,
      description: product.description || 'Heavyweight street tee',
      details: product.details || '240 GSM 100% Super Combed Cotton',
      material: product.material || '100% Cotton',
      fit: product.fit || 'Oversized Drop Shoulder',
      price: product.price,
      compare_at_price: product.compareAtPrice || null,
      images: product.images && product.images.length > 0 ? product.images : ['/bgrem1.png'],
      category: product.category,
      collection_id: product.collection || 'drop-01',
      sizes: product.sizes || ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      available_sizes: product.availableSizes || ['S', 'M', 'L', 'XL'],
      stock: product.stock,
      badge: product.badge || 'NEW',
    }),
  });
  return data;
}

export async function deleteProductFromSupabase(productId: string) {
  if (!isSupabaseConfigured) return;
  const param = isUUID(productId) ? `id=eq.${productId}` : `slug=eq.${productId}`;
  await supabaseFetch(`/rest/v1/products?${param}`, {
    method: 'DELETE',
  });
}
