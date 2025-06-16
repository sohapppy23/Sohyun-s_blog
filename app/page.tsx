/**
 * 블로그 홈페이지 컴포넌트 (2025년 새로운 Third-Party Auth 방식)
 * Hero 섹션, 최신 포스트, 카테고리 섹션으로 구성
 * 실제 Supabase 데이터베이스와 연동
 */

import { Suspense } from 'react';
import { PostCard } from '@/components/blog/post-card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { Database } from '@/types/database.types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, User, Eye, ArrowRight } from 'lucide-react';
import { SignedIn, SignedOut } from '@clerk/nextjs';

export const dynamic = "force-dynamic";

// 타입 정의
type Post = Database['public']['Tables']['posts']['Row'];
type Category = Database['public']['Tables']['categories']['Row'];

type PostWithCategory = Post & {
  categories?: Category | null;
};

// 날짜 포맷팅 함수
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// 최신 게시물 조회
async function getLatestPosts(): Promise<PostWithCategory[]> {
  try {
    console.log('=== 홈페이지: 최신 게시물 조회 ===');
    const supabase = await createServerSupabaseClient();

    const { data: posts, error } = await supabase
      .from('posts')
      .select(`
        id,
        title,
        slug,
        excerpt,
        cover_image_url,
        view_count,
        created_at,
        content,
        status,
        author_id,
        category_id,
        updated_at,
        categories (
          id,
          name,
          slug,
          color,
          description,
          created_at,
          updated_at
        )
      `)
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(3);

    if (error) {
      console.error('최신 게시물 조회 오류:', error);
      return [];
    }

    console.log(`✅ 최신 게시물 ${posts?.length || 0}개 조회 성공`);
    return (posts || []).map(post => ({
      ...post,
      categories: Array.isArray(post.categories)
        ? (post.categories[0] || null)
        : post.categories ?? null,
    }));
  } catch (error) {
    console.error('최신 게시물 조회 중 오류:', error);
    return [];
  }
}

// 카테고리 목록 조회
async function getCategories(): Promise<Category[]> {
  try {
    console.log('=== 홈페이지: 카테고리 목록 조회 ===');
    const supabase = await createServerSupabaseClient();
    
    const { data: categories, error } = await supabase
      .from('categories')
      .select('*')
      .limit(6); // 홈페이지에는 최대 6개만 표시

    if (error) {
      console.error('카테고리 조회 오류:', error);
      return [];
    }

    // 원하는 카테고리 순서 정의
    const categoryOrder = ['관람', '제작', '일상', '기타'];
    
    // 순서대로 정렬
    const sortedCategories = (categories || []).sort((a, b) => {
      const indexA = categoryOrder.indexOf(a.name);
      const indexB = categoryOrder.indexOf(b.name);
      
      // 정의된 순서에 없는 경우 맨 뒤로
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      
      return indexA - indexB;
    });

    console.log(`✅ 카테고리 ${sortedCategories.length}개 조회 성공`);
    return sortedCategories;
  } catch (error) {
    console.error('카테고리 조회 중 오류:', error);
    return [];
  }
}

