/**
 * 관리자 페이지 레이아웃
 * 관리자 섹션에 공통으로 적용되는 레이아웃 및 네비게이션
 */

import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '관리자 | My Blog',
  description: '블로그 관리자 기능',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* 관리자 헤더 */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-2 flex items-center space-x-2">
              <span className="font-bold">My Blog</span>
            </Link>
            <div className="text-sm text-muted-foreground">
              <Link href="/admin">관리자</Link>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center space-x-4">
              <Link 
                href="/admin" 
                className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
              >
                대시보드
              </Link>
              <Link 
                href="/admin/posts/create" 
                className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
              >
                글쓰기
              </Link>
              <Link 
                href="/admin/categories" 
                className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
              >
                카테고리
              </Link>
              <Link 
                href="/" 
                className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
              >
                사이트로 돌아가기
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* 페이지 콘텐츠 */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
