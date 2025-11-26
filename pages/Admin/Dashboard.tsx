import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Order, Product, OrderStatus } from '../../types';
import { useNavigate } from 'react-router-dom';
import { Trash2, Edit, Save, Plus } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'orders' | 'products'>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Simple check for auth
  useEffect(() => {
    const session = api.getSession();
    if (!session || session.role !== 'admin') {
      navigate('/admin/login');
      return;
    }
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [o, p] = await Promise.all([api.getOrders(), api.getProducts()]);
    // Sort orders by date desc
    setOrders(o.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    setProducts(p);
    setLoading(false);
  };

  const handleStatusChange = async (orderId: string, status: OrderStatus) => {
    await api.updateOrderStatus(orderId, status);
    loadData();
  };

  const handleDeleteOrder = async (id: string) => {
    if(confirm('هل أنت متأكد من حذف هذا الطلب؟')) {
      await api.deleteOrder(id);
      loadData();
    }
  };

  const handleLogout = () => {
    api.logout();
    navigate('/');
  };

  if (loading) return <div className="p-8 text-center">جاري التحميل...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-graycoffee-900 text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-xl font-bold">لوحة تحكم Gray Coffee</h1>
        <button onClick={handleLogout} className="text-sm bg-red-600 px-3 py-1 rounded hover:bg-red-700">تسجيل خروج</button>
      </header>

      <div className="container mx-auto p-6">
        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button 
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-2 rounded-lg font-bold transition ${activeTab === 'orders' ? 'bg-graycoffee-gold text-white' : 'bg-white text-gray-600'}`}
          >
            الطلبات ({orders.length})
          </button>
          <button 
             onClick={() => setActiveTab('products')}
             className={`px-6 py-2 rounded-lg font-bold transition ${activeTab === 'products' ? 'bg-graycoffee-gold text-white' : 'bg-white text-gray-600'}`}
          >
            المنتجات ({products.length})
          </button>
        </div>

        {/* Content */}
        {activeTab === 'orders' ? (
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full text-right">
              <thead className="bg-gray-50 text-gray-600 font-bold border-b">
                <tr>
                  <th className="p-4">رقم الطلب</th>
                  <th className="p-4">العميل</th>
                  <th className="p-4">السعر</th>
                  <th className="p-4">التاريخ</th>
                  <th className="p-4">الحالة</th>
                  <th className="p-4">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-mono text-sm">{order.id.slice(0, 8)}</td>
                    <td className="p-4">
                      <div className="font-bold">{order.customerName}</div>
                      <div className="text-xs text-gray-500">{order.phone}</div>
                    </td>
                    <td className="p-4 font-bold">{order.totalPrice} ج.م</td>
                    <td className="p-4 text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString('ar-EG')}</td>
                    <td className="p-4">
                      <select 
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                        className={`p-2 rounded-lg text-sm font-bold outline-none border 
                          ${order.status === 'delivered' ? 'bg-green-100 text-green-700 border-green-200' : 
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' : 'bg-blue-100 text-blue-700 border-blue-200'}`}
                      >
                        <option value="pending">قيد الانتظار</option>
                        <option value="preparing">جاري التجهيز</option>
                        <option value="out-for-delivery">خرج للتوصيل</option>
                        <option value="delivered">تم التوصيل</option>
                      </select>
                    </td>
                    <td className="p-4">
                      <button onClick={() => handleDeleteOrder(order.id)} className="text-red-500 hover:bg-red-50 p-2 rounded">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">إدارة المنتجات</h2>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
                <Plus size={16} /> إضافة منتج
              </button>
            </div>
            <div className="grid gap-4">
              {products.map(p => (
                <div key={p.id} className="border p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">{p.name}</h3>
                    <p className="text-sm text-gray-500">{p.category} | {p.weight} | {p.price} ج.م</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:bg-blue-50 p-2 rounded"><Edit size={18} /></button>
                    <button className="text-red-600 hover:bg-red-50 p-2 rounded"><Trash2 size={18} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};