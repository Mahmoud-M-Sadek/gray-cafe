import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { Product } from '../types';
import { useCart } from '../App';
import { Minus, Plus, ShoppingCart } from 'lucide-react';

export const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | undefined>();
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const load = async () => {
      if (id) {
        const p = await api.getProductById(parseInt(id));
        setProduct(p);
      }
      setLoading(false);
    };
    load();
  }, [id]);

  if (loading) return <div className="text-center py-20">جاري التحميل...</div>;
  if (!product) return <div className="text-center py-20">المنتج غير موجود</div>;

  const handleWhatsAppOrder = () => {
    const text = `مرحباً، أريد طلب المنتج التالي:%0A*${product.name}*%0Aالوزن: ${product.weight}%0Aالكمية: ${quantity}%0Aالسعر: ${product.price * quantity} ج.م`;
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="h-[400px] md:h-auto bg-gray-100">
             <img 
                  src={`https://picsum.photos/seed/${product.id}/800/800`} 
                  alt={product.name}
                  className="w-full h-full object-cover"
              />
          </div>

          {/* Info */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="text-sm text-graycoffee-gold font-bold uppercase mb-2 tracking-wide">{product.category}</div>
            <h1 className="text-4xl font-extrabold text-graycoffee-900 mb-4">{product.name}</h1>
            <p className="text-2xl font-medium text-gray-500 mb-8">الوزن: {product.weight}</p>
            
            <div className="flex items-center mb-8">
              <span className="text-3xl font-bold text-graycoffee-900">{product.price * quantity} ج.م</span>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-8">
              <span className="font-bold">الكمية:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:bg-gray-100 text-gray-600">
                  <Minus size={18} />
                </button>
                <span className="px-4 font-bold text-lg">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-gray-100 text-gray-600">
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => addToCart(product, quantity)}
                className="flex-1 bg-graycoffee-900 text-white py-4 px-6 rounded-xl font-bold hover:bg-gray-800 transition flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                إضافة للسلة
              </button>
              <button 
                onClick={handleWhatsAppOrder}
                className="flex-1 bg-[#25D366] text-white py-4 px-6 rounded-xl font-bold hover:bg-[#20bd5a] transition"
              >
                اطلب عبر واتساب
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};