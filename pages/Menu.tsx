import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { Product, Category } from '../types';
import { ShoppingBag } from 'lucide-react';

export const Menu: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const [prodData, catData] = await Promise.all([
        api.getProducts(),
        api.getCategories()
      ]);
      setProducts(prodData);
      setCategories(catData);
      setLoading(false);
    };
    loadData();
  }, []);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  if (loading) return <div className="text-center py-20">جاري التحميل...</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-10 text-graycoffee-900">قائمة منتجاتنا</h1>
      
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <button 
          onClick={() => setSelectedCategory('all')}
          className={`px-6 py-2 rounded-full font-medium transition ${selectedCategory === 'all' ? 'bg-graycoffee-900 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
        >
          الكل
        </button>
        {categories.map(cat => (
          <button 
            key={cat.id}
            onClick={() => setSelectedCategory(cat.name)}
            className={`px-6 py-2 rounded-full font-medium transition ${selectedCategory === cat.name ? 'bg-graycoffee-900 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <Link to={`/product/${product.id}`} key={product.id} className="group block">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition border border-gray-100 h-full flex flex-col">
              <div className="h-48 bg-gray-100 relative overflow-hidden">
                <img 
                  src={`https://picsum.photos/seed/${product.id}/400/400`} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>
              <div className="p-5 flex-grow flex flex-col">
                <div className="text-xs text-graycoffee-gold font-bold uppercase mb-1">{product.category}</div>
                <h3 className="text-lg font-bold mb-2 text-graycoffee-900">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{product.weight}</p>
                <div className="mt-auto flex justify-between items-center">
                  <span className="text-xl font-bold text-graycoffee-900">{product.price} ج.م</span>
                  <div className="w-10 h-10 rounded-full bg-graycoffee-900 text-white flex items-center justify-center group-hover:bg-graycoffee-gold transition">
                    <ShoppingBag size={18} />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};