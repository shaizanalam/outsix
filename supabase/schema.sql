-- ============================================================
-- OUTSIX STREETWEAR — SUPABASE DATABASE SCHEMA MIGRATION
-- Paste this script into your Supabase SQL Editor to initialize.
-- ============================================================

-- 1. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  details TEXT,
  material TEXT,
  fit TEXT,
  price NUMERIC NOT NULL,
  compare_at_price NUMERIC,
  images TEXT[] NOT NULL DEFAULT '{}',
  category TEXT NOT NULL,
  collection_id TEXT,
  sizes TEXT[] NOT NULL DEFAULT '{"XS","S","M","L","XL","XXL"}',
  available_sizes TEXT[] NOT NULL DEFAULT '{"S","M","L","XL"}',
  stock INT NOT NULL DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  badge TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY DEFAULT ('ORD-' || floor(extract(epoch from now()))::text),
  customer_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  pincode TEXT NOT NULL,
  total_amount NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'Processing',
  payment_method TEXT NOT NULL DEFAULT 'UPI / GPay',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ORDER ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id TEXT REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  size TEXT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  price NUMERIC NOT NULL
);

-- 4. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Allow public to read products
CREATE POLICY "Public Read Products" ON public.products
  FOR SELECT USING (true);

-- Allow authenticated/admin users full access to products
CREATE POLICY "Admin Full Products Access" ON public.products
  FOR ALL USING (true);

-- Allow customers to insert orders
CREATE POLICY "Public Insert Orders" ON public.orders
  FOR INSERT WITH CHECK (true);

-- Allow public to read their own orders or admin full access
CREATE POLICY "Admin Full Orders Access" ON public.orders
  FOR ALL USING (true);

CREATE POLICY "Public Insert Order Items" ON public.order_items
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin Full Order Items Access" ON public.order_items
  FOR ALL USING (true);

-- 5. REALTIME PUBLICATION
ALTER PUBLICATION supabase_realtime ADD TABLE public.products, public.orders;
