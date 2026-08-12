'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Package,
  ShoppingCart,
  TrendingUp,
  AlertTriangle,
  Plus,
  Search,
  Check,
  RefreshCcw,
  Trash2,
  ExternalLink,
  X,
  LayoutDashboard,
  Upload,
} from 'lucide-react';
import { useAdminStore, type AdminOrder } from '@/store/admin';
import { useProductStore } from '@/store/products';
import type { Product, ProductCategory, ProductSize } from '@/data/products';
import { useUIStore } from '@/store/ui';
import { Logo } from '@/components/ui/Logo';

type Tab = 'inventory' | 'orders';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('inventory');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { orders, updateOrderStatus, loadOrders } = useAdminStore();
  const {
    products,
    updateStock,
    updatePrice,
    toggleSizeAvailability,
    addProduct,
    deleteProduct,
    restockAllLowStock,
    loadProducts,
  } = useProductStore();

  const { addToast } = useUIStore();

  useEffect(() => {
    loadOrders();
    loadProducts();
  }, [loadOrders, loadProducts]);

  // Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalStockUnits = products.reduce((sum, p) => sum + p.stock, 0);
  const lowStockProducts = products.filter((p) => p.stock > 0 && p.stock <= 10);

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#060606] text-white font-sans antialiased selection:bg-white selection:text-black">
      
      {/* ============================================================ */}
      {/* DEDICATED ADMIN TOP NAVBAR */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-50 bg-[#0C0C0C]/90 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          
          {/* BRAND & BADGE */}
          <div className="flex items-center gap-4">
            <Logo height={32} />
            <div className="h-4 w-[1px] bg-neutral-700 hidden sm:block" />
            <span className="px-2.5 py-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Admin Portal
            </span>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">
            <Link
              href="/shop"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white font-medium text-xs rounded-xl transition hover:border-neutral-500"
            >
              Customer Storefront <ExternalLink size={13} />
            </Link>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-black font-bold text-xs rounded-xl hover:bg-neutral-200 transition shadow-sm"
            >
              <Plus size={16} /> Add Product
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* ============================================================ */}
        {/* SUMMARY CARDS */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#121212] border border-neutral-800 rounded-2xl p-5 space-y-1">
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Total Sales</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-white">₹{totalRevenue.toLocaleString('en-IN')}</p>
            <p className="text-xs text-emerald-400 font-medium">From {orders.length} completed orders</p>
          </div>

          <div className="bg-[#121212] border border-neutral-800 rounded-2xl p-5 space-y-1">
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Total Inventory Stock</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-white">{totalStockUnits} Units</p>
            <p className="text-xs text-neutral-400 font-medium">Across {products.length} products</p>
          </div>

          <div className={`bg-[#121212] border rounded-2xl p-5 space-y-1 ${lowStockProducts.length > 0 ? 'border-amber-500/40' : 'border-neutral-800'}`}>
            <div className="flex justify-between items-center">
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Low Stock Items</p>
              {lowStockProducts.length > 0 && (
                <button
                  onClick={() => {
                    restockAllLowStock(25);
                    addToast('Restocked all low stock items to 25 units!', 'success');
                  }}
                  className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-bold rounded-lg hover:bg-amber-500/20"
                >
                  Restock All (+25)
                </button>
              )}
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-white">{lowStockProducts.length}</p>
            <p className="text-xs text-amber-400 font-medium">
              {lowStockProducts.length > 0 ? 'Products with 10 or fewer units' : 'All items well stocked'}
            </p>
          </div>
        </div>

        {/* ============================================================ */}
        {/* NAVIGATION TABS */}
        {/* ============================================================ */}
        <div className="flex gap-2 border-b border-neutral-800 pb-3">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition ${
              activeTab === 'inventory'
                ? 'bg-white text-black'
                : 'text-neutral-400 hover:text-white bg-[#121212] border border-neutral-800'
            }`}
          >
            📦 Products & Inventory ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition ${
              activeTab === 'orders'
                ? 'bg-white text-black'
                : 'text-neutral-400 hover:text-white bg-[#121212] border border-neutral-800'
            }`}
          >
            🚚 Customer Orders ({orders.length})
          </button>
        </div>

        {/* ============================================================ */}
        {/* TAB 1: INVENTORY & STOCK MANAGER */}
        {/* ============================================================ */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            {/* SEARCH & FILTERS BAR */}
            <div className="flex flex-col sm:flex-row gap-3 bg-[#121212] p-4 rounded-2xl border border-neutral-800">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products by name or slug..."
                  className="w-full pl-10 pr-4 py-2.5 bg-black border border-neutral-700 rounded-xl text-sm text-white placeholder-neutral-500 outline-none focus:border-white min-h-[44px]"
                />
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2.5 bg-black border border-neutral-700 rounded-xl text-xs font-bold text-white outline-none focus:border-white min-h-[44px]"
              >
                <option value="ALL">All Categories</option>
                <option value="TEES">Tees</option>
                <option value="HOODIES">Hoodies</option>
                <option value="BOTTOMS">Bottoms</option>
                <option value="ACCESSORIES">Accessories</option>
              </select>
            </div>

            {/* PRODUCT CARDS LIST */}
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <ProductRowItem
                  key={product.id}
                  product={product}
                  onUpdateStock={(stock) => {
                    updateStock(product.id, stock);
                    addToast(`Updated ${product.name} stock to ${stock}`, 'info');
                  }}
                  onUpdatePrice={(price) => {
                    updatePrice(product.id, price);
                    addToast(`Updated ${product.name} price to ₹${price}`, 'info');
                  }}
                  onToggleSize={(size) => toggleSizeAvailability(product.id, size)}
                  onDelete={() => {
                    if (confirm(`Delete ${product.name}?`)) {
                      deleteProduct(product.id);
                      addToast(`Deleted ${product.name}`, 'warning');
                    }
                  }}
                />
              ))}

              {filteredProducts.length === 0 && (
                <div className="p-12 text-center bg-[#121212] border border-neutral-800 rounded-2xl text-neutral-400 text-sm">
                  No products found matching &quot;{searchQuery}&quot;.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: ORDERS MANAGER */}
        {/* ============================================================ */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.map((order) => (
              <SimpleOrderCard
                key={order.id}
                order={order}
                onStatusChange={(status) => {
                  updateOrderStatus(order.id, status);
                  addToast(`Order ${order.id} updated to ${status}`, 'success');
                }}
              />
            ))}
          </div>
        )}
      </main>

      {/* ============================================================ */}
      {/* MODAL: ADD PRODUCT */}
      {/* ============================================================ */}
      {isAddModalOpen && (
        <AddProductModal
          onClose={() => setIsAddModalOpen(false)}
          onAdd={(p) => {
            addProduct(p);
            setIsAddModalOpen(false);
            addToast(`Added product "${p.name}"!`, 'success');
          }}
        />
      )}
    </div>
  );
}

