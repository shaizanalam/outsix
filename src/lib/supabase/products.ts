import { supabaseFetch, isSupabaseConfigured } from './client';
import { PRODUCTS, type Product } from '@/data/products';

export async function fetchProductsFromSupabase(): Promise<Product[]> {
  if (!isSupabaseConfigured) return PRODUCTS;

  const { data, error } = await supabaseFetch<any[]>('/rest/v1/products?select=*&order=created_at.desc');
  if (error || !data || data.length === 0) {
    return PRODUCTS;
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
    images: p.images || ['/ed2.jpeg'],
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
  await supabaseFetch(`/rest/v1/products?id=eq.${productId}`, {
    method: 'PATCH',
    body: JSON.stringify({ stock }),
  });
}

export async function updateProductPriceInSupabase(productId: string, price: number) {
  if (!isSupabaseConfigured) return;
  await supabaseFetch(`/rest/v1/products?id=eq.${productId}`, {
    method: 'PATCH',
    body: JSON.stringify({ price }),
  });
}

export async function createProductInSupabase(product: Omit<Product, 'id'>) {
  if (!isSupabaseConfigured) return;
  await supabaseFetch('/rest/v1/products', {
    method: 'POST',
    body: JSON.stringify({
      slug: product.slug,
      name: product.name,
      description: product.description,
      details: product.details,
      material: product.material,
      fit: product.fit,
      price: product.price,
      compare_at_price: product.compareAtPrice,
      images: product.images,
      category: product.category,
      collection_id: product.collection,
      sizes: product.sizes,
      available_sizes: product.availableSizes,
      stock: product.stock,
      badge: product.badge,
    }),
  });
}

export async function deleteProductFromSupabase(productId: string) {
  if (!isSupabaseConfigured) return;
  await supabaseFetch(`/rest/v1/products?id=eq.${productId}`, {
    method: 'DELETE',
  });
}
