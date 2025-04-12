
export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'user' | 'admin';
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'milk' | 'shrikhand' | 'drinks' | 'others';
  ingredients: string[];
  expiryDate: string;
  images: string[];
  inStock: boolean;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type OrderStatus = 'placed' | 'processing' | 'out-for-delivery' | 'delivered';

export type Order = {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
};
