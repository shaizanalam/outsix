-- ============================================================
-- OUTSIX STREETWEAR — INITIAL SEED DATA FOR SUPABASE
-- Run this in Supabase SQL Editor to populate initial products.
-- ============================================================

INSERT INTO public.products (slug, name, description, details, material, fit, price, compare_at_price, images, category, stock, featured, badge)
VALUES 
  ('outside-flame-tee', 'OUTSIDE FLAME TEE', 'Heavyweight oversized graphic tee with signature flame motif.', '240 GSM 100% Super Combed Cotton. High-density screen print.', '100% Cotton (240 GSM)', 'Oversized Drop Shoulder', 749, 899, ARRAY['/bgrem1.png', '/bgrem2.png'], 'TEES', 48, true, 'SALE'),
  ('void-skull-tee', 'VOID SKULL TEE', 'Minimalist void skull graphic tee with distress wash finish.', '240 GSM 100% Super Combed Cotton.', '100% Cotton (240 GSM)', 'Oversized Drop Shoulder', 649, 899, ARRAY['/bgrem2.png', '/bgrem1.png'], 'TEES', 22, true, 'NEW'),
  ('shark-mark-tee', 'SHARK MARK TEE', 'Distressed vintage wash tee with custom shark graphic on back.', '240 GSM 100% Super Combed Cotton.', '100% Cotton (240 GSM)', 'Oversized Drop Shoulder', 749, 899, ARRAY['/ed2.jpeg', '/eg1.jpeg'], 'TEES', 35, true, 'BESTSELLER'),
  ('no-signal-tee', 'NO SIGNAL TEE', 'Minimalist chest logo print with bold back graphic.', '240 GSM 100% Super Combed Cotton.', '100% Cotton (240 GSM)', 'Oversized Drop Shoulder', 599, 799, ARRAY['/eg1.jpeg', '/ed2.jpeg'], 'TEES', 18, false, 'SALE'),
  ('outside-form-tee', 'OUTSIDE FORM TEE', 'Abstract geometric form graphic tee.', '240 GSM 100% Super Combed Cotton.', '100% Cotton (240 GSM)', 'Oversized Drop Shoulder', 549, 749, ARRAY['/ed2.jpeg', '/eg1.jpeg'], 'TEES', 60, false, 'NEW'),
  ('blackout-graphic-tee', 'BLACKOUT GRAPHIC TEE', 'Monochrome blackout print on premium cotton.', '240 GSM 100% Super Combed Cotton.', '100% Cotton (240 GSM)', 'Oversized Drop Shoulder', 799, 999, ARRAY['/eg1.jpeg', '/ed2.jpeg'], 'TEES', 8, false, 'SALE'),
  ('heavyweight-black-hoodie', 'HEAVYWEIGHT BLACK HOODIE', '400 GSM fleece hoodie with double-layer hood and kangaroo pocket.', '400 GSM 100% Cotton Fleece. Ribbed cuffs and hem.', '100% Cotton Fleece (400 GSM)', 'Oversized Boxy Fit', 1499, 1999, ARRAY['/ed2.jpeg', '/eg1.jpeg'], 'HOODIES', 30, true, 'BESTSELLER'),
  ('void-cyber-hoodie', 'VOID CYBER HOODIE', 'Cyberpunk graphic hoodie with reflective chest print.', '400 GSM 100% Cotton Fleece.', '100% Cotton Fleece (400 GSM)', 'Oversized Boxy Fit', 1699, 2199, ARRAY['/eg1.jpeg', '/ed2.jpeg'], 'HOODIES', 15, false, 'NEW'),
  ('cargo-utility-pants', 'CARGO UTILITY PANTS', 'Tactical cargo pants with 6 pockets and adjustable ankle cuffs.', '280 GSM Cotton Twill. Reinforced knee stitching.', '100% Cotton Twill', 'Relaxed Tapered Fit', 1299, 1699, ARRAY['/ed2.jpeg', '/eg1.jpeg'], 'BOTTOMS', 20, true, 'BESTSELLER'),
  ('outsix-trucker-hat', 'OUTSIX TRUCKER HAT', 'Classic foam front trucker hat with embroidered shark mark.', 'Mesh back with snapback closure.', 'Cotton/Polyester Mesh', 'Adjustable Snapback', 399, 599, ARRAY['/eg1.jpeg', '/ed2.jpeg'], 'ACCESSORIES', 50, false, 'SALE')
ON CONFLICT (slug) DO UPDATE 
SET stock = EXCLUDED.stock, price = EXCLUDED.price;
