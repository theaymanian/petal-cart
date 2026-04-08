import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useCart } from '@/hooks/useCart';
import { Product, Category } from '@/types';
import { defaultProducts, defaultCategories } from '@/data/seed';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

export default function ProductDetail() {
  const { id } = useParams();
  const [products] = useLocalStorage<Product[]>('adam-products', defaultProducts);
  const [categories] = useLocalStorage<Category[]>('adam-categories', defaultCategories);
  const { addToCart } = useCart();
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const product = products.find(p => p.id === id);
  if (!product) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground">Product not found.</p>
        <Link to="/shop" className="text-primary mt-4 inline-block">Back to Shop</Link>
      </div>
    );
  }

  const category = categories.find(c => c.id === product.categoryId);

  const toggleAddon = (addon: string) => {
    setSelectedAddons(prev =>
      prev.includes(addon) ? prev.filter(a => a !== addon) : [...prev, addon]
    );
  };

  return (
    <div className="container py-10">
      <Link to="/shop" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
        <ArrowLeft size={16} /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="aspect-square rounded-xl overflow-hidden bg-muted">
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col justify-center">
          {category && <span className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{category.name}</span>}
          <h1 className="text-3xl md:text-4xl font-serif font-semibold text-foreground">{product.name}</h1>
          <p className="text-2xl font-semibold text-primary mt-3">${product.price}</p>
          <p className="text-muted-foreground mt-4 leading-relaxed">{product.description}</p>

          {product.addons.length > 0 && (
            <div className="mt-8">
              <h3 className="font-serif text-sm font-semibold mb-3">Add Something Special</h3>
              <div className="space-y-3">
                {product.addons.map(addon => (
                  <label key={addon} className="flex items-center gap-3 cursor-pointer">
                    <Checkbox
                      checked={selectedAddons.includes(addon)}
                      onCheckedChange={() => toggleAddon(addon)}
                    />
                    <span className="text-sm text-foreground">{addon}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <Button
            onClick={() => addToCart(product, selectedAddons)}
            className="mt-8 w-full md:w-auto px-10 py-6 text-base"
            size="lg"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
