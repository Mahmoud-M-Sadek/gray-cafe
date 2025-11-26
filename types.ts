export interface Product {
  id: number;
  name: string;
  weight: string;
  price: number;
  category: string;
  image?: string;
}

export interface Category {
  id: number;
  name: string;
  label: string;
}

export interface User {
  username: string;
  password?: string;
  role: 'admin' | 'user';
}

export type OrderStatus = 'pending' | 'preparing' | 'out-for-delivery' | 'delivered';

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string; // generated uuid
  customerName: string;
  phone: string;
  address: string;
  items: CartItem[];
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}