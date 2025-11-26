import React, { createContext, useContext, useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { ProductDetail } from './pages/ProductDetail';
import { Checkout } from './pages/Checkout';
import { TrackSearch, TrackOrder } from './pages/Track';
import { Login } from './pages/Admin/Login';
import { Dashboard } from './pages/Admin/Dashboard';
import { api } from './services/api';
import { CartItem, Product } from './types';

// Cart Context
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

export const useCart = () => useContext(CartContext);

// Layout wrapper to hide Navbar on Admin pages
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminPage && <Navbar />}
      <main className={!isAdminPage ? 'min-h-[calc(100vh-64px)]' : ''}>
        {children}
      </main>
      {!isAdminPage && (
        <footer className="bg-graycoffee-800 text-white py-8 text-center mt-auto">
          <p>© {new Date().getFullYear()} Gray Coffee. جميع الحقوق محفوظة.</p>
        </footer>
      )}
    </>
  );
};

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Initialize simulated DB
  useEffect(() => {
    api.init();
  }, []);

  const addToCart = (product: Product, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/track-search" element={<TrackSearch />} />
            <Route path="/track/:id" element={<TrackOrder />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<Login />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
          </Routes>
        </Layout>
      </Router>
    </CartContext.Provider>
  );
}