/* ============================================================
   EASY PRODUCT ITEM CARD
   ============================================================ */
function ProductRowItem({
  product,
  onUpdateStock,
  onUpdatePrice,
  onToggleSize,
  onDelete,
}: {
  product: Product;
  onUpdateStock: (stock: number) => void;
  onUpdatePrice: (price: number) => void;
  onToggleSize: (size: ProductSize) => void;
  onDelete: () => void;
}) {
  const [editingPrice, setEditingPrice] = useState(false);
  const [tempPrice, setTempPrice] = useState(product.price.toString());

  const isLow = product.stock > 0 && product.stock <= 10;
  const isOut = product.stock === 0;

  return (
    <div className="bg-[#121212] border border-neutral-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-5">
      {/* LEFT: IMAGE & INFO */}
      <div className="flex items-center gap-4 min-w-[240px]">
        <div className="w-14 h-18 bg-black rounded-xl border border-neutral-800 overflow-hidden shrink-0">
          <img
            src={product.images[0] || '/ed2.jpeg'}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <span className="px-2 py-0.5 text-[10px] font-bold text-neutral-400 bg-neutral-800 rounded">
            {product.category}
          </span>
          <h3 className="font-bold text-white text-base mt-1">{product.name}</h3>
          
          {/* PRICE EDIT */}
          <div className="mt-1 flex items-center gap-2">
            {editingPrice ? (
              <div className="flex items-center gap-1">
                <span className="text-xs text-neutral-400">₹</span>
                <input
                  type="number"
                  value={tempPrice}
                  onChange={(e) => setTempPrice(e.target.value)}
                  className="w-20 px-2 py-1 bg-black border border-white text-white rounded text-xs outline-none"
                />
                <button
                  onClick={() => {
                    onUpdatePrice(Number(tempPrice) || product.price);
                    setEditingPrice(false);
                  }}
                  className="p-1 text-emerald-400 hover:text-emerald-300 font-bold text-xs"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-white">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <button
                  onClick={() => setEditingPrice(true)}
                  className="text-xs text-neutral-400 hover:text-white underline"
                >
                  Edit Price
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MIDDLE: STOCK STEPPER */}
      <div className="flex items-center gap-3">
        <div className="flex items-center bg-black border border-neutral-700 rounded-xl p-1">
          <button
            onClick={() => onUpdateStock(Math.max(0, product.stock - 1))}
            className="w-8 h-8 flex items-center justify-center text-white font-bold text-base hover:bg-neutral-800 rounded-lg"
          >
            -
          </button>
          <span
            className={`px-3 py-1 font-mono font-bold text-sm min-w-[40px] text-center ${
              isOut ? 'text-red-400' : isLow ? 'text-amber-400' : 'text-white'
            }`}
          >
            {product.stock}
          </span>
          <button
            onClick={() => onUpdateStock(product.stock + 1)}
            className="w-8 h-8 flex items-center justify-center text-white font-bold text-base hover:bg-neutral-800 rounded-lg"
          >
            +
          </button>
        </div>

        <button
          onClick={() => onUpdateStock(25)}
          className="px-3 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-xs font-bold rounded-xl transition"
        >
          +25 Restock
        </button>
      </div>

      {/* RIGHT: SIZES & DELETE */}
      <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 border-neutral-800 pt-3 md:pt-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-bold text-neutral-400 mr-1">SIZES:</span>
          {product.sizes.map((sz) => {
            const isAvail = product.availableSizes.includes(sz);
            return (
              <button
                key={sz}
                onClick={() => onToggleSize(sz)}
                className={`px-2 py-1 text-xs font-bold rounded-lg border transition ${
                  isAvail
                    ? 'border-white text-white bg-white/10'
                    : 'border-neutral-800 text-neutral-600 line-through'
                }`}
              >
                {sz}
              </button>
            );
          })}
        </div>

        <button
          onClick={onDelete}
          className="p-2 text-neutral-500 hover:text-red-400 transition ml-2"
          title="Delete Product"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   SIMPLE ORDER CARD
   ============================================================ */
function SimpleOrderCard({
  order,
  onStatusChange,
}: {
  order: AdminOrder;
  onStatusChange: (status: AdminOrder['status']) => void;
}) {
  return (
    <div className="bg-[#121212] border border-neutral-800 rounded-2xl p-5 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-neutral-800 pb-3">
        <div>
          <span className="font-mono font-bold text-base text-white">{order.id}</span>
          <span className="text-xs text-neutral-400 ml-3">{order.createdAt}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-400">Order Status:</span>
          <select
            value={order.status}
            onChange={(e) => onStatusChange(e.target.value as any)}
            className="px-3 py-1.5 bg-black border border-neutral-700 text-xs font-bold text-white rounded-xl outline-none"
          >
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div>
          <p className="font-bold text-white text-sm">{order.customerName}</p>
          <p className="text-neutral-300 mt-0.5">{order.phone} • {order.email}</p>
          <p className="text-neutral-400 mt-1">
            {order.address}, {order.city} - {order.pincode}
          </p>
          <p className="text-emerald-400 font-semibold mt-2">
            Payment: {order.paymentMethod}
          </p>
        </div>

        <div className="bg-black p-3.5 rounded-xl border border-neutral-800 space-y-1.5">
          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
            Items Ordered:
          </p>
          {order.items.map((item) => (
            <div key={item.productId} className="flex justify-between items-center text-xs">
              <span className="text-white">
                {item.name} <span className="text-neutral-400">({item.size}) × {item.quantity}</span>
              </span>
              <span className="font-bold text-white">₹{item.price * item.quantity}</span>
            </div>
          ))}
          <div className="border-t border-neutral-800 pt-2 mt-2 flex justify-between font-bold text-sm text-white">
            <span>Total Paid:</span>
            <span>₹{order.totalAmount.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   ADD PRODUCT MODAL
   ============================================================ */
function AddProductModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (product: Omit<Product, 'id'>) => void;
}) {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState<ProductCategory>('TEES');
  const [price, setPrice] = useState('749');
  const [stock, setStock] = useState('30');
  const [imageUrl, setImageUrl] = useState('/bgrem1.png');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    onAdd({
      name,
      slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
      category,
      price: Number(price),
      compareAtPrice: 899,
      stock: Number(stock) || 0,
      description: 'Heavyweight oversized streetwear tee with signature OUTSIX graphics.',
      details: '240 GSM 100% Super Combed Cotton. High-density screen print.',
      material: '100% Cotton (240 GSM)',
      fit: 'Oversized Drop Shoulder',
      images: [imageUrl, '/bgrem2.png'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      availableSizes: ['S', 'M', 'L', 'XL'],
      badge: 'NEW',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#121212] border border-neutral-700 rounded-2xl w-full max-w-lg p-6 space-y-5 text-sm">
        <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
          <h3 className="text-xl font-bold text-white">Add New Product</h3>
          <button onClick={onClose} className="text-neutral-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-neutral-400 mb-1">
              Product Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
              }}
              placeholder="e.g. OUTSIDE FLAME TEE"
              className="w-full px-4 py-2.5 bg-black border border-neutral-700 rounded-xl text-white outline-none min-h-[44px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-neutral-400 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProductCategory)}
                className="w-full px-4 py-2.5 bg-black border border-neutral-700 rounded-xl text-white outline-none min-h-[44px]"
              >
                <option value="TEES">TEES</option>
                <option value="HOODIES">HOODIES</option>
                <option value="BOTTOMS">BOTTOMS</option>
                <option value="ACCESSORIES">ACCESSORIES</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-400 mb-1">
                Stock Count
              </label>
              <input
                type="number"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full px-4 py-2.5 bg-black border border-neutral-700 rounded-xl text-white outline-none min-h-[44px]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-400 mb-1">
              Price (₹)
            </label>
            <input
              type="number"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2.5 bg-black border border-neutral-700 rounded-xl text-white outline-none min-h-[44px]"
            />
          </div>

          {/* DEVICE PHOTO UPLOADER */}
          <div>
            <label className="block text-xs font-bold text-neutral-400 mb-1">
              PRODUCT PHOTO (UPLOAD FROM DEVICE)
            </label>
            
            <div className="space-y-3">
              <label className="flex items-center justify-center gap-2 p-4 bg-black border border-dashed border-neutral-600 rounded-xl cursor-pointer hover:border-white transition text-xs font-bold text-neutral-300 min-h-[48px]">
                <Upload size={16} />
                <span>Choose Photo from Device / Gallery</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        if (typeof reader.result === 'string') {
                          setImageUrl(reader.result);
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="hidden"
                />
              </label>

              {/* IMAGE PREVIEW */}
              {imageUrl && (
                <div className="flex items-center gap-3 p-2 bg-black border border-neutral-800 rounded-xl">
                  <div className="w-12 h-14 bg-neutral-900 rounded-lg overflow-hidden shrink-0 border border-neutral-700">
                    <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-xs font-bold text-white truncate">Photo Selected</p>
                    <p className="text-[10px] text-neutral-400 font-mono truncate">Ready to attach to product</p>
                  </div>
                </div>
              )}

              {/* OPTIONAL URL OVERRIDE */}
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Or paste image URL / path..."
                className="w-full px-4 py-2 bg-black border border-neutral-800 rounded-xl text-xs text-neutral-400 outline-none focus:border-neutral-600"
              />
            </div>
          </div>

          <div className="pt-3 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-neutral-800 text-neutral-300 font-bold rounded-xl hover:bg-neutral-700 min-h-[44px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 min-h-[44px]"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
