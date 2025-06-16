/**
 * 관리자 페이지 레이아웃
 * 관리자 섹션에 공통으로 적용되는 레이아웃 및 네비게이션
 */

'use client';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* 관리자 헤더 */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">          <div className="mr-4 flex">
            <a href="/" className="mr-2 flex items-center space-x-2">
              <span className="font-bold">My Blog</span>
            </a>
            <div className="text-sm text-muted-foreground">
              <a href="/admin">관리자</a>
            </div>
          </div>          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center space-x-4">
              <a 
                href="/admin" 
                className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
              >
                대시보드
              </a>
              <a 
                href="/admin/posts/create" 
                className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
              >
                글쓰기
              </a>
              <a 
                href="/admin/categories" 
                className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
              >
                카테고리
              </a>
              <a 
                href="/" 
                className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
              >
                사이트로 돌아가기
              </a>
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
