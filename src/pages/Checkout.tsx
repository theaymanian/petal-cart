import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Order, CustomerInfo } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const FORMSPREE_ORDER_URL = 'https://formspree.io/f/YOUR_ORDER_FORM_ID';

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const [orders, setOrders] = useLocalStorage<Order[]>('adam-orders', []);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);

    const customer: CustomerInfo = {
      name: data.get('name') as string,
      phone: data.get('phone') as string,
      address: data.get('address') as string,
      deliveryNote: data.get('note') as string || '',
    };

    const order: Order = {
      id: Date.now().toString(),
      items: [...items],
      total,
      customer,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };

    // Save to localStorage
    setOrders(prev => [...prev, order]);

    // Submit to Formspree
    try {
      await fetch(FORMSPREE_ORDER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...customer,
          total: `$${total}`,
          items: items.map(i => `${i.product.name} x${i.quantity}${i.selectedAddons.length ? ` (${i.selectedAddons.join(', ')})` : ''}`).join('; '),
        }),
      });
    } catch {
      // silently fail, order is saved locally
    }

    clearCart();
    toast.success('Order placed successfully!');
    navigate('/');
    setLoading(false);
  };

  return (
    <div className="container py-12 max-w-lg mx-auto">
      <h1 className="text-3xl font-serif font-semibold mb-2">Checkout</h1>
      <p className="text-muted-foreground mb-8">Cash on Delivery — fill in your details below.</p>

      <div className="bg-card rounded-xl p-5 shadow-sm mb-8">
        <h2 className="font-serif text-sm font-semibold mb-3">Order Summary</h2>
        {items.map((item, i) => (
          <div key={i} className="flex justify-between text-sm py-1">
            <span>{item.product.name} × {item.quantity}</span>
            <span className="font-medium">${item.product.price * item.quantity}</span>
          </div>
        ))}
        <div className="border-t border-border mt-3 pt-3 flex justify-between font-semibold">
          <span>Total</span>
          <span className="text-primary">${total}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="name" placeholder="Full Name" required />
        <Input name="phone" placeholder="Phone Number" required />
        <Input name="address" placeholder="Delivery Address" required />
        <Textarea name="note" placeholder="Delivery Note (optional)" rows={3} />
        <Button type="submit" className="w-full py-6 text-base" size="lg" disabled={loading}>
          {loading ? 'Placing Order...' : 'Place Order (COD)'}
        </Button>
      </form>
    </div>
  );
}