export default async function Home() {
  // 서버 컴포넌트에서 데이터 조회
  const [latestPosts, categories] = await Promise.all([
    getLatestPosts(),
    getCategories()
  ]);

  return (
    <div id="main-content" className="py-16">
      {/* Hero 섹션 */}      <section className="text-center mb-20 relative">
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-full h-40 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 rounded-full blur-3xl -z-10"></div>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-lg md:text-2xl lg:text-3xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text whitespace-nowrap overflow-hidden text-ellipsis mx-auto">
            Welcome to Sohyun's Blog
          </h1>
          <div className="flex justify-center mb-4">
            <Badge variant="outline" className="px-4 py-1 text-base font-medium border-2 border-primary/30">
              ✨ 이소현의 일상 블로그 ✨
            </Badge>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            관람, 제작, 일상, 기타 다양한 주제에 관한 이야기를 공유합니다. 
            함께 다양한 경험과 생각을 나눠보세요.
          </p>
          
          {/* CTA 버튼들 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/posts"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 px-8 py-3 text-sm font-medium text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              📚 블로그 글 읽기
            </Link>
            <Link
              href="/about"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg border border-primary/20 bg-background px-8 py-3 text-sm font-medium hover:bg-accent hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow"
            >
              👋 소개 보기
            </Link>          </div>
        </div>
      </section>
      
      {/* 최신 게시물 섹션 */}
      <section className="mb-20">
        <div className="max-w-6xl mx-auto relative">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl -z-10 opacity-70"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl -z-10 opacity-70"></div>
          
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 flex items-center justify-center shadow-sm">
                <span className="text-xl">📝</span>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">최신 게시물</h2>
            </div>
            <Link
              href="/posts"
              className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20"
            >
              모든 글 보기
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          {latestPosts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post) => (
                <Card key={post.id} className="group overflow-hidden border-2 border-primary/10 shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1 relative bg-gradient-to-b from-card to-card/50">
                  {/* 배경 효과 */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                  <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <CardHeader className="p-0">
                    {post.cover_image_url && (
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img
                          src={post.cover_image_url}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      {/* 카테고리 */}
                      {post.categories && (
                        <Badge 
                          className="text-xs px-3 py-1 font-medium shadow-sm"
                          style={{ 
                            backgroundColor: `${post.categories.color}20`, 
                            color: post.categories.color 
                          }}
                        >
                          {post.categories.name}
                        </Badge>
                      )}

                      {/* 제목 */}
                      <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                        <Link href={`/posts/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>

                      {/* 요약 */}
                      {post.excerpt && (
                        <p className="text-muted-foreground text-sm line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}

                      {/* 메타 정보 */}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-4 pt-4 border-t border-border/50">
                        <div className="flex items-center gap-1">
                          <CalendarDays className="h-3 w-3" />
                          {formatDate(post.created_at)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {post.view_count || 0}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            /* 빈 상태 */
            <Card className="text-center py-12 relative overflow-hidden border-2 border-dashed border-primary/30 bg-background/50 backdrop-blur-sm shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-blue-500/5 rounded-2xl"></div>
              <CardContent className="relative z-10">
                <div className="max-w-md mx-auto">
                  <div className="text-6xl mb-6 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-5xl">📄</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
                    아직 게시물이 없습니다
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    첫 번째 블로그 글을 작성해보세요!
                  </p>
                  
                  <SignedIn>
                    <Button asChild className="bg-gradient-to-r from-pink-500 to-purple-500 text-white border-0 hover:shadow-md transition-all duration-300 hover:scale-105">
                      <Link href="/admin/posts/create">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        첫 글 작성하기
                      </Link>
                    </Button>
                  </SignedIn>
                  
                  <SignedOut>
                    <p className="text-sm text-muted-foreground">
                      게시물을 작성하려면 로그인이 필요합니다.
                    </p>
                  </SignedOut>
                </div>
              </CardContent>
            </Card>          )}
        </div>
      </section>
      
      {/* 카테고리 섹션 */}
      <section className="mb-20">
        <div className="max-w-6xl mx-auto relative">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl -z-10 opacity-70"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl -z-10 opacity-70"></div>
          
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center shadow-sm">
                <span className="text-xl">🏷️</span>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">카테고리</h2>
            </div>
            <Link
              href="/categories"
              className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20"
            >
              모든 카테고리 보기
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          {categories.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {categories.map((category) => {
                // 카테고리 이모지 가져오기
                const getCategoryEmoji = (name: string): string => {
                  switch (name) {
                    case '관람': return '🎬';
                    case '제작': return '🎨';
                    case '일상': return '📝';
                    case '기타': return '✨';
                    default: return '📚';
                  }
                };
                
                // 카테고리 이름에 따른 글씨 색상
                const getTextColor = (name: string): string => {
                  switch (name) {
                    case '관람': return '#4A86E8';
                    case '제작': return '#9966CC';
                    case '일상': return '#4CAF50';
                    case '기타': return '#7F92B0';
                    default: return '#3b82f6';
                  }
                };
                
                return (
                  <Link
                    key={category.id}
                    href={`/categories/${category.slug}`}
                    className="group"
                  >
                    <Card className="text-center p-6 relative border-2 border-primary/10 bg-white dark:bg-slate-900/70 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden group">
                      {/* 배경 효과 */}
                      <div 
                        className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                        style={{ 
                          background: `linear-gradient(135deg, ${category.color}40 0%, ${category.color}10 100%)`,
                          borderRadius: '0.75rem'
                        }}
                      ></div>
                      
                      {/* 상단 장식 효과 */}
                      <div 
                        className="absolute -top-12 -right-12 w-24 h-24 rounded-full opacity-20 group-hover:opacity-40 transition-all duration-500 blur-md"
                        style={{ backgroundColor: category.color }}
                      ></div>
                      
                      <div className="relative z-10">
                        <div
                          className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center shadow-md transform group-hover:scale-110 transition-all duration-500"
                          style={{ backgroundColor: category.color }}
                        >
                          <span className="text-2xl">{getCategoryEmoji(category.name)}</span>
                        </div>
                        <h3 
                          className="font-medium group-hover:scale-105 transition-transform duration-300 text-lg mb-1"
                          style={{ color: getTextColor(category.name) }}
                        >
                          {category.name}
                        </h3>
                        {category.description && (
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {category.description}
                          </p>
                        )}
                        
                        {/* 호버 시 더 보기 표시 */}
                        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                          <div 
                            className="inline-flex items-center gap-1 text-xs font-medium py-1 px-3 rounded-full shadow-sm border border-primary/10"
                            style={{ 
                              backgroundColor: `${category.color}30`,
                              color: "#000000",
                            }}
                          >
                            <span>카테고리 보기</span>
                            <span className="transition-transform group-hover:translate-x-1">→</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          ) : (
            /* 카테고리 빈 상태 */
            <Card className="text-center py-8 relative overflow-hidden border-2 border-dashed border-primary/30 bg-background/50 backdrop-blur-sm shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl"></div>
              <CardContent className="relative z-10">
                <div className="text-6xl mb-6 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-5xl">📂</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                  아직 카테고리가 없습니다
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  카테고리가 곧 추가될 예정입니다.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
