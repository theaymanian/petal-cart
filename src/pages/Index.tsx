import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Gift, Leaf, Heart, Sparkles, Star } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Product, Category, LandingContent } from '@/types';
import { defaultLandingContent } from '@/data/defaultLandingContent';
import { defaultProducts, defaultCategories } from '@/data/seed';
import ProductCard from '@/components/shop/ProductCard';
import heroImage from '@/assets/hero-flowers.jpg';
import weddingImage from '@/assets/wedding-flowers.jpg';
import ceremonialImage from '@/assets/ceremonial-flowers.jpg';

const serviceIcons = [Heart, Star, Sparkles, Truck];
const whyIcons = [Leaf, Gift, Truck];

export default function Index() {
  const [products] = useLocalStorage<Product[]>('adam-products', defaultProducts);
  const [categories] = useLocalStorage<Category[]>('adam-categories', defaultCategories);
  const [content] = useLocalStorage<LandingContent>('adam-landing', defaultLandingContent);
  const featured = products.filter(p => p.featured).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center overflow-hidden">
        <img
          src={content.hero.imageUrl || heroImage}
          alt="Premium flower arrangement"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/30" />
        <div className="container relative z-10">
          <div className="max-w-lg">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground leading-tight animate-fade-in">
              {content.hero.title}
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/90 font-sans animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {content.hero.subtitle}
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity animate-fade-in"
              style={{ animationDelay: '0.4s' }}
            >
              {content.hero.buttonText} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Weddings & Ceremonies */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-14">
            <p className="text-sm font-medium tracking-widest uppercase text-primary mb-2">{content.weddings.sectionLabel}</p>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground">{content.weddings.sectionTitle}</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">{content.weddings.sectionDescription}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="group relative rounded-2xl overflow-hidden shadow-lg">
              <img
                src={content.weddings.weddingImageUrl || weddingImage}
                alt="Wedding floral arrangements"
                className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-2 mb-2">
                  <Heart size={18} className="text-secondary" />
                  <span className="text-sm font-medium text-secondary tracking-wide uppercase">Weddings</span>
                </div>
                <h3 className="text-2xl font-serif font-semibold text-primary-foreground mb-2">{content.weddings.weddingTitle}</h3>
                <p className="text-primary-foreground/80 text-sm leading-relaxed mb-4">{content.weddings.weddingDescription}</p>
                <Link to="/contact" className="inline-flex items-center gap-2 bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-primary transition-colors">
                  Request Consultation <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="group relative rounded-2xl overflow-hidden shadow-lg">
              <img
                src={content.weddings.ceremonialImageUrl || ceremonialImage}
                alt="Ceremonial flower decorations"
                className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={18} className="text-secondary" />
                  <span className="text-sm font-medium text-secondary tracking-wide uppercase">Ceremonies</span>
                </div>
                <h3 className="text-2xl font-serif font-semibold text-primary-foreground mb-2">{content.weddings.ceremonialTitle}</h3>
                <p className="text-primary-foreground/80 text-sm leading-relaxed mb-4">{content.weddings.ceremonialDescription}</p>
                <Link to="/contact" className="inline-flex items-center gap-2 bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-primary transition-colors">
                  Get a Quote <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Strip */}
      <section className="bg-primary text-primary-foreground py-6">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-sm font-medium">
            {content.services.map((service, i) => {
              const Icon = serviceIcons[i % serviceIcons.length];
              return (
                <div key={i} className="flex items-center gap-2"><Icon size={16} /> {service}</div>
              );
            })}
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
          {content.whyChooseUs.map((item, i) => {
            const Icon = whyIcons[i % whyIcons.length];
            return (
              <div key={i} className="text-center p-6">
                <div className="w-14 h-14 rounded-full bg-sage-light flex items-center justify-center mx-auto mb-4">
                  <Icon size={24} className="text-primary" />
                </div>
                <h3 className="font-serif text-lg font-medium mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
