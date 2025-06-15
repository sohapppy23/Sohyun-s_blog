"use client";

import Link from 'next/link';

export default function AdminCategoriesPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">카테고리 관리</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* 카테고리 재설정 카드 */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-xl font-semibold">카테고리 재설정</h2>
            <p className="text-sm text-muted-foreground">
              카테고리를 "관람", "제작", "일상", "기타"로 재설정합니다.
            </p>
          </div>
          <div className="p-6 pt-0">
            <Link href="/admin/categories/reset">
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full">
                카테고리 재설정 페이지로 이동
              </button>
            </Link>
          </div>
        </div>
        
        {/* 카테고리 목록 보기 */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-xl font-semibold">카테고리 목록</h2>
            <p className="text-sm text-muted-foreground">
              현재 등록된 모든 카테고리 확인 및 관리
            </p>
          </div>
          <div className="p-6 pt-0">
            <Link href="/categories">
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full">
                카테고리 목록으로 이동
              </button>
            </Link>
          </div>
        </div>

        {/* 간편 카테고리 재설정 카드 */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-xl font-semibold">간편 카테고리 재설정</h2>
            <p className="text-sm text-muted-foreground">
              UI 종속성 없는 간편 재설정 페이지 (오류 해결용)
            </p>
          </div>
          <div className="p-6 pt-0">
            <Link href="/admin/categories/quick-reset">
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-red-500 text-white shadow hover:bg-red-600 h-9 px-4 py-2 w-full">
                간편 재설정 페이지로 이동
              </button>
            </Link>
          </div>
        </div>
        
        {/* 직접 재설정 HTML 페이지 */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-xl font-semibold">HTML 직접 재설정</h2>
            <p className="text-sm text-muted-foreground">
              정적 HTML 페이지로 직접 재설정 (인증 없음)
            </p>
          </div>
          <div className="p-6 pt-0">
            <a href="/simple-category-reset.html" target="_blank" rel="noopener noreferrer">
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-gray-600 text-white shadow hover:bg-gray-700 h-9 px-4 py-2 w-full">
                HTML 페이지 열기
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
