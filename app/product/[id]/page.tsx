import api from '@/lib/woocommerce';
import Link from 'next/link';
import { ChevronRight, ShieldCheck, Truck, RefreshCcw, CreditCard, Star, Plus } from 'lucide-react';

export const revalidate = 0;

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  let product: any = null;

  try {
    const response = await api.get(`products/${id}`);
    product = response.data;
  } catch (error) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Product Not Found</div>;
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      
      {/* 1. Breadcrumbs 导航 */}
      <nav className="px-6 py-4 text-xs text-gray-500 flex items-center gap-2 max-w-[1400px] mx-auto">
        <Link href="/" className="hover:text-white">HOME</Link> <ChevronRight size={12} />
        <span className="uppercase">{product.categories?.[0]?.name || 'DOLLS'}</span> <ChevronRight size={12} />
        <span className="text-gray-300 truncate">{product.name}</span>
      </nav>

      <main className="max-w-[1400px] mx-auto px-6 pb-20">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* --- 左侧：图片展示区 (Sticky) --- */}
          <div className="md:w-1/2 flex gap-4 self-start sticky top-10">
            {/* 缩略图列 (左侧小图) */}
            <div className="hidden lg:flex flex-col gap-3 w-20">
              {product.images?.map((img: any, idx: number) => (
                <div key={idx} className="aspect-[3/4] border border-gray-800 cursor-pointer hover:border-white transition-all overflow-hidden">
                  <img src={img.src} alt="" className="object-cover w-full h-full" />
                </div>
              ))}
            </div>
            {/* 主图 */}
            <div className="flex-1 relative aspect-[3/4] bg-[#111]">
              <img src={product.images?.[0]?.src} alt={product.name} className="w-full h-full object-cover" />
              {product.on_sale && (
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-red-600 text-white text-[10px] px-2 py-1 font-bold">SALE</span>
                  <span className="bg-white text-black text-[10px] px-2 py-1 font-bold">10% OFF</span>
                </div>
              )}
            </div>
          </div>

          {/* --- 右侧：产品信息区 (可滚动) --- */}
          <div className="md:w-1/2 flex flex-col gap-6">
            <header>
              <p className="text-xs tracking-widest text-gray-500 mb-2">ZELEX® Inspiration Series</p>
              <h1 className="text-3xl md:text-4xl font-serif leading-tight mb-4">{product.name}</h1>
              <div className="flex items-center gap-4">
                <span className="text-gray-500 line-through text-xl">${product.regular_price}</span>
                <span className="text-2xl font-bold">${product.price}</span>
              </div>
              <p className="text-[10px] text-gray-500 mt-2">Tax included. <Link href="#" className="underline">Shipping</Link> calculated at checkout.</p>
            </header>

            {/* 2. Trust Badges 信任条 */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 py-6 border-y border-gray-800 text-center">
              <TrustItem icon={<RefreshCcw size={16}/>} label="MONEY BACK" sub="GUARANTEE" />
              <TrustItem icon={<Truck size={16}/>} label="FREE" sub="SHIPPING" />
              <TrustItem icon={<ShieldCheck size={16}/>} label="DISCREET" sub="SHIPPING" />
              <TrustItem icon={<Star size={16}/>} label="BEST PRICE" sub="GUARANTEE" />
              <TrustItem icon={<RefreshCcw size={16}/>} label="SATISFACTION" sub="GUARANTEE" />
              <TrustItem icon={<ShieldCheck size={16}/>} label="VERIFIED AND" sub="SECURED" />
            </div>

            {/* 3. Variant Selection 规格选择 (从 WooCommerce 属性获取) */}
            <div className="flex flex-col gap-4">
              <label className="text-xs font-bold uppercase tracking-wider">Body</label>
              <select className="bg-black border border-gray-700 p-3 text-sm rounded-full outline-none hover:border-gray-400 transition-all cursor-pointer">
                {product.attributes?.find((a: any) => a.name.toLowerCase() === 'body')?.options.map((opt: string) => (
                  <option key={opt}>{opt}</option>
                )) || <option>Standard Silicone Body</option>}
              </select>
            </div>

            {/* 4. Add to Cart 按钮 */}
            <button className="w-full bg-white text-black font-bold py-4 rounded-full mt-2 hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
               🛒 Add To Cart
            </button>

            {/* 5. Payment Methods 支付图标 */}
            <div className="flex justify-center gap-3 py-4 grayscale opacity-70">
              {/* 这里放支付小图标图片 */}
              <div className="w-8 h-5 bg-gray-800 rounded"></div>
              <div className="w-8 h-5 bg-gray-800 rounded"></div>
              <div className="w-8 h-5 bg-gray-800 rounded"></div>
              <div className="w-8 h-5 bg-gray-800 rounded"></div>
            </div>

            {/* 6. Accordions 折叠菜单项 */}
            <div className="border-t border-gray-800 mt-4">
              <AccordionItem title="Product Description" content={product.description} />
              <AccordionItem title="Doll Measurements" content="Detailed dimensions will be listed here from WP." />
              <AccordionItem title="Material" content="Medical Grade TPE / Silicone." />
              <AccordionItem title="Authorized Seller" content="Official Licensed Partner." />
            </div>

            {/* 7. Additional Info 底部小字 */}
            <div className="space-y-4 text-xs text-gray-400 mt-6">
              <p className="flex items-center gap-2"><Truck size={14}/> <strong>Free Discreet Shipping</strong> & <strong>Custom + Duties Paid To US</strong></p>
              <p className="flex items-center gap-2"><Star size={14}/> <strong>18,000+ Happy Customers</strong> | 1,500+ Verified Reviews</p>
            </div>
          </div>
        </div>
      </main>

      {/* 这里可以放置之前的 Related Products 和 Footer */}
    </div>
  );
}

// 信任图标子组件
function TrustItem({ icon, label, sub }: { icon: any, label: string, sub: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="text-gray-400 mb-1">{icon}</div>
      <p className="text-[8px] font-bold leading-tight">{label}</p>
      <p className="text-[8px] font-bold leading-tight">{sub}</p>
    </div>
  )
}

// 折叠菜单子组件
function AccordionItem({ title, content }: { title: string, content: string }) {
  return (
    <div className="border-b border-gray-800 py-4 group cursor-pointer">
      <div className="flex justify-between items-center text-sm font-medium uppercase tracking-widest">
        <span>{title}</span>
        <Plus size={16} className="text-gray-500 group-hover:text-white transition-colors" />
      </div>
      {/* 默认展开一部分或完全展开，取决于需求 */}
      <div className="mt-4 text-sm text-gray-500 leading-relaxed prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}