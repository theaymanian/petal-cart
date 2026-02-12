import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Product, Category, Order } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { LogOut, Plus, Pencil, Trash2, Package, Tag, ShoppingBag } from 'lucide-react';

export default function Admin() {
  const { isAuthenticated, login, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-full max-w-sm p-8 bg-card rounded-xl shadow-md">
          <h1 className="text-2xl font-serif font-semibold text-center mb-6">Admin Login</h1>
          {loginError && <p className="text-destructive text-sm text-center mb-4">{loginError}</p>}
          <form onSubmit={e => { e.preventDefault(); if (!login(email, password)) setLoginError('Invalid credentials'); }} className="space-y-4">
            <Input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            <Input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            <Button type="submit" className="w-full">Sign In</Button>
          </form>
        </div>
      </div>
    );
  }

  return <AdminDashboard onLogout={logout} />;
}

type Tab = 'products' | 'categories' | 'orders';

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>('products');
  const [products, setProducts] = useLocalStorage<Product[]>('adam-products', []);
  const [categories, setCategories] = useLocalStorage<Category[]>('adam-categories', []);
  const [orders] = useLocalStorage<Order[]>('adam-orders', []);

  const tabs: { key: Tab; label: string; icon: typeof Package }[] = [
    { key: 'products', label: 'Products', icon: Package },
    { key: 'categories', label: 'Categories', icon: Tag },
    { key: 'orders', label: 'Orders', icon: ShoppingBag },
  ];

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-serif font-semibold">Dashboard</h1>
        <Button variant="outline" size="sm" onClick={onLogout}><LogOut size={16} className="mr-2" /> Logout</Button>
      </div>

      <div className="flex gap-2 mb-8">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === t.key ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            <t.icon size={16} /> {t.label}
          </button>
        ))}
      </div>

      {tab === 'products' && <ProductsTab products={products} setProducts={setProducts} categories={categories} />}
      {tab === 'categories' && <CategoriesTab categories={categories} setCategories={setCategories} />}
      {tab === 'orders' && <OrdersTab orders={orders} />}
    </div>
  );
}

