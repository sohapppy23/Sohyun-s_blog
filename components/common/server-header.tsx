/**
 * 서버 컴포넌트 헤더
 * 하이드레이션 없이 서버에서 렌더링
 */

import React from 'react';

export default function ServerHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <a href="/" className="font-bold text-xl text-purple-600">Sohyun's Blog</a>
        <nav className="hidden md:flex space-x-4">
          <a href="/" className="text-sm">홈</a>
          <a href="/posts" className="text-sm">블로그</a>
          <a href="/categories" className="text-sm">카테고리</a>
          <a href="/about" className="text-sm">소개</a>
        </nav>
        <div className="md:hidden">
          <a href="#" className="text-sm px-3 py-2 border rounded">메뉴</a>
        </div>
      </div>
    </header>
  );
}
