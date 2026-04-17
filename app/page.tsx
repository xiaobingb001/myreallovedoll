'use client';
import Image from 'next/image';
import Link from 'next/link';
import api from '@/lib/woocommerce'; // 引入刚才创建的配置
import { useState, useEffect } from 'react'; 
export const revalidate = 0; // 强制每次请求都重新从 WordPress 获取最新数据
const MOCK_BRANDS = ['Starpery', 'SE Doll', 'GameLady', 'Real Lady', 'Angel Kiss', 'Doll Castle'];

// 定义你的轮播图数据（包含图片路径、大标题、小标题）
const MOCK_SLIDES = [
  {
    id: 1,
    image: '/banner01.jpg', // 确保图片放在 public 文件夹
    title: 'Feel Real Connection',
    subtitle: 'Ultra-Realistic Silicone Companions Designed for Intimacy & Comfort'
  },
  {
    id: 2,
    image: '/banner02.jpg', 
    title: 'Exquisite Craftsmanship',
    subtitle: 'Experience the ultimate realism with medical-grade silicone.'
  },
  {
    id: 3,
    image: '/banner03.jpg', 
    title: 'Private & Discreet',
    subtitle: '100% Secure payment and anonymous packaging guaranteed.'
  }
];
// 1. 定义商品接口类型 (根据 WooCommerce 返回的数据结构)
interface WooProduct {
  id: number;
  name: string;
  price: string;
  images: { src: string }[];
  categories: { name: string }[];
}

// 2. 将组件改为 async 异步函数
export default async function Home() {
  
  let products: WooProduct[] = [];
  
  try {
    // 3. 从后端获取商品数据 (获取最新的 8 个商品)
    const response = await api.get("products", {
      per_page: 8,
      status: "publish",
    });
    products = response.data;
  } catch (error) {
    console.error("读取商品失败:", error);
  }

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // 设置自动轮播定时器，每 5 秒切换一次
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === MOCK_SLIDES.length - 1 ? 0 : prev + 1));
    }, 5000); // 5000 毫秒 = 5 秒

    return () => clearInterval(timer); // 组件卸载时清除定时器，防止内存泄漏
  }, []);

  return (
    <div className="min-h-screen bg-black font-sans text-white">
      
      {/* --- Header 顶部导航 --- */}
      <header className="bg-black py-6 text-center border-b border-gray-800">
        <Link href="/">
          {/* src="/logo.png" 会自动去 public 文件夹里找这个图片 */}
          <img src="/logo.jpg" alt="MyRealDoll Logo" className="h-16 object-contain mb-2" />
        </Link>
      </header>

      {/* --- Hero Section 焦点图 --- */}
<section className="relative h-[650px] flex items-center justify-start px-12 md:px-24 bg-black overflow-hidden">
        
        {/* 循环渲染背景图，通过透明度控制显示哪一张 */}
        {MOCK_SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* 渐变遮罩，确保文字清晰可见 */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10"></div>
            
            {/* 背景图片 */}
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="w-full h-full object-cover" 
            />
          </div>
        ))}

        {/* 悬浮在背景之上的文字内容 (也会随着 currentSlide 动态改变) */}
        <div className="relative z-20 max-w-2xl">
          {/* 大标题：带有平滑的淡入淡出动画 */}
          <h2 key={`title-${currentSlide}`} className="text-6xl font-serif mb-4 text-white animate-fadeIn">
            {MOCK_SLIDES[currentSlide].title}
          </h2>
          
          {/* 副标题 */}
          <p key={`sub-${currentSlide}`} className="text-xl mb-8 text-gray-300 italic animate-fadeIn">
            {MOCK_SLIDES[currentSlide].subtitle}
          </p>

          <button className="border border-yellow-600/50 text-white px-8 py-3 text-sm tracking-widest hover:bg-yellow-600/20 transition-all shadow-[0_0_15px_rgba(202,138,4,0.3)]">
            EXPLORE COLLECTION
          </button>

          {/* 底部轮播小圆点指示器 */}
          <div className="flex gap-2 mt-12">
            {MOCK_SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-yellow-600 w-8' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* --- Features Bar 信任条 --- */}
      <section className="bg-[#f5f5f5] text-black py-4 border-y border-gray-300">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-5 gap-4 text-center text-xs">
          <div className="flex flex-col items-center"><span className="text-xl mb-1">🚚</span><b>Free Shipping</b><span className="text-gray-500">Worldwide Express Delivery</span></div>
          <div className="flex flex-col items-center"><span className="text-xl mb-1">🏷️</span><b>Best Price Guarantee</b><span className="text-gray-500">Found it cheaper? We match</span></div>
          <div className="flex flex-col items-center"><span className="text-xl mb-1">💳</span><b>Pay Monthly with Klarna</b><span className="text-gray-500">From $49/month</span></div>
          <div className="flex flex-col items-center"><span className="text-xl mb-1">⭐</span><b>4.8/5 Average Rating</b><span className="text-gray-500">Based on 1,100+ Reviews</span></div>
          <div className="flex flex-col items-center"><span className="text-xl mb-1">🛡️</span><b>Certificate of Authenticity</b><span className="text-gray-500">Anti-counterfeit code</span></div>
        </div>
      </section>

      {/* --- Product Grid 核心产品区 (红框部分) --- */}
      <section className="bg-[#000000] py-16 px-4 md:px-12">
        <div className="container mx-auto" text-center>
          <h3 className="text-2xl font-bold mb-2 uppercase tracking-wide">❤️ THE SEXIEST COLLECTION SO FAR ❤️</h3>
          <p className="text-sm text-gray-300 mb-8">Chocolate Lady Dolls. Delicious. Limited availability.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.length > 0 ? (
              products.map((product) => (
                <Link href={`/product/${product.id}`} key={product.id} className="group bg-white rounded-md overflow-hidden text-black block hover:shadow-2xl transition-all">
                  <div className="relative aspect-[3/4] bg-gray-200">
                    {/* 使用商品的第一张图，如果没有图则使用占位图 */}
                    <img 
                      src={product.images[0]?.src || '/placeholder.jpg'} 
                      alt={product.name} 
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] px-2 py-1 font-bold rounded-sm">Lady</div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-sm font-semibold mb-1 h-10 overflow-hidden">{product.name}</h4>
                    {/* 获取分类名称 */}
                    <p className="text-[10px] text-gray-500 mb-2 uppercase">
                      {product.categories[0]?.name || 'Uncategorized'}
                    </p>
                    <p className="font-bold">${product.price}</p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-white">Loading products...</p>
            )}
          </div>
        </div>
      </section>

      {/* --- Brands Section 品牌区 --- */}
      <section className="bg-white text-black py-12 px-4 border-b border-gray-200">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-bold mb-8">Most Popular Sex Doll Brands</h3>
          <div className="flex overflow-x-auto gap-4 pb-4 snap-x hide-scrollbar">
            {MOCK_BRANDS.map((brand: string, i: number) => (
              <div key={i} className="min-w-[150px] md:min-w-[200px] aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden snap-center group">
                 <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all z-10"></div>
                 <span className="relative z-20 text-white font-bold">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

