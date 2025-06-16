'use client';

/**
 * 초단순화된 헤더 컴포넌트
 * 하이드레이션 이슈 해결을 위해 최소한의 요소만 사용
 */

import { useState } from 'react';
import { Menu, X, PlusCircle } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';

// 네비게이션 메뉴 항목
const navItems = [
  { name: '홈', href: '/' },
  { name: '블로그', href: '/posts' },
  { name: '카테고리', href: '/categories' },
  { name: '소개', href: '/about' },
];

export default function MinimalHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  // 현재 경로가 주어진 경로와 일치하는지 확인
  const isActivePath = (path: string): boolean => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };
  
  return (
    <div suppressHydrationWarning>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* 로고 */}
          <div>
            <a href="/">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-md bg-purple-400 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <span className="font-bold text-xl text-purple-600">Sohyun's Blog</span>
              </div>
            </a>
          </div>
            {/* 데스크탑 메뉴 */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <a 
                key={item.href}
                href={item.href}
                className={`text-sm font-medium px-2 py-1 transition-colors ${
                  isActivePath(item.href)
                    ? 'text-primary font-semibold'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>
          
          {/* 인증 버튼 */}
          <div className="flex items-center space-x-4">
            <SignedIn>
              <a 
                href="/admin/posts/create"
                className="hidden md:flex text-sm px-4 py-2 border rounded-md"
              >
                새 글 작성
              </a>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="outline" size="sm" className="hidden md:flex">
                  로그인
                </Button>
              </SignInButton>
            </SignedOut>
            
            {/* 모바일 메뉴 */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                
                <SheetContent side="right">
                  <SheetHeader className="text-left">
                    <h3 className="font-medium">메뉴</h3>
                  </SheetHeader>
                  
                  <div className="mt-6 flex flex-col space-y-4">                    {navItems.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`text-sm px-3 py-2 ${
                          isActivePath(item.href)
                            ? 'text-primary font-semibold'
                            : 'text-muted-foreground'
                        }`}
                      >
                        {item.name}
                      </a>
                    ))}
                    
                    <SignedIn>
                      <div className="mt-4 pt-4 border-t">
                        <a
                          href="/admin/posts/create"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center space-x-2 text-sm px-3 py-2"
                        >
                          <PlusCircle className="h-4 w-4" />
                          <span>새 글 작성</span>
                        </a>
                      </div>
                    </SignedIn>
                    
                    <SignedOut>
                      <div className="mt-4 pt-4 border-t">
                        <SignInButton mode="modal">
                          <Button variant="outline" className="w-full">
                            로그인
                          </Button>
                        </SignInButton>
                      </div>
                    </SignedOut>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
