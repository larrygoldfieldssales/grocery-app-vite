
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  unit: string;
  brand?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
}

export interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  deliveryInstructions?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  deliveryFee: number;
  checkoutForm: CheckoutForm;
  createdAt: string;
  status: 'pending' | 'confirmed' | 'delivered';
}

export type SortOption = 'popular' | 'price-low' | 'price-high' | 'name';
