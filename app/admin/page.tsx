'use client';

import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

export default function AdminPage() {
  const { user, isSignedIn, isLoaded } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (isSignedIn && user) {
        try {
          // Admin status can be checked via an API endpoint
          // This is a simplified example
          setIsAdmin(true);
          setLoading(false);
        } catch (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
          setLoading(false);
        }
      } else if (isLoaded && !isSignedIn) {
        setIsAdmin(false);
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [isSignedIn, isLoaded, user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">관리자 권한 확인 중...</p>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-lg p-8 rounded-lg border bg-card shadow">
          <h1 className="text-2xl font-bold mb-4">로그인이 필요합니다</h1>
          <p className="text-muted-foreground mb-6">
            관리자 기능을 사용하려면 로그인이 필요합니다.
          </p>
          <Link 
            href="/auth/sign-in"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
          >
            로그인하기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-16">
      <h1 className="text-3xl font-bold mb-4">관리자 대시보드</h1>
      <p className="text-muted-foreground mb-8">블로그 관리자 기능에 접근하세요.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 게시물 관리 카드 */}
        <div className="rounded-lg border bg-card text-card-foreground shadow transition-all hover:shadow-md">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-xl font-semibold">게시물 관리</h3>
            <p className="text-sm text-muted-foreground">
              게시물 작성, 수정, 삭제 및 관리
            </p>
          </div>
          <div className="p-6 pt-0 flex flex-col gap-3">
            <Link href="/admin/posts/create">
              <button className="inline-flex w-full items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
                새 게시물 작성
              </button>
            </Link>
            <Link href="/posts">
              <button className="inline-flex w-full items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                게시물 목록
              </button>
            </Link>
          </div>
        </div>

        {/* 카테고리 관리 카드 */}
        <div className="rounded-lg border bg-card text-card-foreground shadow transition-all hover:shadow-md">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-xl font-semibold">카테고리 관리</h3>
            <p className="text-sm text-muted-foreground">
              카테고리 생성, 수정, 삭제 및 재설정
            </p>
          </div>
          <div className="p-6 pt-0">
            <Link href="/admin/categories">
              <button className="inline-flex w-full items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
                카테고리 관리
              </button>
            </Link>
          </div>
        </div>

        {/* 댓글 관리 카드 */}
        <div className="rounded-lg border bg-card text-card-foreground shadow transition-all hover:shadow-md">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-xl font-semibold">댓글 관리</h3>
            <p className="text-sm text-muted-foreground">
              댓글 승인, 수정, 삭제 및 관리
            </p>
          </div>
          <div className="p-6 pt-0">
            <button
              disabled
              className="inline-flex w-full items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 opacity-50 cursor-not-allowed"
            >
              준비 중
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center text-sm text-muted-foreground">
        <p>{user?.fullName || '관리자'}님 환영합니다. 블로그 관리 기능을 사용하실 수 있습니다.</p>
      </div>
    </div>
  );
}
