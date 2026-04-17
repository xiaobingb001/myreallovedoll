import api from '@/lib/woocommerce';
import Link from 'next/link';
import { ChevronRight, ShieldCheck, Truck, RefreshCcw, Star, Plus, CheckCircle2 } from 'lucide-react';

export const revalidate = 0;

// 模拟评价数据 (因为评价通常需要单独的插件/API获取，这里先用模拟数据完美还原设计稿UI)
const MOCK_REVIEWS =[
  { id: 1, title: "I found exactly what I was looki...", text: "I found exactly what I was looking. With great prices and fast shipping.", name: "Verified Buyer" },
  { id: 2, title: "Excellent product", text: "Excellent product, good delivery time, nicely unmarked packaging", name: "Verified Buyer" },
  { id: 3, title: "They are trustworthy.", text: "They are trustworthy. And It's so much comfortable", name: "Verified Buyer" },
  { id: 4, title: "Works as intended", text: "Ordered the stain remover as well as a TPE repair glue stain remover works ...", name: "Verified Buyer" },
  { id: 5, title: "Everything was perfect", text: "Everything was perfect, perfect feel, perfect quality! The softness of specif...", name: "Verified Buyer" },
];

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let product: any = null;
  let relatedProducts: any[] =[];

  try {
    // 1. 获取当前主商品
    const response = await api.get(`products/${id}`);
    product = response.data;

    // 2. 获取相关推荐商品 (如果有 related_ids 则根据 ID 获取，否则随机获取 4 个作为后备)
    if (product.related_ids && product.related_ids.length > 0) {
      const relatedRes = await api.get("products", {
        include: product.related_ids.slice(0, 4).join(','), // 最多展示 4 个
      });
      relatedProducts = relatedRes.data;
    } else {
      const fallbackRes = await api.get("products", { per_page: 4 });
      relatedProducts = fallbackRes.data;
    }
  } catch (error: any) {
    console.error("WooCommerce API Error:", error.response?.data || error.message);
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10 text-center">
        <h1 className="text-2xl font-bold mb-4 text-red-500">Product Not Found</h1>
        <p className="text-gray-400">Error: {error.message}</p>
        <Link href="/" className="mt-8 text-gray-400 underline">Back to Home</Link>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      
      {/* --- 1. 面包屑导航 --- */}
      <nav className="px-6 py-4 text-xs text-gray-500 flex items-center gap-2 max-w-[1400px] mx-auto">
        <Link href="/" className="hover:text-white">HOME</Link> <ChevronRight size={12} />
        <span className="uppercase">{product.categories?.[0]?.name || 'DOLLS'}</span> <ChevronRight size={12} />
        <span className="text-gray-300 truncate">{product.name}</span>
      </nav>

      {/* --- 2. 核心详情区 (上半部分) --- */}
      <main className="max-w-[1400px] mx-auto px-6 pb-16">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* 左侧：图片展示区 (Sticky 固定) */}
          <div className="md:w-1/2 flex gap-4 self-start sticky top-10">
            <div className="hidden lg:flex flex-col gap-3 w-20">
              {product.images?.map((img: any, idx: number) => (
                <div key={idx} className="aspect-[3/4] border border-gray-800 cursor-pointer hover:border-white transition-all overflow-hidden bg-zinc-900">
                  <img src={img.src} alt="" className="object-cover w-full h-full" />
                </div>
              ))}
            </div>
            <div className="flex-1 relative aspect-[3/4] bg-zinc-900 border border-gray-900 rounded-sm overflow-hidden">
              <img src={product.images?.[0]?.src || '/placeholder.jpg'} alt={product.name} className="w-full h-full object-cover" />
              {product.on_sale && (
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-black text-white text-[10px] px-3 py-1 font-bold rounded-full">SALE</span>
                </div>
              )}
            </div>
          </div>

          {/* 右侧：产品信息区 (可滚动) */}
          <div className="md:w-1/2 flex flex-col gap-6">
            <header>
              <p className="text-xs tracking-widest text-gray-500 mb-2 uppercase">{product.categories?.[0]?.name || 'Category'}</p>
              <h1 className="text-3xl md:text-4xl font-serif leading-tight mb-4">{product.name}</h1>
              <div className="flex items-center gap-4">
                {product.regular_price && product.regular_price !== product.price && (
                  <span className="text-gray-500 line-through text-xl">${product.regular_price}</span>
                )}
                <span className="text-2xl font-bold">${product.price}</span>
              </div>
              <p className="text-[10px] text-gray-500 mt-2">Tax included. <Link href="#" className="underline">Shipping</Link> calculated at checkout.</p>
            </header>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 py-6 border-y border-gray-800 text-center">
              <TrustItem icon={<RefreshCcw size={16}/>} label="MONEY BACK" sub="GUARANTEE" />
              <TrustItem icon={<Truck size={16}/>} label="FREE" sub="SHIPPING" />
              <TrustItem icon={<ShieldCheck size={16}/>} label="DISCREET" sub="SHIPPING" />
              <TrustItem icon={<Star size={16}/>} label="BEST PRICE" sub="GUARANTEE" />
              <TrustItem icon={<RefreshCcw size={16}/>} label="SATISFACTION" sub="GUARANTEE" />
              <TrustItem icon={<ShieldCheck size={16}/>} label="VERIFIED AND" sub="SECURED" />
            </div>

            {/* 规格选择 */}
            <div className="flex flex-col gap-4">
              <label className="text-xs font-bold uppercase tracking-wider">Body</label>
              <select className="bg-black border border-gray-700 p-3 text-sm rounded-full outline-none hover:border-gray-400 transition-all cursor-pointer">
                {product.attributes?.find((a: any) => a.name.toLowerCase() === 'body')?.options.map((opt: string) => (
                  <option key={opt}>{opt}</option>
                )) || <option>Standard Silicone Body</option>}
              </select>
            </div>

            {/* Add to Cart 按钮 */}
            <button className="w-full bg-white text-black font-bold py-4 rounded-full mt-2 hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
               🛒 Add To Cart
            </button>

            {/* Accordions 折叠菜单 */}
            <div className="border-t border-gray-800 mt-8">
              <AccordionItem title="Product Description" content={product.description} />
              <AccordionItem title="Doll Measurements" content="Detailed dimensions will be listed here from WP." />
              <AccordionItem title="Material" content="Medical Grade TPE / Silicone." />
            </div>

            <div className="space-y-4 text-xs text-gray-400 mt-4">
              <p className="flex items-center gap-2"><Truck size={14}/> <strong>Free Discreet Shipping</strong> & <strong>Custom + Duties Paid To US</strong></p>
              <p className="flex items-center gap-2"><Star size={14}/> <strong>18,000+ Happy Customers</strong> | 1,500+ Verified Reviews</p>
            </div>
          </div>
        </div>
      </main>

      {/* ========================================================= */}
      {/* --- 3. 下半部分：相关商品推荐 (Related Products) --- */}
      {/* ========================================================= */}
      {relatedProducts.length > 0 && (
        <section className="bg-[#111] py-16 border-t border-gray-800">
          <div className="max-w-[1400px] mx-auto px-6">
            <h2 className="text-2xl font-serif mb-8 text-white">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rp) => (
                <Link href={`/product/${rp.id}`} key={rp.id} className="group bg-white rounded-md overflow-hidden text-black block hover:shadow-2xl transition-all">
                  <div className="relative aspect-[3/4] bg-gray-200 overflow-hidden">
                    <img 
                      src={rp.images?.[0]?.src || '/placeholder.jpg'} 
                      alt={rp.name} 
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
                    />
                    {rp.on_sale && (
                      <div className="absolute top-2 left-2 bg-black text-white text-[10px] px-2 py-1 font-bold rounded-sm">SALE</div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-[10px] text-gray-500 mb-1 uppercase">{rp.categories?.[0]?.name || 'Sex Doll'}</p>
                    <h4 className="text-sm font-semibold mb-2 h-10 overflow-hidden leading-snug">{rp.name}</h4>
                    <div className="flex items-center gap-2">
                      {rp.regular_price && rp.regular_price !== rp.price && (
                        <span className="text-gray-400 line-through text-xs">${rp.regular_price}</span>
                      )}
                      <span className="font-bold">${rp.price}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* --- 4. 下半部分：用户评价 (Reviews) --- */}
      {/* ========================================================= */}
      <section className="bg-[#f9f9f9] py-12">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex overflow-x-auto gap-4 pb-4 snap-x hide-scrollbar">
            {MOCK_REVIEWS.map((review) => (
              <div key={review.id} className="min-w-[280px] md:min-w-[320px] bg-white border border-gray-200 p-5 rounded-md snap-center shadow-sm">
                <div className="flex items-center gap-1 mb-2 text-[#00b67a]">
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <span className="text-gray-400 flex items-center gap-1 text-[10px] ml-2 font-bold">
                    <CheckCircle2 size={12} className="text-gray-400" /> Verified
                  </span>
                </div>
                <h5 className="font-bold text-black text-sm mb-2">{review.title}</h5>
                <p className="text-xs text-gray-600 leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

// === 辅助子组件保持不变 ===
function TrustItem({ icon, label, sub }: { icon: any, label: string, sub: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="text-gray-400 mb-1">{icon}</div>
      <p className="text-[8px] font-bold leading-tight text-gray-300">{label}</p>
      <p className="text-[8px] font-bold leading-tight text-gray-300">{sub}</p>
    </div>
  )
}

function AccordionItem({ title, content }: { title: string, content: string }) {
  return (
    <div className="border-b border-gray-800 py-4 group cursor-pointer">
      <div className="flex justify-between items-center text-sm font-medium uppercase tracking-widest text-gray-300">
        <span>{title}</span>
        <Plus size={16} className="text-gray-500 group-hover:text-white transition-colors" />
      </div>
      <div className="mt-4 text-sm text-gray-400 leading-relaxed prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}