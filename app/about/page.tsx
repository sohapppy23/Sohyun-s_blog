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
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-full h-40 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 rounded-full blur-3xl -z-10"></div>        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
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
      <Card className="mb-12 border-2 border-primary/20 shadow-lg overflow-hidden relative group">
        {/* 배경 효과 */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
        <div className="absolute -top-20 right-20 w-60 h-60 bg-blue-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-70 transition-opacity duration-700"></div>
        <div className="absolute -bottom-20 left-20 w-60 h-60 bg-pink-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-70 transition-opacity duration-700"></div>
        
        <CardHeader className="border-b bg-gradient-to-r from-background via-accent/20 to-background relative">
          <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-pink-500/10 to-transparent"></div>
          <CardTitle className="text-2xl flex items-center gap-3 relative z-10">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-pink-200 to-purple-200 border-2 border-pink-300 shadow-md transform group-hover:rotate-6 transition-transform duration-500">
              <span className="text-2xl">💌</span>
            </div>            <div>
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text font-bold">
                연락 및 소통
              </span>
              <div className="h-1 w-full bg-gradient-to-r from-pink-500/70 to-purple-500/70 rounded-full mt-1 transform origin-left group-hover:scale-x-110 transition-transform duration-500"></div>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="py-8 relative z-10">
          {/* 소개 메시지 */}
          <div className="mb-8 p-6 rounded-xl bg-gradient-to-br from-background to-accent/10 shadow-md border border-primary/10 transform transition-all duration-300 hover:shadow-lg hover:scale-[1.01] group/item relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-500"></div>
            <div className="absolute -right-20 -bottom-20 w-40 h-40 bg-pink-500/5 rounded-full blur-2xl group-hover/item:opacity-100 opacity-0 transition-opacity duration-500"></div>
            
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-pink-500/30 to-purple-500/30 flex items-center justify-center transform group-hover/item:scale-110 transition-transform duration-300">
                <span className="text-lg">✨</span>
              </div>              <div>
                <p className="text-lg leading-relaxed mb-3">
                  블로그 글에 대한 의견이나 문의사항은 댓글 또는 아래 연락처로 연락 주시면 감사하겠습니다.
                </p>
                <p className="text-lg font-medium italic text-center py-2 px-4 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/30 dark:to-purple-950/30 rounded-lg border border-primary/10 shadow-inner transform group-hover/item:scale-105 transition-all duration-300">
                  <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text font-serif">
                    "함께 소통하며 문화적 경험을 나누고 싶습니다 ✨"
                  </span>
                </p>
              </div>
            </div>
          </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 이메일 연락처 */}
            <div className="bg-gradient-to-br from-background to-accent/10 shadow-md rounded-xl p-5 border border-primary/10 transform transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group/email relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl group-hover/email:opacity-100 opacity-0 transition-opacity duration-500"></div>
              
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center border-2 border-blue-300/50 shadow-md transform group-hover/email:rotate-6 transition-transform duration-300">
                  <span className="text-xl">✉️</span>
                </div>
                <div>
                  <h3 className="text-base font-bold mb-0.5 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">이메일로 연락하기</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-sm font-medium">sohappy23@hs.ac.kr</p>
                    <Button variant="ghost" size="sm" className="h-6 px-2 rounded-full text-xs bg-blue-100 dark:bg-blue-900/40 hover:bg-blue-200 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300" asChild>
                      <Link href="mailto:sohappy23@hs.ac.kr">
                        <span className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail">
                            <rect width="20" height="16" x="2" y="4" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                          </svg>
                          메일 보내기
                        </span>
                      </Link>
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground italic">
                    평일 기준 24시간 이내 답변 드립니다 💫
                  </p>
                </div>
              </div>
            </div>
            
            {/* 소셜 미디어 연락처 */}
            <div className="bg-gradient-to-br from-background to-accent/10 shadow-md rounded-xl p-5 border border-primary/10 transform transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group/social relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-orange-400"></div>
              <div className="absolute -right-20 -top-20 w-40 h-40 bg-pink-500/5 rounded-full blur-2xl group-hover/social:opacity-100 opacity-0 transition-opacity duration-500"></div>
              
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-pink-200 to-orange-200 flex items-center justify-center border-2 border-pink-300/50 shadow-md transform group-hover/social:rotate-6 transition-transform duration-300">
                  <span className="text-xl">🤝</span>
                </div>
                <div>
                  <h3 className="text-base font-bold mb-0.5 bg-gradient-to-r from-pink-600 to-orange-500 text-transparent bg-clip-text">소셜 미디어</h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    다양한 방법으로 연결되어 함께 성장해요! 팔로우해 주세요 ✨
                  </p>
                  
                  <div className="flex gap-1.5">
                    <Button variant="outline" size="icon" asChild className="w-7 h-7 rounded-full bg-gradient-to-br from-background/90 to-background/70 hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-all duration-300 border border-primary/20">
                      <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
                          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                        </svg>
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon" asChild className="w-7 h-7 rounded-full bg-gradient-to-br from-background/90 to-background/70 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300 border border-primary/20">
                      <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter">
                          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                        </svg>
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon" asChild className="w-7 h-7 rounded-full bg-gradient-to-br from-background/90 to-background/70 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300 border border-primary/20">
                      <Link href="https://github.com" target="_blank" rel="noopener noreferrer" title="GitHub">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github">
                          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                          <path d="M9 18c-4.51 2-5-2-7-2"/>
                        </svg>
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon" asChild className="w-7 h-7 rounded-full bg-gradient-to-br from-background/90 to-background/70 hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-300 border border-primary/20">
                      <Link href="https://line.me" target="_blank" rel="noopener noreferrer" title="Line">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle">
                          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
                        </svg>
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon" asChild className="w-7 h-7 rounded-full bg-gradient-to-br from-background/90 to-background/70 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-300 border border-primary/20">
                      <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer" title="YouTube">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube">
                          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
                          <path d="m10 15 5-3-5-3z"/>
                        </svg>
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
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
