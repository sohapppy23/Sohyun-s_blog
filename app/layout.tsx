import type { Metadata } from "next";
import { Inter, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { Providers } from "./providers";
import Link from "next/link";

// 폰트 설정 - Inter와 Noto Sans KR 조합
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-noto-sans-kr",
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

// SEO 메타데이터 설정
export const metadata: Metadata = {
  title: {
    default: "이소현의 일상생활 일기",
    template: "%s | 이소현의 일상생활 일기",
  },
  description: "영화, 드라마, 뮤지컬, 연극 등 문화생활과 일상을 공유하는 블로그입니다.",
  keywords: ["영화", "드라마", "뮤지컬", "연극", "영상문화", "디지털영상문화콘텐츠", "한신대학교"],
  authors: [{ name: "이소현" }],
  creator: "이소현",
  publisher: "이소현의 일상생활 일기",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  
  // Open Graph 설정
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    title: "이소현의 일상생활 일기",
    description: "영화, 드라마, 뮤지컬, 연극 등 문화생활과 일상을 공유하는 블로그입니다.",
    siteName: "이소현의 일상생활 일기",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "My Blog",
      },
    ],
  },
  // Twitter Card 설정
  twitter: {
    card: "summary_large_image",
    title: "Sohyun's Blog - 다양한 이야기 블로그",
    description: "관람, 제작, 일상, 기타 다양한 주제에 관한 블로그입니다.",
    images: ["/images/og-image.jpg"],
    creator: "@sohyunblog",
  },
  
  // 기타 메타데이터
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // Favicon 설정
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  
  // Manifest 설정
  manifest: "/site.webmanifest",
};

// 뷰포트 설정
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

// 초단순화된 인라인 헤더
const SimpleHeader = () => (
  <header suppressHydrationWarning className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
    <div className="container mx-auto flex h-16 items-center justify-between px-4">
      <Link href="/" className="font-bold text-xl text-purple-600">Sohyun{`'`}s Blog</Link>
      <nav className="hidden md:flex space-x-4">
        <Link href="/" className="text-sm">홈</Link>
        <Link href="/posts" className="text-sm">블로그</Link>
        <Link href="/categories" className="text-sm">카테고리</Link>
        <Link href="/about" className="text-sm">소개</Link>
      </nav>
    </div>
  </header>
);

/**
 * 루트 레이아웃 컴포넌트
 * 전역 레이아웃 및 설정 제공
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <html lang="ko" className={`${inter.variable} ${notoSansKR.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              "name": "Sohyun's Blog",
              "description": "관람, 제작, 일상, 기타 다양한 주제에 관한 블로그",
              "url": process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
              "author": {
                "@type": "Organization",
                "name": "Sohyun's Blog Team"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Sohyun's Blog",
                "logo": {
                  "@type": "ImageObject",
                  "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/images/logo.png`
                }
              },
              "inLanguage": "ko-KR"
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased" suppressHydrationWarning>
        <Providers>
          <div>
            <Header />
            <main className="flex-1">
              <div className="container mx-auto max-w-7xl px-4">
                <div className="relative flex min-h-screen flex-col">
                  {children}
                </div>
              </div>
            </main>
            <Footer />
          </div>
        </Providers>
        
        {/* 접근성을 위한 스킵 링크 */}
        <div className="sr-only">
          <a 
            href="#main-content" 
            className="absolute left-0 top-0 z-50 -translate-y-full transform bg-primary px-4 py-2 text-primary-foreground transition-transform focus:translate-y-0"
          >
            메인 콘텐츠로 건너뛰기
          </a>
        </div>
      </body>
    </html>
  );
}
