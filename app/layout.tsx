import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import Header from "@/components/Header"; // 引入刚才写的智能 Header 组件

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 网站全局的 SEO 标题和描述
export const metadata: Metadata = {
  title: "MyRealDoll | Ultra Realistic Companions",
  description: "Premium realistic silicone sex dolls designed for intimacy & comfort.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* 确保全站默认是黑底白字 */}
      <body className="min-h-full flex flex-col bg-black text-white" suppressHydrationWarning>
        
        {/* --- 智能 Header 顶部导航 --- */}
        <Header />

        {/* --- 页面主体内容区 --- */}
        <main className="flex-1">
          {children}
        </main>

        {/* --- 全局页脚 Footer --- */}
        <footer className="bg-[#000000] text-gray-300 py-16 px-4 md:px-12 text-sm border-t-4 border-gray-800">
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
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-black font-bold">f</div>
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-black font-bold">IG</div>
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-black font-bold">X</div>
              </div>
            </div>

            {/* 链接列 1 */}
            <div className="flex flex-col gap-3">
              <Link href="#" className="hover:text-white transition-colors">Shipping Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms & Conditions Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Earn Points & Rewards</Link>
              <Link href="#" className="hover:text-white transition-colors">Contact Us</Link>
              <Link href="#" className="hover:text-white transition-colors">Affiliate Program</Link>
            </div>

            {/* 链接列 2 */}
            <div className="flex flex-col gap-3">
              <Link href="#" className="hover:text-white transition-colors">Track My Order</Link>
              <Link href="#" className="hover:text-white transition-colors">Returns & Refund Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Payment Methods</Link>
              <Link href="#" className="hover:text-white transition-colors">FAQ</Link>
              <Link href="#" className="hover:text-white transition-colors">Official Brand Authorization</Link>
              <Link href="#" className="hover:text-white transition-colors">About Us</Link>
            </div>

            {/* 订阅列 */}
            <div>
              <h4 className="text-white font-bold mb-4">Newsletter</h4>
              <p className="text-xs mb-4">Join our newsletter for new offers.</p>
              <div className="flex border border-gray-600 rounded overflow-hidden mb-4">
                <input type="email" placeholder="Enter your email" className="bg-transparent px-3 py-2 w-full outline-none text-white text-sm" />
                <button className="px-4 bg-gray-700 hover:bg-gray-600 transition-colors">→</button>
              </div>
              <button className="bg-[#5a46ff] text-white px-6 py-2 rounded-full w-full hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 font-bold">
                <span className="text-xl">♥</span> Follow on shop
              </button>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}