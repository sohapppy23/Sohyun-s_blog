import type { Metadata } from "next";
import { Inter, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { Providers } from "./providers";

// ?고듃 ?ㅼ젙 - Inter? Noto Sans KR 議고빀
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

// SEO 硫뷀??곗씠???ㅼ젙
export const metadata: Metadata = {
  title: {
    default: "?댁냼?꾩쓽 ?쇱긽?앺솢 ?쇨린",
    template: "%s | ?댁냼?꾩쓽 ?쇱긽?앺솢 ?쇨린",
  },
  description: "?곹솕, ?쒕씪留? 裕ㅼ?而? ?곌레 ??臾명솕?앺솢怨??쇱긽??怨듭쑀?섎뒗 釉붾줈洹몄엯?덈떎.",
  keywords: ["?곹솕", "?쒕씪留?, "裕ㅼ?而?, "?곌레", "?곸긽臾명솕", "?붿??몄쁺?곷Ц?붿퐯?먯툩", "?쒖떊??숆탳"],
  authors: [{ name: "?댁냼?? }],
  creator: "?댁냼??,
  publisher: "?댁냼?꾩쓽 ?쇱긽?앺솢 ?쇨린",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  
  // Open Graph ?ㅼ젙
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    title: "?댁냼?꾩쓽 ?쇱긽?앺솢 ?쇨린",
    description: "?곹솕, ?쒕씪留? 裕ㅼ?而? ?곌레 ??臾명솕?앺솢怨??쇱긽??怨듭쑀?섎뒗 釉붾줈洹몄엯?덈떎.",
    siteName: "?댁냼?꾩쓽 ?쇱긽?앺솢 ?쇨린",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "My Blog",
      },
    ],
  },
  // Twitter Card ?ㅼ젙
  twitter: {
    card: "summary_large_image",
    title: "Sohyun's Blog - ?ㅼ뼇???댁빞湲?釉붾줈洹?,
    description: "愿?? ?쒖옉, ?쇱긽, 湲고? ?ㅼ뼇??二쇱젣??愿??釉붾줈洹몄엯?덈떎.",
    images: ["/images/og-image.jpg"],
    creator: "@sohyunblog",
  },
  
  // 湲고? 硫뷀??곗씠??
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
  
  // Favicon ?ㅼ젙
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  
  // Manifest ?ㅼ젙
  manifest: "/site.webmanifest",
};

// 酉고룷???ㅼ젙
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

// 珥덈떒?쒗솕???몃씪???ㅻ뜑
const SimpleHeader = () => (
  <header suppressHydrationWarning={true} className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
    <div className="container mx-auto flex h-16 items-center justify-between px-4">
      <a href="/" className="font-bold text-xl text-purple-600">Sohyun's Blog</a>
      <nav className="hidden md:flex space-x-4">
        <a href="/" className="text-sm">??/a>
        <a href="/posts" className="text-sm">釉붾줈洹?/a>
        <a href="/categories" className="text-sm">移댄뀒怨좊━</a>
        <a href="/about" className="text-sm">?뚭컻</a>
      </nav>
    </div>
  </header>
);

/**
 * 猷⑦듃 ?덉씠?꾩썐 而댄룷?뚰듃
 * ?꾩뿭 ?덉씠?꾩썐 諛??ㅼ젙 ?쒓났
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${inter.variable} ${notoSansKR.variable}`} suppressHydrationWarning>
      <head>
        {/* 援ъ“?붾맂 ?곗씠??- ?뱀궗?댄듃 ?뺣낫 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              "name": "Sohyun's Blog",
              "description": "愿?? ?쒖옉, ?쇱긽, 湲고? ?ㅼ뼇??二쇱젣??愿??釉붾줈洹?,
              "url": process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
              "author": {
                "@type": "Organization",                "name": "Sohyun's Blog Team"
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
        /></head>
      <body suppressHydrationWarning className="min-h-screen bg-background font-sans antialiased">
        <Providers>
          <div suppressHydrationWarning>
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
        
        {/* ?묎렐?깆쓣 ?꾪븳 ?ㅽ궢 留곹겕 */}
        <div className="sr-only">
          <a 
            href="#main-content" 
            className="absolute left-0 top-0 z-50 -translate-y-full transform bg-primary px-4 py-2 text-primary-foreground transition-transform focus:translate-y-0"
          >
            硫붿씤 肄섑뀗痢좊줈 嫄대꼫?곌린
          </a>
        </div>
      </body>
    </html>
  );
}

