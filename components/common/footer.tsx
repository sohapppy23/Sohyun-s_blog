/**
 * 블로그 푸터 컴포넌트
 * 사이트 정보 및 부가 링크 제공
 * 반응형 디자인으로 모든 화면 크기에서 최적화
 */

import Link from 'next/link';

// 푸터 네비게이션 링크 타입 정의
interface FooterLink {
  name: string;
  href: string;
  description: string;
}

// 푸터 네비게이션 링크들
const footerLinks: FooterLink[] = [
  { name: '소개', href: '/about', description: '블로그 소개 보기' },
  { name: '개인정보처리방침', href: '/privacy', description: '개인정보 보호정책' },
  { name: '이용약관', href: '/terms', description: '서비스 이용약관' },
  { name: '관리자', href: '/admin', description: '관리자 페이지' },
  { name: '카테고리 관리', href: '/admin/categories', description: '카테고리 관리 페이지' },
  { name: '연락처', href: '/contact', description: '문의하기' },
];

export default function Footer() {
  // 현재 연도 자동 계산
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-background/95 py-4">
      <div className="container mx-auto max-w-7xl px-4">
        
        {/* 상단 메뉴 네비게이션 - 사진에 있는 상단 메뉴 추가 */}
        <div className="hidden md:flex justify-end mb-2">
          <nav className="flex items-center space-x-6 text-sm">
            <Link href="/about" className="hover:text-foreground transition-colors text-muted-foreground">
              소개
            </Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors text-muted-foreground">
              개인정보처리방침
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors text-muted-foreground">
              이용약관
            </Link>
            <Link href="/admin" className="hover:text-foreground transition-colors text-muted-foreground">
              관리자
            </Link>
            <Link href="/admin/categories" className="hover:text-foreground transition-colors text-muted-foreground">
              카테고리 관리
            </Link>
            <Link href="/contact" className="hover:text-foreground transition-colors text-muted-foreground">
              연락처
            </Link>
          </nav>
        </div>

        {/* 저작권 정보 */}
        <div className="flex flex-col items-center text-center border-t pt-2">
          <div className="flex items-center space-x-2 mb-1">
            <div className="h-6 w-6 rounded-md bg-purple-400 flex items-center justify-center">
              <span className="text-white font-bold text-sm" aria-hidden="true">
                B
              </span>
            </div>
            <span className="font-bold text-purple-600">My Blog</span>
          </div>
          
          <p className="text-sm text-muted-foreground">
            © {currentYear} My Blog. All rights reserved.
          </p>
          
          <p className="text-xs text-muted-foreground mt-1">
            관람, 제작, 일상, 기타 다양한 주제의 블로그 • Built with Next.js
          </p>
          
          {/* 추가 정보 - 사진에 있는 RSS, GitHub, 한국어 */}
          <div className="flex items-center space-x-2 mt-2 text-xs text-muted-foreground">
            <Link 
              href="/rss.xml" 
              className="hover:text-foreground transition-colors"
              title="RSS 피드"
            >
              RSS
            </Link>
            <span>•</span>
            <Link 
              href="https://github.com/sohapppy23/Sohyun-s_blog" 
              className="hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub에서 소스코드 보기"
            >
              GitHub
            </Link>
            <span>•</span>
            <span>한국어</span>
          </div>
        </div>

        {/* 모바일에서 간소화된 링크 */}
        <div className="md:hidden mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
