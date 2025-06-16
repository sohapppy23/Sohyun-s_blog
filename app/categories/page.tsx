/**
 * 카테고리 목록 페이지 (실제 데이터베이스 연동)
 * 
 * 특징:
 * - 서버 컴포넌트로 구현
 * - 실제 Supabase 데이터베이스에서 카테고리 조회
 * - 각 카테고리의 게시물 개수 표시
 */

import Link from 'next/link';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import type { Metadata } from 'next';
import { Database } from '@/types/database.types';
import { Badge } from '@/components/ui/badge';
import { getCategoryEmoji, getContrastColor } from '@/lib/utils';

// 타입 정의
type Category = Database['public']['Tables']['categories']['Row'];

// 페이지 메타데이터
export const metadata: Metadata = {
  title: '카테고리 | My Blog',
  description: '블로그의 모든 카테고리를 확인하고 관심 있는 주제의 글을 찾아보세요.',
  openGraph: {
    title: '카테고리 | My Blog',
    description: '블로그의 모든 카테고리를 확인하고 관심 있는 주제의 글을 찾아보세요.',
  },
};

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  try {
    console.log('=== 카테고리 목록 페이지: 데이터 조회 시작 ===');
    
    // 실제 Supabase 데이터베이스와 연동
    const supabase = await createServerSupabaseClient();    // 카테고리 목록 조회
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('*');

    if (categoriesError) {
      console.error('카테고리 조회 오류:', categoriesError);
      throw categoriesError;
    }    console.log(`✅ 카테고리 ${categories?.length || 0}개 조회 성공`);

    // 원하는 카테고리 순서 정의
    const categoryOrder = ['관람', '제작', '일상', '기타'];
    
    // 각 카테고리별 게시물 수 조회
    const categoriesWithCount = await Promise.all(
      (categories || []).map(async (category) => {
        const { count } = await supabase
          .from('posts')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'published')
          .eq('category_id', category.id);

        return {
          id: category.id,
          name: category.name,
          slug: category.slug,
          description: category.description || `${category.name} 관련 글들을 모아놓은 카테고리입니다.`,
          postCount: count || 0,
          color: category.color || '#3b82f6', // 데이터베이스의 color 컬럼 사용
          // 정렬 순서 추가 (없으면 맨 뒤로)
          orderIndex: categoryOrder.indexOf(category.name) >= 0 
            ? categoryOrder.indexOf(category.name) 
            : categoryOrder.length
        };
      })
    );
    
    // 정의한 순서대로 카테고리 정렬
    categoriesWithCount.sort((a, b) => a.orderIndex - b.orderIndex);

    console.log('✅ 카테고리별 게시물 수 조회 완료');

  return (
      <div className="container py-16 max-w-5xl mx-auto">
        {/* 헤더 섹션 */}
        <div className="text-center mb-16 relative">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-full h-40 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl -z-10"></div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            CATEGORIES
          </h1>
          <div className="flex justify-center mb-4">
            <Badge variant="outline" className="px-4 py-1 text-base font-medium border-2 border-primary/30">
              ✨ 다양한 주제의 이야기 ✨
            </Badge>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            관심 있는 주제별로 글을 찾아보세요. 각 카테고리마다 엄선된 고품질 콘텐츠를 제공합니다.
          </p>
        </div>

        {/* 카테고리 통계 */}
        <section className="mb-12">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 text-muted-foreground text-base font-medium border border-primary/20 shadow-sm">
              <span className="text-xl">📚</span>
              <span>총 {categoriesWithCount.length}개의 카테고리</span>
              <span>•</span>
              <span>{categoriesWithCount.reduce((sum, cat) => sum + cat.postCount, 0)}개의 글</span>
            </div>
          </div>
        </section>        {/* 카테고리 그리드 */}
        <section>
          {categoriesWithCount.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {categoriesWithCount.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="group block"
                >
                  <article className="relative rounded-2xl border-2 border-primary/10 bg-white dark:bg-slate-900/70 p-7 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 h-full overflow-hidden group">
                    {/* 배경 효과 */}
                    <div 
                      className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                      style={{ 
                        background: `linear-gradient(135deg, ${category.color}40 0%, ${category.color}10 100%)`,
                        borderRadius: '1rem' 
                      }}
                    ></div>
                    
                    {/* 상단 장식 효과 */}
                    <div 
                      className="absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-20 group-hover:opacity-40 transition-all duration-500 blur-md"
                      style={{ backgroundColor: category.color }}
                    ></div>
                    
                    {/* 하단 장식 효과 */}
                    <div 
                      className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full opacity-10 group-hover:opacity-30 transition-all duration-500 blur-md"
                      style={{ backgroundColor: category.color }}
                    ></div>
                    
                    {/* 카테고리 아이콘과 정보 */}
                    <div className="flex items-start justify-between mb-8 relative z-10">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          {/* 아이콘 배경 효과 */}
                          <div 
                            className="absolute inset-0 rounded-full blur-sm opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                            style={{ backgroundColor: category.color }}
                          ></div>                          {/* 카테고리 아이콘 */}
                          <div 
                            className="relative w-16 h-16 rounded-full flex items-center justify-center border-4 border-blue-50 dark:border-slate-800 shadow-md transform group-hover:scale-110 transition-all duration-500"
                            style={{ backgroundColor: category.color }}
                          >
                            <span 
                              className="text-2xl font-bold" 
                              style={{ 
                                color: getContrastColor(category.color),
                                textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                              }}
                            >
                              {getCategoryEmoji(category.name)}
                            </span>
                          </div>
                        </div>
                          {/* 포스트 카운트 */}                        <div 
                          className="text-sm font-medium px-4 py-2 rounded-full border border-primary/10 shadow-sm transition-colors duration-300"
                          style={{ 
                            backgroundColor: `${category.color}30`,
                            color: "#000000",
                            textShadow: '0 1px 1px rgba(255,255,255,0.1)'
                          }}
                        >
                          {category.postCount}개의 글
                        </div>
                      </div>
                    </div>
                      {/* 카테고리 정보 */}
                    <div className="space-y-4 relative z-10 pl-2">                      <h2 
                        className="text-2xl font-bold transform group-hover:scale-105 transition-transform duration-300"
                        style={{ 
                          color: category.name === '관람' ? '#4A86E8' : 
                                 category.name === '제작' ? '#9966CC' : 
                                 category.name === '일상' ? '#4CAF50' : 
                                 category.name === '기타' ? '#7F92B0' : 
                                 getContrastColor(category.color),
                          textShadow: '0 1px 1px rgba(0,0,0,0.05)'
                        }}
                      >
                        {category.name}
                      </h2>
                      
                      <p className="text-base text-muted-foreground leading-relaxed">
                        {category.description}
                      </p>
                    </div>                    {/* 호버 시 더 보기 표시 */}
                    <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-4">                      <div 
                        className="inline-flex items-center gap-2 text-sm font-medium py-2 px-4 rounded-full shadow-sm border border-primary/10"
                        style={{ 
                          backgroundColor: `${category.color}50`,
                          color: "#000000",
                          textShadow: '0 1px 1px rgba(255,255,255,0.1)'
                        }}
                      >
                        <span>카테고리 글 보기</span>
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                      </div>
                    </div>

                    {/* 호버 효과 보더 */}
                    <div 
                      className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-primary/30 transition-all duration-500" 
                    />
                  </article>
                </Link>
              ))}
            </div>          ) : (
            /* 카테고리가 없는 경우 */
            <div className="text-center py-16 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200/40 via-purple-200/40 to-pink-200/40 rounded-2xl"></div>
              <div className="relative z-10 py-12 px-8 border-2 border-dashed border-primary/30 rounded-2xl bg-background/50 backdrop-blur-sm shadow-lg max-w-lg mx-auto">
                <div className="text-6xl mb-8 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 w-28 h-28 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <span className="text-5xl">📂</span>
                </div>
                <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                  카테고리가 없습니다
                </h3>
                <p className="text-muted-foreground mb-10 text-lg leading-relaxed">
                  아직 등록된 카테고리가 없습니다. 곧 다양한 주제의 글들이 업데이트될 예정입니다.
                </p>                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 px-7 py-3 text-base font-medium text-blue-50 hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  홈으로 돌아가기
                </Link>
              </div>
            </div>          )}
        </section>        {/* 추가 안내 */}
        {categoriesWithCount.length > 0 && (
          <section className="mt-16 text-center relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-200/10 via-purple-200/10 to-pink-200/10 rounded-xl -z-10 opacity-50"></div>
            
            <div className="max-w-xl mx-auto py-6 px-6 border border-primary/10 rounded-xl bg-card/60 backdrop-blur-sm shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-200/30 via-purple-200/30 to-pink-200/30 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <span className="text-xl">💡</span>
              </div>
              
              <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                원하는 카테고리를 찾지 못하셨나요?
              </h3>
              
              <p className="text-muted-foreground mb-5 text-sm leading-relaxed">
                더 많은 주제와 카테고리가 지속적으로 추가되고 있습니다.
                특정 주제에 대한 글을 원하신다면 언제든 요청해주세요.
              </p>
              
              <div className="flex justify-center gap-3">
                <Link
                  href="/posts"
                  className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 px-4 py-2 text-sm font-medium text-blue-50 hover:opacity-90 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  모든 글 보기
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-md border border-primary/20 bg-background/80 backdrop-blur-sm px-4 py-2 text-sm font-medium hover:bg-primary/5 transition-all duration-300"
                >
                  홈으로 돌아가기
                </Link>
              </div>
            </div>
          </section>
        )}
      </div>
    );  } catch (error) {
    console.error('카테고리 데이터 조회 중 오류 발생:', error);
    
    // 에러 발생 시 빈 상태 표시
    return (
      <div className="container py-16 max-w-5xl mx-auto">
        <section className="text-center mb-16 relative">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-full h-40 bg-gradient-to-r from-red-200/30 via-orange-200/30 to-yellow-200/30 rounded-full blur-3xl -z-10"></div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-transparent bg-clip-text">
            카테고리
          </h1>
          <div className="flex justify-center mb-4">
            <Badge variant="outline" className="px-4 py-1 text-base font-medium border-2 border-red-500/30">
              ⚠️ 데이터를 불러올 수 없습니다 ⚠️
            </Badge>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            카테고리 정보를 불러오는 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.
          </p>
        </section>
        
        <section>
          <div className="text-center py-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-200/20 via-orange-200/20 to-yellow-200/20 rounded-2xl"></div>
            <div className="relative z-10 py-12 px-8 border-2 border-dashed border-red-500/30 rounded-2xl bg-background/50 backdrop-blur-sm shadow-lg max-w-lg mx-auto">
              <div className="text-6xl mb-8 bg-gradient-to-r from-red-200/40 via-orange-200/40 to-yellow-200/40 w-28 h-28 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <span className="text-5xl">⚠️</span>
              </div>
              <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-transparent bg-clip-text">
                데이터 로딩 오류
              </h3>
              <p className="text-muted-foreground mb-10 text-lg">
                {error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 px-7 py-3 text-base font-medium text-red-50 hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  다시 시도하기
                </button>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-full border-2 border-red-500/30 bg-background/80 backdrop-blur-sm px-7 py-3 text-base font-medium hover:bg-red-500/10 transition-all duration-300"
                >
                  홈으로 돌아가기
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
} 