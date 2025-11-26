import React, { useState } from 'react';
import { useCart } from '../App';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

export const Checkout: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);

    try {
      // 1. Create Order in JSON (LocalStorage)
      const order = await api.createOrder({
        customerName: formData.name,
        phone: formData.phone,
        address: formData.address,
        items: cart,
        totalPrice: total
      });

      // 2. Prepare WhatsApp Message
      let message = `*طلب جديد من Gray Coffee*%0A`;
      message += `------------------%0A`;
      message += `رقم الطلب: ${order.id.slice(0, 8)}%0A`;
      message += `الاسم: ${formData.name}%0A`;
      message += `الهاتف: ${formData.phone}%0A`;
      message += `العنوان: ${formData.address}%0A`;
      message += `------------------%0A`;
      message += `*المنتجات:*%0A`;
      cart.forEach(item => {
        message += `- ${item.name} (${item.weight}) x ${item.quantity} = ${item.price * item.quantity} ج.م%0A`;
      });
      message += `------------------%0A`;
      message += `*الإجمالي: ${total} ج.م*`;

      // 3. Clear Cart & Redirect
      clearCart();
      window.open(`https://wa.me/?text=${message}`, '_blank');
      navigate(`/track/${order.id}`); // Send to tracking page

    } catch (error) {
      console.error(error);
      alert('حدث خطأ أثناء الطلب');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">سلة المشتريات فارغة</h2>
        <a href="/menu" className="text-graycoffee-gold hover:underline">تصفح القائمة</a>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">إتمام الطلب</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Order Summary */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-xl font-bold mb-6 border-b pb-4">ملخص الطلب</h2>
          <div className="space-y-4 mb-6">
            {cart.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                   <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden">
                      <img src={`https://picsum.photos/seed/${item.id}/100/100`} className="w-full h-full object-cover" />
                   </div>
                   <div>
                     <h4 className="font-bold">{item.name}</h4>
                     <p className="text-sm text-gray-500">{item.weight} x {item.quantity}</p>
                   </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold">{item.price * item.quantity} ج.م</span>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 flex justify-between items-center text-xl font-bold">
            <span>الإجمالي الكلي</span>
            <span>{total} ج.م</span>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-6 border-b pb-4">بيانات التوصيل</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-2">الاسم بالكامل</label>
              <input 
                required
                type="text" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-graycoffee-gold outline-none"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">رقم الهاتف</label>
              <input 
                required
                type="tel" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-graycoffee-gold outline-none"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">العنوان بالتفصيل</label>
              <textarea 
                required
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-graycoffee-gold outline-none"
                value={formData.address}
                onChange={e => setFormData({...formData, address: e.target.value})}
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-graycoffee-900 text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition mt-6 disabled:opacity-50"
            >
              {isSubmitting ? 'جاري الطلب...' : 'إتمام الطلب (واتساب)'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};