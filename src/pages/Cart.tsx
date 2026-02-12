import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';

export default function Cart() {
  const { items, updateQuantity, removeItem, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="container py-20 text-center">
        <ShoppingBag size={48} className="mx-auto text-muted-foreground/40 mb-4" />
        <h1 className="text-2xl font-serif font-semibold mb-2">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-6">Browse our collection and add something beautiful.</p>
        <Link to="/shop">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-serif font-semibold mb-8">Shopping Cart</h1>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex gap-4 bg-card rounded-xl p-4 shadow-sm">
            <img src={item.product.imageUrl} alt={item.product.name} className="w-20 h-20 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
              <h3 className="font-serif font-medium text-sm truncate">{item.product.name}</h3>
              {item.selectedAddons.length > 0 && (
                <p className="text-xs text-muted-foreground mt-0.5">+ {item.selectedAddons.join(', ')}</p>
              )}
              <p className="text-sm font-semibold text-primary mt-1">${item.product.price}</p>
              <div className="flex items-center gap-2 mt-2">
                <button onClick={() => updateQuantity(index, item.quantity - 1)} className="w-7 h-7 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground/10">
                  <Minus size={14} />
                </button>
                <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                <button onClick={() => updateQuantity(index, item.quantity + 1)} className="w-7 h-7 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground/10">
                  <Plus size={14} />
                </button>
              </div>
            </div>
            <div className="flex flex-col items-end justify-between">
              <button onClick={() => removeItem(index)} className="text-muted-foreground hover:text-destructive transition-colors">
                <Trash2 size={16} />
              </button>
              <span className="text-sm font-semibold">${item.product.price * item.quantity}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-border pt-6 flex items-center justify-between">
        <span className="text-lg font-serif font-semibold">Total</span>
        <span className="text-2xl font-bold text-primary">${total}</span>
      </div>

      <Link to="/checkout" className="block mt-6">
        <Button className="w-full py-6 text-base" size="lg">Proceed to Checkout</Button>
      </Link>
    </div>
  );
}
