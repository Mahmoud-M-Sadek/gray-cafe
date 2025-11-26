import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Order } from '../types';
import { CheckCircle, Circle, Package, Truck, Coffee } from 'lucide-react';

export const TrackSearch: React.FC = () => {
  const [orderId, setOrderId] = useState('');
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-20 max-w-lg text-center">
      <h1 className="text-3xl font-bold mb-8">تتبع طلبك</h1>
      <div className="flex gap-2">
        <input 
          type="text" 
          placeholder="أدخل رقم الطلب (Order ID)" 
          className="flex-1 p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-graycoffee-gold"
          value={orderId}
          onChange={e => setOrderId(e.target.value)}
        />
        <button 
          onClick={() => navigate(`/track/${orderId}`)}
          className="bg-graycoffee-gold text-graycoffee-900 font-bold px-6 py-3 rounded-lg hover:bg-yellow-500"
        >
          بحث
        </button>
      </div>
    </div>
  );
};

export const TrackOrder: React.FC = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (id) {
        const o = await api.getOrderById(id);
        setOrder(o || null);
      }
      setLoading(false);
    };
    load();
  }, [id]);

  if (loading) return <div className="text-center py-20">جاري التحميل...</div>;
  if (!order) return <div className="text-center py-20 text-red-500 font-bold">الطلب غير موجود</div>;

  const steps = [
    { status: 'pending', label: 'قيد الانتظار', icon: Circle },
    { status: 'preparing', label: 'جاري التجهيز', icon: Coffee },
    { status: 'out-for-delivery', label: 'خرج للتوصيل', icon: Truck },
    { status: 'delivered', label: 'تم التوصيل', icon: Package },
  ];

  const currentStepIndex = steps.findIndex(s => s.status === order.status);

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
        <div className="flex justify-between items-start mb-8 border-b pb-4">
          <div>
             <h1 className="text-2xl font-bold text-graycoffee-900">حالة الطلب</h1>
             <p className="text-gray-500 text-sm mt-1">Order ID: {order.id}</p>
          </div>
          <div className="text-left">
            <span className="font-bold block text-lg">{order.totalPrice} ج.م</span>
            <span className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString('ar-EG')}</span>
          </div>
        </div>

        <div className="relative flex justify-between items-center mb-12 mt-8">
           {/* Progress Line */}
           <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -z-10 transform -translate-y-1/2"></div>
           <div 
             className="absolute top-1/2 right-0 h-1 bg-green-500 -z-10 transform -translate-y-1/2 transition-all duration-500"
             style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
           ></div>

           {steps.map((step, idx) => {
             const Icon = step.icon;
             const isCompleted = idx <= currentStepIndex;
             return (
               <div key={step.status} className="flex flex-col items-center bg-white px-2">
                 <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 mb-2 transition-colors ${
                   isCompleted 
                     ? 'bg-green-500 border-green-500 text-white' 
                     : 'bg-white border-gray-300 text-gray-300'
                 }`}>
                   {isCompleted ? <CheckCircle size={20} /> : <Icon size={20} />}
                 </div>
                 <span className={`text-xs font-bold ${isCompleted ? 'text-graycoffee-900' : 'text-gray-400'}`}>
                   {step.label}
                 </span>
               </div>
             )
           })}
        </div>

        <div className="bg-gray-50 p-4 rounded-xl">
           <h3 className="font-bold mb-3">تفاصيل الطلب:</h3>
           <ul className="space-y-2 text-sm">
             {order.items.map((item, i) => (
               <li key={i} className="flex justify-between">
                 <span>{item.name} ({item.weight}) x {item.quantity}</span>
                 <span>{item.price * item.quantity} ج.م</span>
               </li>
             ))}
           </ul>
        </div>
      </div>
    </div>
  );
};