import { supabaseFetch, isSupabaseConfigured } from './client';
import type { AdminOrder } from '@/store/admin';

type DbOrderItemRecord = {
  product_id: string;
  product_name: string;
  size: string;
  quantity: number;
  price: number;
};

type DbOrderRecord = {
  id: string;
  customer_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  total_amount: number;
  status: AdminOrder['status'];
  payment_method: string;
  created_at: string;
  order_items?: DbOrderItemRecord[];
};

export async function createOrderInSupabase(orderData: Omit<AdminOrder, 'id' | 'createdAt'>) {
  if (!isSupabaseConfigured) return null;

  const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
  const { error } = await supabaseFetch('/rest/v1/orders', {
    method: 'POST',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify({
      id: orderId,
      customer_name: orderData.customerName,
      email: orderData.email,
      phone: orderData.phone,
      address: orderData.address,
      city: orderData.city,
      pincode: orderData.pincode,
      total_amount: orderData.totalAmount,
      status: orderData.status || 'Processing',
      payment_method: orderData.paymentMethod || 'UPI / GPay',
    }),
  });

  if (error) return null;

  if (orderData.items && orderData.items.length > 0) {
    const itemsToInsert = orderData.items.map((item) => ({
      order_id: orderId,
      product_id: item.productId,
      product_name: item.name,
      size: item.size,
      quantity: item.quantity,
      price: item.price,
    }));

    await supabaseFetch('/rest/v1/order_items', {
      method: 'POST',
      body: JSON.stringify(itemsToInsert),
    });
  }

  return orderId;
}

export async function fetchOrdersFromSupabase(): Promise<AdminOrder[] | null> {
  if (!isSupabaseConfigured) return null;

  const { data, error } = await supabaseFetch<DbOrderRecord[]>('/rest/v1/orders?select=*,order_items(*)&order=created_at.desc');
  if (error || !data) return null;

  return data.map((o: DbOrderRecord) => ({
    id: o.id,
    customerName: o.customer_name,
    email: o.email,
    phone: o.phone,
    address: o.address,
    city: o.city,
    pincode: o.pincode,
    totalAmount: Number(o.total_amount),
    status: o.status,
    paymentMethod: o.payment_method,
    createdAt: new Date(o.created_at).toLocaleString('en-IN'),
    items: (o.order_items || []).map((it: DbOrderItemRecord) => ({
      productId: it.product_id,
      name: it.product_name,
      size: it.size,
      quantity: it.quantity,
      price: Number(it.price),
      image: '/bgrem1.png',
    })),
  }));
}

export async function updateOrderStatusInSupabase(orderId: string, status: AdminOrder['status']) {
  if (!isSupabaseConfigured) return;
  await supabaseFetch(`/rest/v1/orders?id=eq.${orderId}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}
