import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Star, Truck, ShieldCheck } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center bg-graycoffee-100 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-graycoffee-200 clip-path-slant opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-graycoffee-800 rounded-tr-[100px] opacity-5"></div>
        
        <div className="container mx-auto px-4 relative z-20 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 text-center md:text-right mb-10 md:mb-0">
            <div className="inline-block px-4 py-1 mb-4 border border-graycoffee-900 rounded-full text-xs font-bold tracking-widest text-graycoffee-900 uppercase">Premium Quality</div>
            <h1 className="text-5xl md:text-7xl font-black text-graycoffee-900 mb-4 leading-tight">
              GRAY <br/>
              <span className="text-graycoffee-500">COFFEE</span>
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-graycoffee-800 mb-8 max-w-2xl">
              إختيارك الأول للقهوة
            </p>
            <p className="text-lg text-gray-500 mb-8 max-w-lg leading-relaxed">
              نقدم لك أجود أنواع البن المحوج والنسكافيه والكابتشينو بنكهات مميزة. طعم يضبط مزاجك.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
              <Link to="/menu" className="bg-graycoffee-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition flex items-center justify-center gap-2 shadow-lg shadow-gray-300">
                اطلب الآن
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <Link to="/track-search" className="bg-white text-graycoffee-900 border-2 border-graycoffee-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition">
                تتبع طلبك
              </Link>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 flex justify-center">
             <div className="relative w-[350px] h-[350px] md:w-[500px] md:h-[500px] bg-white rounded-full p-6 shadow-2xl border-4 border-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                  alt="Cup of Coffee" 
                  className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition duration-700"
                />
             </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-graycoffee-900">لماذا Gray Coffee؟</h2>
             <div className="w-20 h-1 bg-graycoffee-900 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-gray-50 rounded-3xl text-center hover:-translate-y-2 transition duration-300">
              <div className="w-16 h-16 bg-graycoffee-900 rounded-2xl rotate-3 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Star className="w-8 h-8 text-white -rotate-3" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-graycoffee-900">جودة ممتازة</h3>
              <p className="text-gray-500 leading-relaxed">نستخدم أفضل حبوب البن ونكهات عالمية لضمان تجربة لا تنسى في كل كوب.</p>
            </div>
            <div className="p-8 bg-gray-50 rounded-3xl text-center hover:-translate-y-2 transition duration-300">
              <div className="w-16 h-16 bg-graycoffee-900 rounded-2xl rotate-3 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Truck className="w-8 h-8 text-white -rotate-3" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-graycoffee-900">توصيل سريع</h3>
              <p className="text-gray-500 leading-relaxed">خدمة توصيل سريعة وموثوقة لضمان وصول قهوتك طازجة لباب منزلك.</p>
            </div>
            <div className="p-8 bg-gray-50 rounded-3xl text-center hover:-translate-y-2 transition duration-300">
              <div className="w-16 h-16 bg-graycoffee-900 rounded-2xl rotate-3 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <ShieldCheck className="w-8 h-8 text-white -rotate-3" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-graycoffee-900">أمان ومصداقية</h3>
              <p className="text-gray-500 leading-relaxed">نظام طلب سهل، دفع آمن، ومتابعة دقيقة لحالة طلبك لحظة بلحظة.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};