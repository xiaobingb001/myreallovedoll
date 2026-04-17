'use client'; // 必须放在第一行，声明这是客户端组件

import { useState, useEffect } from 'react';

const MOCK_SLIDES =[
  {
    id: 1,
    image: '/banner01.jpg', // 确保你的 public 文件夹里有这些图片
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

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // 设置自动轮播定时器，每 5 秒切换一次
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === MOCK_SLIDES.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[650px] flex items-center justify-start px-12 md:px-24 bg-black overflow-hidden">
      {MOCK_SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10"></div>
          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
        </div>
      ))}

      <div className="relative z-20 max-w-2xl">
        <h2 key={`title-${currentSlide}`} className="text-6xl font-serif mb-4 text-white animate-fadeIn">
          {MOCK_SLIDES[currentSlide].title}
        </h2>
        <p key={`sub-${currentSlide}`} className="text-xl mb-8 text-gray-300 italic animate-fadeIn">
          {MOCK_SLIDES[currentSlide].subtitle}
        </p>
        <button className="border border-yellow-600/50 text-white px-8 py-3 text-sm tracking-widest hover:bg-yellow-600/20 transition-all shadow-[0_0_15px_rgba(202,138,4,0.3)]">
          EXPLORE COLLECTION
        </button>
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
  );
}