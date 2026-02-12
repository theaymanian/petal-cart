import { useSearchParams } from 'react-router-dom';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Product, Category } from '@/types';
import ProductCard from '@/components/shop/ProductCard';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';
  const [products] = useLocalStorage<Product[]>('adam-products', []);
  const [categories] = useLocalStorage<Category[]>('adam-categories', []);

  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.categoryId === activeCategory);

  return (
    <div className="container py-12">
      <h1 className="text-3xl md:text-4xl font-serif font-semibold text-center mb-2">Our Collection</h1>
      <p className="text-center text-muted-foreground mb-10">Handcrafted arrangements for every occasion</p>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <button
          onClick={() => setSearchParams({})}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'
          }`}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSearchParams({ category: cat.id })}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-20">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
