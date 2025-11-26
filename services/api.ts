import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_USERS } from '../data/initialData';
import { Product, Order, User, OrderStatus } from '../types';

// Keys for LocalStorage to simulate JSON files
const KEYS = {
  PRODUCTS: 'graycoffee_products',
  ORDERS: 'graycoffee_orders',
  USERS: 'graycoffee_users',
  CATEGORIES: 'graycoffee_categories',
  SESSION: 'graycoffee_session'
};

// Initialize Data if not exists
const initData = () => {
  if (typeof window === 'undefined') return;
  
  if (!localStorage.getItem(KEYS.PRODUCTS)) {
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
  }
  if (!localStorage.getItem(KEYS.CATEGORIES)) {
    localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
  }
  if (!localStorage.getItem(KEYS.USERS)) {
    localStorage.setItem(KEYS.USERS, JSON.stringify(INITIAL_USERS));
  }
  if (!localStorage.getItem(KEYS.ORDERS)) {
    localStorage.setItem(KEYS.ORDERS, JSON.stringify([]));
  }
};

// --- API Methods ---

export const api = {
  init: initData,

  // Products
  getProducts: async (): Promise<Product[]> => {
    const data = localStorage.getItem(KEYS.PRODUCTS);
    return data ? JSON.parse(data) : [];
  },

  getProductById: async (id: number): Promise<Product | undefined> => {
    const products = await api.getProducts();
    return products.find(p => p.id === id);
  },

  updateProduct: async (product: Product): Promise<void> => {
    const products = await api.getProducts();
    const index = products.findIndex(p => p.id === product.id);
    if (index >= 0) {
      products[index] = product;
    } else {
      products.push(product); // Add new if not exists (simple logic for now)
    }
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
  },
  
  deleteProduct: async (id: number): Promise<void> => {
    const products = await api.getProducts();
    const newProducts = products.filter(p => p.id !== id);
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(newProducts));
  },

  // Categories
  getCategories: async () => {
    const data = localStorage.getItem(KEYS.CATEGORIES);
    return data ? JSON.parse(data) : [];
  },

  // Orders
  getOrders: async (): Promise<Order[]> => {
    const data = localStorage.getItem(KEYS.ORDERS);
    return data ? JSON.parse(data) : [];
  },

  getOrderById: async (id: string): Promise<Order | undefined> => {
    const orders = await api.getOrders();
    return orders.find(o => o.id === id);
  },

  createOrder: async (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>): Promise<Order> => {
    const orders = await api.getOrders();
    const newOrder: Order = {
      ...orderData,
      id: crypto.randomUUID(), // Browser native UUID
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    orders.push(newOrder);
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
    return newOrder;
  },

  updateOrderStatus: async (id: string, status: OrderStatus): Promise<void> => {
    const orders = await api.getOrders();
    const index = orders.findIndex(o => o.id === id);
    if (index !== -1) {
      orders[index].status = status;
      localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
    }
  },

  deleteOrder: async (id: string): Promise<void> => {
    const orders = await api.getOrders();
    const newOrders = orders.filter(o => o.id !== id);
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(newOrders));
  },

  // Auth
  login: async (username: string, password: string): Promise<boolean> => {
    const usersStr = localStorage.getItem(KEYS.USERS);
    const users: User[] = usersStr ? JSON.parse(usersStr) : [];
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem(KEYS.SESSION, JSON.stringify({ username: user.username, role: user.role }));
      return true;
    }
    return false;
  },

  logout: async () => {
    localStorage.removeItem(KEYS.SESSION);
  },

  getSession: () => {
    const session = localStorage.getItem(KEYS.SESSION);
    return session ? JSON.parse(session) : null;
  }
};