import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function Cart() {
  const { items, updateQuantity, removeItem, total, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="container py-24 text-center max-w-md mx-auto">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
          <ShoppingBag size={32} className="text-muted-foreground/50" />
        </div>
        <h1 className="text-2xl font-serif font-semibold mb-2">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">Browse our collection and add something beautiful.</p>
        <Link to="/shop">
          <Button size="lg" className="px-8">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-semibold">Shopping Cart</h1>
          <p className="text-sm text-muted-foreground mt-1">{itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart</p>
        </div>
        <Link to="/shop" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
          <ArrowLeft size={14} /> Continue Shopping
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          {/* Table Header */}
          <div className="hidden sm:grid grid-cols-[1fr_auto_auto] gap-4 px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            <span>Product</span>
            <span className="w-28 text-center">Quantity</span>
            <span className="w-20 text-right">Total</span>
          </div>
          <Separator />

          {items.map((item, index) => (
            <div key={index} className="flex gap-4 bg-card rounded-xl p-4 border border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-3">
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.product.id}`} className="font-serif font-medium text-sm hover:text-primary transition-colors line-clamp-1">
                    {item.product.name}
                  </Link>
                  {item.selectedAddons.length > 0 && (
                    <p className="text-xs text-muted-foreground mt-0.5">+ {item.selectedAddons.join(', ')}</p>
                  )}
                  <p className="text-sm text-muted-foreground mt-1">${item.product.price.toFixed(2)} each</p>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-1 bg-muted rounded-lg p-1 w-fit">
                  <button
                    onClick={() => updateQuantity(index, item.quantity - 1)}
                    className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-background transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-sm font-semibold w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(index, item.quantity + 1)}
                    className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-background transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Price & Remove */}
                <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-2">
                  <span className="text-sm font-bold text-foreground">${(item.product.price * item.quantity).toFixed(2)}</span>
                  <button
                    onClick={() => removeItem(index)}
                    className="text-muted-foreground hover:text-destructive transition-colors p-1"
                    aria-label="Remove item"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-xl border border-border/50 shadow-sm p-6 sticky top-24">
            <h2 className="font-serif text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal ({itemCount} items)</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Delivery</span>
                <span className="text-primary font-medium">Free</span>
              </div>
              <Separator />
              <div className="flex justify-between text-base font-bold">
                <span>Total</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>

            <Link to="/checkout" className="block mt-6">
              <Button className="w-full py-6 text-base" size="lg">Proceed to Checkout</Button>
            </Link>

            <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-muted-foreground">
              <ShieldCheck size={14} />
              <span>Secure checkout · Cash on delivery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
