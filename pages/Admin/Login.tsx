import React, { useState } from 'react';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { Coffee } from 'lucide-react';

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await api.login(username, password);
    if (success) {
      navigate('/admin/dashboard');
    } else {
      setError('اسم المستخدم أو كلمة المرور غير صحيحة');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-graycoffee-900 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
           <Coffee className="w-12 h-12 text-graycoffee-gold mx-auto mb-2" />
           <h1 className="text-2xl font-bold text-gray-800">Gray Coffee Admin</h1>
        </div>
        
        {error && <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-center text-sm">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1">اسم المستخدم</label>
            <input 
              type="text" 
              className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-graycoffee-gold"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">كلمة المرور</label>
            <input 
              type="password" 
              className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-graycoffee-gold"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full bg-graycoffee-gold text-graycoffee-900 font-bold py-3 rounded-lg hover:bg-yellow-500 transition">
            دخول
          </button>
        </form>
      </div>
    </div>
  );
};