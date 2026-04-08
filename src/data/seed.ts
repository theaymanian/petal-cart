import { Category, Product } from '@/types';

export const defaultCategories: Category[] = [
  { id: 'bouquets', name: 'Bouquets' },
  { id: 'box-arrangements', name: 'Box Arrangements' },
  { id: 'wedding', name: 'Wedding' },
  { id: 'special-occasions', name: 'Special Occasions' },
];

export const defaultProducts: Product[] = [
  {
    id: '1',
    name: 'Blush Peony Romance',
    description: 'A stunning arrangement of blush pink peonies and garden roses, hand-wrapped in premium silk ribbon. Perfect for anniversaries and romantic gestures.',
    price: 89,
    categoryId: 'bouquets',
    imageUrl: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=600',
    addons: ['Patchi Chocolate', 'Teddy Bear', 'Greeting Card'],
    featured: true,
  },
  {
    id: '2',
    name: 'Sage & Ivory Elegance',
    description: 'White roses and eucalyptus greenery arranged in a luxurious velvet box. A timeless gift of sophistication.',
    price: 120,
    categoryId: 'box-arrangements',
    imageUrl: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600',
    addons: ['Patchi Chocolate', 'Scented Candle'],
    featured: true,
  },
  {
    id: '3',
    name: 'Bridal Dreams',
    description: 'A cascading bridal bouquet featuring white peonies, ranunculus, and trailing jasmine. Custom-designed for your special day.',
    price: 250,
    categoryId: 'wedding',
    imageUrl: 'https://images.unsplash.com/photo-1522057306606-8d84b4cd3437?w=600',
    addons: ['Boutonniere', 'Bridesmaid Bouquet'],
    featured: true,
  },
  {
    id: '4',
    name: 'Golden Hour Sunflowers',
    description: 'Bright sunflowers paired with wildflowers and rustic greenery. A cheerful arrangement that radiates warmth.',
    price: 65,
    categoryId: 'bouquets',
    imageUrl: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=600',
    addons: ['Teddy Bear', 'Greeting Card'],
  },
  {
    id: '5',
    name: 'Royal Orchid Collection',
    description: 'Exotic phalaenopsis orchids presented in a handcrafted ceramic pot. Long-lasting beauty for any space.',
    price: 150,
    categoryId: 'special-occasions',
    imageUrl: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=600',
    addons: ['Patchi Chocolate', 'Scented Candle', 'Greeting Card'],
    featured: true,
  },
  {
    id: '6',
    name: 'Pastel Garden Mix',
    description: 'A delicate mix of pastel-hued tulips, carnations, and baby\'s breath in a charming wrapped bouquet.',
    price: 55,
    categoryId: 'bouquets',
    imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=600',
    addons: ['Greeting Card', 'Teddy Bear'],
  },
];

export function initializeData() {
  // Only seed if no data exists yet — never overwrite admin changes
  if (!localStorage.getItem('adam-categories')) {
    localStorage.setItem('adam-categories', JSON.stringify(defaultCategories));
  }
  if (!localStorage.getItem('adam-products')) {
    localStorage.setItem('adam-products', JSON.stringify(defaultProducts));
  }
  if (!localStorage.getItem('adam-orders')) {
    localStorage.setItem('adam-orders', JSON.stringify([]));
  }
}
