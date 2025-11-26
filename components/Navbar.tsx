import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu } from 'lucide-react';
import { useCart } from '../App';

export const Navbar: React.FC = () => {
  const { cart } = useCart();
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-white text-graycoffee-900 shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
             <img 
               src="https://h.top4top.io/p_3617wc4ld1.jpg" 
               alt="Gray Coffee" 
               className="h-20 w-auto object-contain" 
             />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse font-medium text-gray-600">
            <Link to="/" className={`hover:text-graycoffee-900 transition ${location.pathname === '/' ? 'text-graycoffee-900 font-bold' : ''}`}>الرئيسية</Link>
            <Link to="/menu" className={`hover:text-graycoffee-900 transition ${location.pathname === '/menu' ? 'text-graycoffee-900 font-bold' : ''}`}>القائمة</Link>
            <Link to="/track-search" className={`hover:text-graycoffee-900 transition ${location.pathname.startsWith('/track') ? 'text-graycoffee-900 font-bold' : ''}`}>تتبع طلبك</Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4 space-x-reverse text-graycoffee-900">
            <Link to="/checkout" className="relative p-2 hover:bg-gray-100 rounded-full transition">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-graycoffee-900 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to="/admin" className="p-2 hover:bg-gray-100 rounded-full transition">
              <User className="h-6 w-6" />
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 hover:bg-gray-100 rounded-full transition">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 pb-4 px-4 shadow-lg">
          <div className="flex flex-col space-y-2 mt-2">
            <Link to="/" onClick={() => setIsOpen(false)} className="py-3 border-b border-gray-50 hover:text-graycoffee-900">الرئيسية</Link>
            <Link to="/menu" onClick={() => setIsOpen(false)} className="py-3 border-b border-gray-50 hover:text-graycoffee-900">القائمة</Link>
            <Link to="/track-search" onClick={() => setIsOpen(false)} className="py-3 border-b border-gray-50 hover:text-graycoffee-900">تتبع طلبك</Link>
          </div>
        </div>
      )}
    </nav>
  );
};