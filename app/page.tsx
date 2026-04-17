import Link from 'next/link';
import api from '@/lib/woocommerce'; 
import HeroSlider from '@/components/HeroSlider'; // 引入轮播图组件

export const revalidate = 0; // 强制每次请求都重新从 WordPress 获取最新数据

const MOCK_BRANDS =['Starpery', 'SE Doll', 'GameLady', 'Real Lady', 'Angel Kiss', 'Doll Castle'];

// 定义商品接口类型
interface WooProduct {
  id: number;
  name: string;
  price: string;
  images: { src: string }[];
  categories: { name: string }[];
}

export default async function Home() {
  let products: WooProduct[] =[];
  
  try {
    // 从后端获取最新的 8 个已发布商品
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
        <Link href="/" className="inline-block">
          {/* src="/logo.jpg" 会自动去 public 文件夹里找这个图片 */}
          <img src="/logo.jpg" alt="MyRealDoll Logo" className="h-16 object-contain mb-2 mx-auto" />
        </Link>
      </header>

      {/* --- Hero Section 焦点轮播图 (独立组件) --- */}
      <HeroSlider />

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

      {/* --- Product Grid 核心产品区 --- */}
      <section className="bg-[#000000] py-16 px-4 md:px-12">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-bold mb-2 uppercase tracking-wide">❤️ THE SEXIEST COLLECTION SO FAR ❤️</h3>
          <p className="text-sm text-gray-300 mb-8">Chocolate Lady Dolls. Delicious. Limited availability.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {products.length > 0 ? (
              products.map((product) => (
                <Link href={`/product/${product.id}`} key={product.id} className="group bg-white rounded-md overflow-hidden text-black block hover:shadow-2xl transition-all">
                  <div className="relative aspect-[3/4] bg-gray-200">
                    <img 
                      src={product.images?.[0]?.src || '/placeholder.jpg'} 
                      alt={product.name} 
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] px-2 py-1 font-bold rounded-sm">Lady</div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-sm font-semibold mb-1 h-10 overflow-hidden leading-snug">{product.name}</h4>
                    <p className="text-[10px] text-gray-500 mb-2 uppercase">
                      {product.categories?.[0]?.name || 'Uncategorized'}
                    </p>
                    <p className="font-bold">${product.price}</p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-white text-center w-full col-span-full py-10">Loading products...</p>
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

      {/* --- Google Map 实体店地图区 --- */}
      <section className="w-full h-[400px] bg-black filter grayscale hover:grayscale-0 transition-all duration-500">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3262.1158525049386!2d33.37699991524316!3d35.15372338032049!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14de1761922cbfff%3A0x8929e083c5090f7f!2sIheart%20coffee%20roaster!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={false} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>

    </div>
  );
}