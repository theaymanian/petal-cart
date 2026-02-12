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
