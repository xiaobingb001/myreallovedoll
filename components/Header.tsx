'use client'; // 声明这是一个客户端组件

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const[lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 如果当前向下滚动，并且滚动距离超过 80px (防止在最顶部抖动)，则隐藏导航栏
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        // 如果向上滚动，或者在页面最顶部，则显示导航栏
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    // 监听滚动事件
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // 清除监听器，防止内存泄漏
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md py-4 text-center transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <Link href="/" className="inline-block">
        <img src="/logo.jpg" alt="MyRealDoll Logo" className="h-12 md:h-16 object-contain mx-auto" />
      </Link>
    </header>
  );
}