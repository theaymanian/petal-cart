import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Gift, Leaf } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Product, Category } from '@/types';
import ProductCard from '@/components/shop/ProductCard';
import heroImage from '@/assets/hero-flowers.jpg';

export default function Index() {
  const [products] = useLocalStorage<Product[]>('adam-products', []);
  const [categories] = useLocalStorage<Category[]>('adam-categories', []);
  const featured = products.filter(p => p.featured).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center overflow-hidden">
        <img
          src={heroImage}
          alt="Premium flower arrangement"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/30" />
        <div className="container relative z-10">
          <div className="max-w-lg">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground leading-tight animate-fade-in">
              Flowers, Crafted with Love
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/90 font-sans animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Premium hand-wrapped bouquets for every occasion. Delivered fresh to your door.
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity animate-fade-in"
              style={{ animationDelay: '0.4s' }}
            >
              Shop Collection <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="container py-20">
          <h2 className="text-3xl font-serif font-semibold text-center text-foreground">Featured Collections</h2>
          <p className="text-center text-muted-foreground mt-2 mb-10">Curated arrangements for extraordinary moments</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <section className="bg-muted/40 py-16">
          <div className="container">
            <h2 className="text-3xl font-serif font-semibold text-center mb-10">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map(cat => (
                <Link
                  key={cat.id}
                  to={`/shop?category=${cat.id}`}
                  className="bg-card rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow group"
                >
                  <h3 className="font-serif font-medium text-foreground group-hover:text-primary transition-colors">{cat.name}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="container py-20">
        <h2 className="text-3xl font-serif font-semibold text-center mb-12">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Leaf, title: 'Farm Fresh', desc: 'Sourced directly from premium farms, ensuring the freshest blooms with every delivery.' },
            { icon: Gift, title: 'Custom Wrapping', desc: 'Each arrangement is hand-wrapped with premium materials to create a gift-worthy presentation.' },
            { icon: Truck, title: 'Same Day Delivery', desc: 'Order before 2 PM and receive your flowers the same day, anywhere in the city.' },
          ].map(item => (
            <div key={item.title} className="text-center p-6">
              <div className="w-14 h-14 rounded-full bg-sage-light flex items-center justify-center mx-auto mb-4">
                <item.icon size={24} className="text-primary" />
              </div>
              <h3 className="font-serif text-lg font-medium mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