function ProductsTab({ products, setProducts, categories }: {
  products: Product[];
  setProducts: (val: Product[] | ((v: Product[]) => Product[])) => void;
  categories: Category[];
}) {
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  const emptyProduct: Product = { id: '', name: '', description: '', price: 0, categoryId: categories[0]?.id || '', imageUrl: '', addons: [], featured: false };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const product: Product = {
      id: editing?.id || Date.now().toString(),
      name: data.get('name') as string,
      description: data.get('description') as string,
      price: parseFloat(data.get('price') as string),
      categoryId: data.get('categoryId') as string,
      imageUrl: data.get('imageUrl') as string,
      addons: (data.get('addons') as string).split(',').map(s => s.trim()).filter(Boolean),
      featured: data.get('featured') === 'on',
    };

    if (editing?.id) {
      setProducts(prev => prev.map(p => p.id === editing.id ? product : p));
      toast.success('Product updated');
    } else {
      setProducts(prev => [...prev, product]);
      toast.success('Product added');
    }
    setShowForm(false);
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    toast.success('Product deleted');
  };

  if (showForm) {
    const p = editing || emptyProduct;
    return (
      <div className="max-w-lg">
        <h2 className="font-serif text-lg font-semibold mb-4">{editing ? 'Edit' : 'Add'} Product</h2>
        <form onSubmit={handleSave} className="space-y-4">
          <Input name="name" placeholder="Product Name" defaultValue={p.name} required />
          <Textarea name="description" placeholder="Description" defaultValue={p.description} required />
          <Input name="price" type="number" step="0.01" placeholder="Price" defaultValue={p.price || ''} required />
          <select name="categoryId" defaultValue={p.categoryId} className="w-full border border-input rounded-lg px-3 py-2 text-sm bg-background" required>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <Input name="imageUrl" placeholder="Image URL (R2 link)" defaultValue={p.imageUrl} required />
          <Input name="addons" placeholder="Add-ons (comma separated)" defaultValue={p.addons.join(', ')} />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="featured" defaultChecked={p.featured} /> Featured
          </label>
          <div className="flex gap-2">
            <Button type="submit">{editing ? 'Update' : 'Add'} Product</Button>
            <Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditing(null); }}>Cancel</Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <Button onClick={() => { setEditing(null); setShowForm(true); }} className="mb-6"><Plus size={16} className="mr-2" /> Add Product</Button>
      <div className="space-y-3">
        {products.map(p => (
          <div key={p.id} className="flex items-center gap-4 bg-card rounded-xl p-4 shadow-sm">
            <img src={p.imageUrl} alt={p.name} className="w-14 h-14 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm truncate">{p.name}</h3>
              <p className="text-xs text-muted-foreground">${p.price} · {categories.find(c => c.id === p.categoryId)?.name}</p>
            </div>
            <div className="flex gap-1">
              <button onClick={() => { setEditing(p); setShowForm(true); }} className="p-2 hover:text-primary"><Pencil size={16} /></button>
              <button onClick={() => handleDelete(p.id)} className="p-2 hover:text-destructive"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CategoriesTab({ categories, setCategories }: {
  categories: Category[];
  setCategories: (val: Category[] | ((v: Category[]) => Category[])) => void;
}) {
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSave = () => {
    if (!name.trim()) return;
    if (editingId) {
      setCategories(prev => prev.map(c => c.id === editingId ? { ...c, name: name.trim() } : c));
      toast.success('Category updated');
    } else {
      setCategories(prev => [...prev, { id: name.trim().toLowerCase().replace(/\s+/g, '-'), name: name.trim() }]);
      toast.success('Category added');
    }
    setName('');
    setEditingId(null);
  };

  return (
    <div className="max-w-md">
      <div className="flex gap-2 mb-6">
        <Input
          placeholder="Category name"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSave()}
        />
        <Button onClick={handleSave}>{editingId ? 'Update' : 'Add'}</Button>
        {editingId && <Button variant="outline" onClick={() => { setEditingId(null); setName(''); }}>Cancel</Button>}
      </div>
      <div className="space-y-2">
        {categories.map(c => (
          <div key={c.id} className="flex items-center justify-between bg-card rounded-lg p-3 shadow-sm">
            <span className="text-sm font-medium">{c.name}</span>
            <div className="flex gap-1">
              <button onClick={() => { setEditingId(c.id); setName(c.name); }} className="p-1.5 hover:text-primary"><Pencil size={14} /></button>
              <button onClick={() => { setCategories(prev => prev.filter(x => x.id !== c.id)); toast.success('Deleted'); }} className="p-1.5 hover:text-destructive"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrdersTab({ orders }: { orders: Order[] }) {
  if (orders.length === 0) return <p className="text-muted-foreground">No orders yet.</p>;

  return (
    <div className="space-y-4">
      {orders.slice().reverse().map(order => (
        <div key={order.id} className="bg-card rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-medium text-sm">{order.customer.name}</h3>
              <p className="text-xs text-muted-foreground">{order.customer.phone} · {order.customer.address}</p>
            </div>
            <span className="text-sm font-semibold text-primary">${order.total}</span>
          </div>
          <div className="text-xs text-muted-foreground space-y-0.5">
            {order.items.map((item, i) => (
              <p key={i}>{item.product.name} × {item.quantity}{item.selectedAddons.length > 0 && ` (${item.selectedAddons.join(', ')})`}</p>
            ))}
          </div>
          {order.customer.deliveryNote && <p className="text-xs italic text-muted-foreground mt-2">Note: {order.customer.deliveryNote}</p>}
          <p className="text-xs text-muted-foreground mt-2">{new Date(order.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
