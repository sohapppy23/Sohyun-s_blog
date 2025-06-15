/**
 * 소개 페이지
 * 블로그 운영자에 대한 정보와 블로그의 목적을 설명합니다.
 */

import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export const metadata: Metadata = {
  title: "소개",
  description: "이소현의 일상생활 일기 - 블로그 소개 및 운영자 정보",
};

export default function AboutPage() {
  return (
    <div className="container py-16 max-w-5xl mx-auto">
      {/* 헤더 섹션 */}
      <div className="text-center mb-16 relative">
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-full h-40 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 rounded-full blur-3xl -z-10"></div>
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text animate-pulse">
          ABOUT MY BLOG
        </h1>
        <div className="flex justify-center mb-4">
          <Badge variant="outline" className="px-4 py-1 text-base font-medium border-2 border-primary/30">
            ✨ 이소현의 디지털 스토리텔링 ✨
          </Badge>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          안녕하세요, 이소현의 블로그에 오신 것을 환영합니다! 🎉
        </p>
      </div>      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">        {/* 프로필 카드 */}
        <Card className="md:col-span-1 border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-b from-card to-card/50 overflow-hidden group relative">
          {/* 배경 효과 */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
          <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -top-16 -left-16 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl"></div>
          
          {/* 프로필 헤더 */}
          <CardHeader className="text-center relative pb-2">
            <div className="absolute top-0 right-0 left-0 h-24 bg-gradient-to-r from-pink-500/40 via-purple-500/40 to-blue-500/40 -z-10"></div>
            
            {/* 프로필 이미지 */}
            <div className="flex justify-center mb-3 mt-3">
              <div className="relative transform group-hover:scale-105 transition-all duration-500">                {/* 회전하는 테두리 효과 */}
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full blur opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* 빛나는 효과 */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-500"></div>
                
                {/* 실제 아바타 */}
                <Avatar className="h-40 w-40 border-4 border-background relative transform group-hover:rotate-3 transition-transform duration-500">                  <AvatarImage src="/default-avatar.png" alt="SOHYUN" className="scale-105" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 text-xl font-bold text-indigo-600">SOHYUN</AvatarFallback>
                </Avatar>
                
                {/* 작은 표시 아이콘 */}
                <div className="absolute bottom-1 right-1 bg-background rounded-full p-1 border-2 border-primary/20 shadow-md transform group-hover:scale-110 transition-transform duration-300">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                    <span className="text-xs text-white">✨</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 이름과 학과 */}
            <div className="space-y-1 mt-1">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text transform group-hover:scale-105 transition-transform duration-300">이소현 Lee Sohyun</CardTitle>
              <CardDescription className="text-lg">
                <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text font-medium">
                  디지털영상문화콘텐츠학과
                </span>
              </CardDescription>
            </div>
          </CardHeader>
          
          {/* 프로필 콘텐츠 */}
          <CardContent className="relative z-10 px-5">
            <div className="bg-background/80 rounded-lg backdrop-blur-sm shadow-inner border border-primary/10 transform group-hover:translate-y-1 transition-transform duration-500">
              <ul className="divide-y divide-primary/10">
                <li className="flex items-center gap-3 p-3 hover:bg-primary/5 rounded-t-lg transition-colors duration-300">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 shadow-inner">
                    <span className="text-xl">🏫</span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">학교</p>
                    <p className="font-medium">한신대학교</p>
                  </div>
                </li>
                <li className="flex items-center gap-3 p-3 hover:bg-primary/5 transition-colors duration-300">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 shadow-inner">
                    <span className="text-xl">👩‍🎓</span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">학년</p>
                    <p className="font-medium">3학년</p>
                  </div>
                </li>
                <li className="flex items-center gap-3 p-3 hover:bg-primary/5 rounded-b-lg transition-colors duration-300">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 shadow-inner">
                    <span className="text-xl">📧</span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">이메일</p>
                    <p className="font-medium">sohappy23@hs.ac.kr</p>
                  </div>
                </li>
              </ul>
            </div>
          </CardContent>
          
          {/* 프로필 푸터 */}
          <CardFooter className="flex justify-center relative z-10 pt-0">
            <div className="flex gap-4">
              <Button variant="outline" size="icon" asChild className="rounded-full bg-gradient-to-br from-background/90 to-background/70 backdrop-blur-sm hover:bg-primary/20 transition-all duration-300 border-2 border-primary/20 shadow-md hover:shadow-lg transform hover:scale-110">
                <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </Link>
              </Button>
              <Button variant="outline" size="icon" asChild className="rounded-full bg-gradient-to-br from-background/90 to-background/70 backdrop-blur-sm hover:bg-primary/20 transition-all duration-300 border-2 border-primary/20 shadow-md hover:shadow-lg transform hover:scale-110">
                <Link href="mailto:sohappy23@hs.ac.kr">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>        {/* 주요 내용 섹션 */}
        <div className="md:col-span-2">
          <Card className="h-full border-2 border-primary/20 shadow-lg overflow-hidden group relative">
            {/* 배경 효과 */}
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
            <div className="absolute -top-10 right-10 w-60 h-60 bg-pink-500/10 rounded-full blur-3xl -z-0 opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>
            <div className="absolute -bottom-10 left-10 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl -z-0 opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>
            
            {/* 헤더 섹션 */}
            <CardHeader className="bg-gradient-to-r from-background via-accent/30 to-background border-b relative">
              <div className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l from-pink-500/10 to-transparent"></div>
              <CardTitle className="text-2xl flex items-center gap-3 relative z-10">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-primary/10 shadow-md transform group-hover:rotate-12 transition-transform duration-500">
                  <span className="text-2xl">👋</span>
                </div>
                <div>
                  <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text font-bold">
                    블로그 소개
                  </span>
                  <div className="h-1 w-full bg-gradient-to-r from-pink-500/70 to-purple-500/70 rounded-full mt-1 transform origin-left group-hover:scale-x-110 transition-transform duration-500"></div>
                </div>
              </CardTitle>
            </CardHeader>
            
            {/* 콘텐츠 섹션 */}
            <CardContent className="relative z-10 p-6">
              <div className="grid gap-6">
                {/* 소개 문단 1 */}
                <div className="bg-gradient-to-br from-background to-accent/10 shadow-md rounded-xl p-6 border border-primary/10 transform transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group/item relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-500"></div>
                  <div className="absolute -right-20 -bottom-20 w-40 h-40 bg-pink-500/5 rounded-full blur-2xl group-hover/item:opacity-100 opacity-0 transition-opacity duration-500"></div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-pink-500/30 to-purple-500/30 flex items-center justify-center transform group-hover/item:scale-110 transition-transform duration-300">
                      <span className="text-lg">✨</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">안녕하세요!</h3>
                      <p className="text-lg leading-relaxed">
                        저는 한신대학교 디지털영상문화콘텐츠학과에 재학중인 이소현입니다.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* 소개 문단 2 */}
                <div className="bg-gradient-to-br from-background to-accent/10 shadow-md rounded-xl p-6 border border-primary/10 transform transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group/item relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                  <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl group-hover/item:opacity-100 opacity-0 transition-opacity duration-500"></div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center transform group-hover/item:scale-110 transition-transform duration-300">
                      <span className="text-lg">💫</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">관심 분야</h3>
                      <p className="text-lg leading-relaxed">
                        현재 <span className="font-medium text-primary">뮤지컬 공연</span>에 제일 관심이 많고 <span className="font-medium text-primary">단편영화 촬영</span>등 연출일에 관심이 있습니다. 영화, 드라마, 뮤지컬, 연극 등을 보는것을 좋아합니다.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* 소개 문단 3 */}
                <div className="bg-gradient-to-br from-background to-accent/10 shadow-md rounded-xl p-6 border border-primary/10 transform transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group/item relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                  <div className="absolute -right-20 -top-20 w-40 h-40 bg-purple-500/5 rounded-full blur-2xl group-hover/item:opacity-100 opacity-0 transition-opacity duration-500"></div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center transform group-hover/item:scale-110 transition-transform duration-300">
                      <span className="text-lg">📔</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">블로그 목적</h3>
                      <p className="text-lg leading-relaxed">
                        이 블로그는 제가 일상에서 경험하는 다양한 문화 콘텐츠와 생각들을 기록하고 공유하는 공간입니다. 특히 <span className="font-medium text-primary">뮤지컬과 영화</span>에 관한 리뷰와 감상, 그리고 <span className="font-medium text-primary">미디어 콘텐츠 제작</span>에 관한 이야기를 주로 다룰 예정입니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>{/* 블로그 주요 내용 카드 */}
      <Card className="mb-10 border-2 border-primary/20 shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-500/5 via-background to-blue-500/5 pointer-events-none"></div>
        <CardHeader className="bg-gradient-to-r from-background via-accent/30 to-background border-b">          <CardTitle className="text-2xl flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
              <span className="text-2xl">📝</span>
            </div>
            <div>
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text font-bold">
                블로그 주요 내용
              </span>
              <div className="h-1 w-full bg-gradient-to-r from-pink-500/70 to-purple-500/70 rounded-full mt-1 transform origin-left group-hover:scale-x-110 transition-transform duration-500"></div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-3 p-5 rounded-lg bg-gradient-to-br from-accent/40 to-accent/20 shadow-md border border-primary/10 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-background shadow-inner">
                  <span className="text-3xl">🎭</span>
                </div>
                <h3 className="font-bold text-xl bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">뮤지컬 및 공연 관람 후기</h3>
              </div>
              <p className="text-muted-foreground pl-2 border-l-2 border-primary/20">
                다양한 뮤지컬과 공연을 관람하고 느낀 점과 리뷰를 공유합니다.
              </p>
              <div className="flex gap-2 flex-wrap mt-1">
                <Badge variant="outline" className="bg-background/70">뮤지컬</Badge>
                <Badge variant="outline" className="bg-background/70">연극</Badge>
                <Badge variant="outline" className="bg-background/70">공연예술</Badge>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 p-5 rounded-lg bg-gradient-to-br from-accent/40 to-accent/20 shadow-md border border-primary/10 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-background shadow-inner">
                  <span className="text-3xl">🎬</span>
                </div>
                <h3 className="font-bold text-xl bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">영화 및 드라마 감상평</h3>
              </div>
              <p className="text-muted-foreground pl-2 border-l-2 border-primary/20">
                인상 깊게 본 영화와 드라마에 대한 개인적인 감상과 분석을 기록합니다.
              </p>
              <div className="flex gap-2 flex-wrap mt-1">
                <Badge variant="outline" className="bg-background/70">영화</Badge>
                <Badge variant="outline" className="bg-background/70">드라마</Badge>
                <Badge variant="outline" className="bg-background/70">리뷰</Badge>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 p-5 rounded-lg bg-gradient-to-br from-accent/40 to-accent/20 shadow-md border border-primary/10 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-background shadow-inner">
                  <span className="text-3xl">🎥</span>
                </div>
                <h3 className="font-bold text-xl bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">단편영화 및 영상 제작 과정</h3>
              </div>
              <p className="text-muted-foreground pl-2 border-l-2 border-primary/20">
                직접 참여한 영상 제작 과정과 그 경험을 공유합니다.
              </p>
              <div className="flex gap-2 flex-wrap mt-1">
                <Badge variant="outline" className="bg-background/70">영상제작</Badge>
                <Badge variant="outline" className="bg-background/70">단편영화</Badge>
                <Badge variant="outline" className="bg-background/70">연출</Badge>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 p-5 rounded-lg bg-gradient-to-br from-accent/40 to-accent/20 shadow-md border border-primary/10 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-background shadow-inner">
                  <span className="text-3xl">🎼</span>
                </div>
                <h3 className="font-bold text-xl bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">뮤지컬 공연 제작 과정</h3>
              </div>
              <p className="text-muted-foreground pl-2 border-l-2 border-primary/20">
                뮤지컬 공연의 제작 과정과 배후 이야기를 소개합니다.
              </p>
              <div className="flex gap-2 flex-wrap mt-1">
                <Badge variant="outline" className="bg-background/70">공연제작</Badge>
                <Badge variant="outline" className="bg-background/70">뮤지컬</Badge>
                <Badge variant="outline" className="bg-background/70">무대</Badge>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 p-5 rounded-lg bg-gradient-to-br from-accent/40 to-accent/20 shadow-md border border-primary/10 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg md:col-span-2 mx-auto max-w-md">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-background shadow-inner">
                  <span className="text-3xl">🗓️</span>
                </div>
                <h3 className="font-bold text-xl bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">이외의 나의 일상들</h3>
              </div>
              <p className="text-muted-foreground pl-2 border-l-2 border-primary/20">
                일상 속 소소한 이야기와 생각을 기록합니다.
              </p>
              <div className="flex gap-2 flex-wrap mt-1">
                <Badge variant="outline" className="bg-background/70">일상</Badge>
                <Badge variant="outline" className="bg-background/70">에세이</Badge>
                <Badge variant="outline" className="bg-background/70">여행</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>      {/* 연락 및 소통 섹션 */}
      <Card className="mb-12 border-2 border-primary/20 shadow-lg overflow-hidden relative bg-card">
        {/* 배경 효과 제거하고 단색 배경으로 변경 */}
        <CardHeader className="border-b bg-card">          <CardTitle className="text-2xl flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-950 border-2 border-pink-200 dark:border-pink-800 shadow-md">
              <span className="text-2xl">💌</span>
            </div>            <div>
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text font-bold">
                연락 및 소통
              </span>
              <div className="h-1 w-full bg-gradient-to-r from-pink-500/70 to-purple-500/70 rounded-full mt-1 transform origin-left group-hover:scale-x-110 transition-transform duration-500"></div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="py-6 bg-card">
          <div className="mb-6 p-5 rounded-lg bg-accent/50 shadow-md border border-primary/10">
            <p className="text-lg leading-relaxed font-medium text-foreground">
              블로그 글에 대한 의견이나 문의사항은 댓글 또는 이메일로 연락 주시면 감사하겠습니다. 함께 소통하며 문화적 경험을 나누고 싶습니다.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg flex flex-col sm:flex-row items-center gap-6 justify-center border-2 border-pink-200 dark:border-pink-800 shadow-md">
            {/* 배경 그라데이션 완전 제거 */}
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 dark:bg-pink-950 border-2 border-pink-200 dark:border-pink-800 shadow">
              <span className="text-4xl">📧</span>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-sm font-medium text-foreground mb-1">이메일로 연락하기</p>
              <p className="text-xl font-bold text-foreground">sohappy23@hs.ac.kr</p>
            </div>
            <Button variant="default" size="lg" className="shadow-md bg-pink-500 hover:bg-pink-600 border-0 text-white font-medium" asChild>
              <Link href="mailto:sohappy23@hs.ac.kr" className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail-plus">
                  <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  <path d="M19 16v6"/>
                  <path d="M16 19h6"/>
                </svg>
                이메일 보내기
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 네비게이션 버튼 */}
      <div className="flex flex-col sm:flex-row justify-center gap-6 mb-10">
        <Button className="relative px-8 py-7 text-lg shadow-md shadow-pink-500/10 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition-all duration-300 border-0 overflow-hidden group" asChild>
          <Link href="/posts">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
            <span className="relative flex items-center gap-3 z-10">
              <span>최신 글 보러가기</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right group-hover:translate-x-1 transition-transform duration-300"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </span>
          </Link>
        </Button>
        <Button variant="outline" className="relative px-8 py-7 text-lg border-2 border-primary/20 hover:border-primary/40 shadow-md bg-gradient-to-r from-background to-background/95 transition-all duration-300 overflow-hidden group" asChild>
          <Link href="/">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-500/5 to-purple-500/5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
            <span className="relative flex items-center gap-3 z-10">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-home group-hover:-translate-x-1 transition-transform duration-300"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span>홈으로 돌아가기</span>
            </span>
          </Link>
        </Button>
      </div>
      
      {/* 푸터 */}
      <div className="text-center text-muted-foreground text-sm mt-16 pb-6 opacity-70">
        <p>© 2025 이소현의 블로그. 모든 권리 보유.</p>
      </div>
    </div>
  );
}
