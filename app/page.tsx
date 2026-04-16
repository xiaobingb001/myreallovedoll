import Image from 'next/image';
import Link from 'next/link';
import api from '@/lib/woocommerce'; // 引入刚才创建的配置

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

  return (
    <div className="min-h-screen bg-black font-sans text-white">
      
      {/* --- Header 顶部导航 --- */}
      <header className="bg-black py-6 text-center border-b border-gray-800">
        <h1 className="text-4xl font-serif tracking-wider">
          <span className="text-white">My</span><span className="text-red-800">Real</span><span className="text-gray-400">Doll</span>
        </h1>
        <p className="text-xs tracking-[0.3em] mt-2 text-gray-400">ULTRA REALISTIC COMPANIONS</p>
      </header>

      {/* --- Hero Section 焦点图 --- */}
      <section className="relative h-[600px] flex items-center justify-start px-12 md:px-24 bg-[#0a0a0a]">
        {/* 这里应该是您的背景图，由于我没有原图，用深色渐变模拟 */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-0"></div>
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-6xl font-serif mb-4 text-white">Feel Real <span className="italic text-gray-300">Connection</span></h2>
          <p className="text-xl mb-8 text-gray-400 italic">
            Ultra-Realistic Silicone Companions<br />
            Designed for Intimacy & Comfort
          </p>
          <button className="border border-yellow-600/50 text-white px-8 py-3 text-sm tracking-widest hover:bg-yellow-600/20 transition-all shadow-[0_0_15px_rgba(202,138,4,0.3)]">
            EXPLORE COLLECTION
          </button>
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
      <section className="bg-[#3a4047] py-16 px-4 md:px-12">
        <div className="container mx-auto">
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
            {MOCK_BRANDS.map((brand, i) => (
              <div key={i} className="min-w-[150px] md:min-w-[200px] aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden snap-center group">
                 <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all z-10"></div>
                 <span className="relative z-20 text-white font-bold">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Footer 页脚 --- */}
      <footer className="bg-[#2b3035] text-gray-300 py-16 px-4 md:px-12 text-sm border-t-4 border-gray-800">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* 左侧信息 */}
          <div>
            <div className="w-24 h-24 border-2 border-white rounded-full flex items-center justify-center mb-6 text-center font-bold text-white">
              TDF<br/>VERIFIED
            </div>
            <h4 className="text-white font-serif italic text-lg mb-4">Joy Love Dolls™ - Feel The Difference</h4>
            <p className="text-xs leading-relaxed text-gray-400">
              Digital Crusher LLC - 1201 N.<br/>
              Orange StreetSuite<br/>
              7466Wilmington DE 19801-1186<br/>
              EIN number: 38-4125660
            </p>
            <div className="flex gap-2 mt-4">
              {/* 社交图标占位 */}
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-black">f</div>
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-black">IG</div>
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-black">X</div>
            </div>
          </div>

          {/* 链接列 1 */}
          <div className="flex flex-col gap-3">
            <Link href="#" className="hover:text-white">Shipping Policy</Link>
            <Link href="#" className="hover:text-white">Terms & Conditions Policy</Link>
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">Earn Points & Rewards</Link>
            <Link href="#" className="hover:text-white">Contact Us</Link>
            <Link href="#" className="hover:text-white">Affiliate Program</Link>
          </div>

          {/* 链接列 2 */}
          <div className="flex flex-col gap-3">
            <Link href="#" className="hover:text-white">Track My Order</Link>
            <Link href="#" className="hover:text-white">Returns & Refund Policy</Link>
            <Link href="#" className="hover:text-white">Payment Methods</Link>
            <Link href="#" className="hover:text-white">FAQ</Link>
            <Link href="#" className="hover:text-white">Official Brand Authorization</Link>
            <Link href="#" className="hover:text-white">About Us</Link>
          </div>

          {/* 订阅列 */}
          <div>
            <h4 className="text-white font-bold mb-4">Newsletter</h4>
            <p className="text-xs mb-4">Join our newsletter for new offers.</p>
            <div className="flex border border-gray-600 rounded overflow-hidden mb-4">
              <input type="email" placeholder="Enter your email" className="bg-transparent px-3 py-2 w-full outline-none text-white text-sm" />
              <button className="px-4 bg-gray-700 hover:bg-gray-600 transition-colors">→</button>
            </div>
            <button className="bg-[#5a46ff] text-white px-6 py-2 rounded-full w-full hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
              <span className="text-xl">♥</span> Follow on shop
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
