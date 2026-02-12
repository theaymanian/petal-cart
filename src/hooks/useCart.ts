import { useLocalStorage } from './useLocalStorage';
import { CartItem, Product } from '@/types';
import { toast } from 'sonner';

export function useCart() {
  const [items, setItems] = useLocalStorage<CartItem[]>('adam-cart', []);

  const addToCart = (product: Product, selectedAddons: string[] = []) => {
    setItems(prev => {
      const existing = prev.find(
        i => i.product.id === product.id && JSON.stringify(i.selectedAddons) === JSON.stringify(selectedAddons)
      );
      if (existing) {
        return prev.map(i =>
          i === existing ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1, selectedAddons }];
    });
    toast.success(`${product.name} added to cart`);
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter((_, i) => i !== index));
    } else {
      setItems(prev => prev.map((item, i) => i === index ? { ...item, quantity } : item));
    }
  };

  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return { items, addToCart, updateQuantity, removeItem, clearCart, total, itemCount };
}
