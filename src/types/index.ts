export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  imageUrl: string;
  addons: string[];
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedAddons: string[];
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customer: CustomerInfo;
  createdAt: string;
  status: 'pending' | 'confirmed' | 'delivered';
}

export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
  deliveryNote: string;
}

export interface LandingContent {
  hero: {
    title: string;
    subtitle: string;
    buttonText: string;
    imageUrl: string;
  };
  weddings: {
    sectionLabel: string;
    sectionTitle: string;
    sectionDescription: string;
    weddingTitle: string;
    weddingDescription: string;
    weddingImageUrl: string;
    ceremonialTitle: string;
    ceremonialDescription: string;
    ceremonialImageUrl: string;
  };
  services: string[];
  whyChooseUs: {
    title: string;
    description: string;
  }[];
}
