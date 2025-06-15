/**
 * 소개 페이지
 * 블로그 운영자에 대한 정보와 블로그의 목적을 설명합니다.
 */

import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "소개",
  description: "이소현의 일상생활 일기 - 블로그 소개 및 운영자 정보",
};

export default function AboutPage() {
  return (
    <div className="container py-16 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">블로그 소개</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          안녕하세요, 이소현의 일상생활 일기에 오신 것을 환영합니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
        <div className="md:col-span-1">
          <div className="sticky top-24 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="aspect-square relative overflow-hidden rounded-full mx-auto mb-4 w-40 h-40 border-4 border-primary/10">
                  <Image
                    src="/default-avatar.svg"
                    alt="이소현"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <h2 className="text-xl font-bold text-center mb-2">이소현</h2>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  한신대학교 디지털영상문화콘텐츠학과
                </p>
                <div className="flex justify-center gap-2 mt-4">
                  <Button variant="outline" size="icon" asChild>
                    <Link href="mailto:contact@example.com" aria-label="이메일">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail">
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="인스타그램">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                      </svg>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="md:col-span-2 space-y-8">
          <section className="prose prose-lg dark:prose-invert max-w-none">
            <h2>소개</h2>
            <p>
              안녕하세요! 저는 한신대학교 디지털영상문화콘텐츠학과에 재학 중인 이소현입니다.
            </p>
            
            <p>
              <strong>소속:</strong> 한신대학교 디지텰영상문화콘텐츠학과
            </p>
            
            <p>
              <strong>관심:</strong> 현재 뮤지컬 공연에 제일 관심이 많고 단편영화 촬영등 연출일에 관심이 있습니다. 영화, 드라마, 뮤지컬, 연극 등을 보는것을 좋아합니다.
            </p>
            
            <p>
              이 블로그는 제가 일상에서 경험하는 다양한 문화 콘텐츠와 생각들을 기록하고 공유하는 공간입니다. 특히 뮤지컬과 영화에 관한 리뷰와 감상, 그리고 미디어 콘텐츠 제작에 관한 이야기를 주로 다룰 예정입니다.
            </p>

            <h2>블로그 주요 내용</h2>
            <ul>
              <li>뮤지컬 및 공연 리뷰</li>
              <li>영화 및 드라마 감상</li>
              <li>디지털 영상 제작 과정</li>
              <li>대학 생활과 학과 활동</li>
              <li>문화예술 관련 에세이</li>
            </ul>

            <h2>연락 및 소통</h2>
            <p>
              블로그 글에 대한 의견이나 문의사항은 댓글 또는 이메일로 연락 주시면 감사하겠습니다. 함께 소통하며 문화적 경험을 나누고 싶습니다.
            </p>
          </section>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild>
              <Link href="/posts">
                최신 글 보러가기
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">
                홈으로 돌아가기
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
