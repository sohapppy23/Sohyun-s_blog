/**
 * 블로그 포스트 목록 페이지 (2025년 새로운 Third-Party Auth 방식)
 * 모든 블로그 포스트를 필터링, 정렬, 페이지네이션과 함께 표시
 * 실제 Supabase 데이터베이스와 연동
 */

import Link from 'next/link';
import { Suspense } from 'react';
import PostCard from '@/components/blog/post-card';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import type { Metadata } from 'next';
import { Database } from '@/types/database.types';
import { Badge } from '@/components/ui/badge';

// 타입 정의
type Post = Database['public']['Tables']['posts']['Row'];
type Category = Database['public']['Tables']['categories']['Row'];

type PostWithCategory = Post & {
  categories?: Category | null;
};

// 페이지 메타데이터
export const metadata: Metadata = {
  title: 'Blog Posts | My Blog',
  description: '관람, 제작, 일상, 기타 다양한 주제의 모든 블로그 글을 확인해보세요.',
  openGraph: {
    title: 'Blog Posts | My Blog',
    description: '관람, 제작, 일상, 기타 다양한 주제의 모든 블로그 글을 확인해보세요.',
  },
};

// 페이지 props 타입 정의
type PageProps = {
  searchParams: Promise<{
    page?: string;
    category?: string;
    sort?: 'latest' | 'popular' | 'views';
    search?: string;
  }>;
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

// 카테고리 필터 컴포넌트
function CategoryFilter({ 
  categories, 
  currentCategory, 
  totalPosts 
}: { 
  categories: Array<{ id: string; name: string; slug: string; postCount: number; color?: string }>;
  currentCategory: string;
  totalPosts: number;
}) {
  // 각 카테고리별 고정 색상
  const getCategoryColor = (slug: string): string => {
    switch (slug) {
      case 'viewing':
        return '#A5C8FF'; // 관람 - 파스텔 블루
      case 'creating':
        return '#D8B4FE'; // 제작 - 파스텔 퍼플
      case 'daily':
        return '#A7F3D0'; // 일상 - 파스텔 그린
      case 'etc':
        return '#D1D5DB'; // 기타 - 파스텔 그레이
      default:
        return '#CBD5E1'; // 기본값
    }
  };

  // 카테고리 이름에 맞는 이모지
  const getCategoryEmoji = (name: string): string => {
    switch (name) {
      case '관람':
        return '🎬'; 
      case '제작':
        return '🎨'; 
      case '일상':
        return '📝'; 
      case '기타':
        return '✨'; 
      default:
        return '📚'; 
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Link
        href="/posts?category=all"
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-sm hover:shadow ${
          currentCategory === 'all' || !currentCategory
            ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white transform hover:scale-105'
            : 'bg-gradient-to-r from-background to-accent/20 text-foreground hover:bg-accent/30 border border-primary/10'
        }`}
      >
        <div className="flex items-center gap-1.5">
          <span>📚</span>
          <span>전체 ({totalPosts})</span>
        </div>
      </Link>
      
      {categories.map((category) => {
        const categoryColor = category.color || getCategoryColor(category.slug);
        const categoryEmoji = getCategoryEmoji(category.name);
        
        return (
          <Link
            key={category.id}
            href={`/posts?category=${category.slug}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-sm hover:shadow ${
              currentCategory === category.slug
                ? `bg-[${categoryColor}] text-foreground transform hover:scale-105`
                : 'bg-gradient-to-r from-background to-accent/20 text-foreground hover:bg-accent/30 border border-primary/10'
            }`}
            style={{
              backgroundColor: currentCategory === category.slug ? categoryColor : undefined,
            }}
          >
            <div className="flex items-center gap-1.5">
              <span>{categoryEmoji}</span>
              <span>{category.name} ({category.postCount})</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

// 정렬 선택 컴포넌트
function SortSelect({ currentSort }: { currentSort: string }) {
  const sortOptions = [
    { value: 'latest', label: '최신순', icon: '🕒' },
    { value: 'popular', label: '인기순', icon: '🔥' },
    { value: 'views', label: '조회수순', icon: '👁️' },
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">정렬:</span>
      <div className="flex gap-2">
        {sortOptions.map((option) => (
          <Link
            key={option.value}
            href={`/posts?sort=${option.value}`}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${
              currentSort === option.value || (!currentSort && option.value === 'latest')
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md transform hover:scale-105'
                : 'bg-background hover:bg-accent/20 border border-primary/10 hover:border-primary/30'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span>{option.icon}</span>
              <span>{option.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// 페이지네이션 컴포넌트
function Pagination({ 
  currentPage, 
  totalPages, 
  baseUrl 
}: { 
  currentPage: number; 
  totalPages: number; 
  baseUrl: string;
}) {
  // 페이지 번호 생성 함수
  const getPageNumbers = (current: number, total: number) => {
    const pages: number[] = [];
    const maxVisible = 5;
    
    if (total <= maxVisible) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(1, current - 2);
      const end = Math.min(total, start + maxVisible - 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* 이전 페이지 */}
      {currentPage > 1 && (
        <Link
          href={`${baseUrl}&page=${currentPage - 1}`}
          className="px-3 py-2 rounded-lg border border-primary/20 bg-background hover:bg-accent hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow flex items-center gap-1"
        >
          <span className="text-xs">◀</span> 이전
        </Link>
      )}

      {/* 페이지 번호들 */}
      {pageNumbers.map((pageNum) => (
        <Link
          key={pageNum}
          href={`${baseUrl}&page=${pageNum}`}
          className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
            pageNum === currentPage
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md transform hover:scale-105'
              : 'border border-primary/20 bg-background hover:bg-accent hover:border-primary/40 shadow-sm hover:shadow'
          }`}
        >
          {pageNum}
        </Link>
      ))}

      {/* 다음 페이지 */}
      {currentPage < totalPages && (
        <Link
          href={`${baseUrl}&page=${currentPage + 1}`}
          className="px-3 py-2 rounded-lg border border-primary/20 bg-background hover:bg-accent hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow flex items-center gap-1"
        >
          다음 <span className="text-xs">▶</span>
        </Link>
      )}
    </div>
  );
}

// 메인 포스트 목록 데이터 조회 함수
async function PostsList({ searchParams }: { searchParams: any }) {
  // Supabase 클라이언트 생성
  const supabase = createServerSupabaseClient();
  const page = parseInt(searchParams.page || '1');
  const category = searchParams.category || 'all';
  const sort = (searchParams.sort || 'latest') as 'latest' | 'popular' | 'views';
  const search = searchParams.search || '';

  try {
    console.log('=== 게시물 목록 페이지: 데이터 조회 시작 ===');
    console.log('페이지:', page, '카테고리:', category, '정렬:', sort);

    // 2025년 새로운 Third-Party Auth 방식 Supabase 클라이언트 생성
    const supabase = await createServerSupabaseClient();    // 게시물 데이터 조회 (좋아요 수 포함)
    let postsQuery = supabase
      .from('posts')
      .select(`
        id,
        title,
        content,
        slug,
        excerpt,
        cover_image_url,
        view_count,
        created_at,
        author_id,
        categories (
          id,
          name,
          slug,
          color
        )
      `)
      .eq('status', 'published');

    // 카테고리 필터링 (먼저 카테고리 ID 조회 후 필터링)
    if (category !== 'all') {
      const { data: categoryData } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', category)
        .single();
      
      if (categoryData) {
        postsQuery = postsQuery.eq('category_id', categoryData.id);
      }
    }

    // 정렬 적용
    switch (sort) {
      case 'latest':
        postsQuery = postsQuery.order('created_at', { ascending: false });
        break;
      case 'popular':
        postsQuery = postsQuery.order('view_count', { ascending: false });
        break;
      case 'views':
        postsQuery = postsQuery.order('view_count', { ascending: false });
        break;
      default:
        postsQuery = postsQuery.order('created_at', { ascending: false });
    }

    // 페이지네이션 적용
    const limit = 9;
    const offset = (page - 1) * limit;
    postsQuery = postsQuery.range(offset, offset + limit - 1);    const { data: posts, error: postsError } = await postsQuery;

    if (postsError) {
      console.error('게시물 조회 오류:', postsError);
      throw postsError;
    }

    console.log(`✅ 게시물 ${posts?.length || 0}개 조회 성공`);

    // 각 게시물의 좋아요 수 조회
    const postsWithLikes = await Promise.all(
      (posts || []).map(async (post) => {
        const { count: likeCount } = await supabase
          .from('likes')
          .select('*', { count: 'exact', head: true })
          .eq('post_id', post.id);

        return {
          ...post,
          likeCount: likeCount || 0
        };
      })
    );

    console.log('✅ 좋아요 수 조회 완료');

    // 전체 게시물 수 조회 (페이지네이션용)
    let countQuery = supabase
      .from('posts')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'published');

    if (category !== 'all') {
      const { data: categoryData } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', category)
        .single();
      
      if (categoryData) {
        countQuery = countQuery.eq('category_id', categoryData.id);
      }
    }

    const { count: totalCount, error: countError } = await countQuery;

    if (countError) {
      console.error('게시물 수 조회 오류:', countError);
      throw countError;
    }

    // 카테고리 목록 조회
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (categoriesError) {
      console.error('카테고리 조회 오류:', categoriesError);
      throw categoriesError;
    }

    console.log(`✅ 카테고리 ${categories?.length || 0}개 조회 성공`);

    // 각 카테고리별 게시물 수 조회
    const categoriesWithCount = await Promise.all(
      (categories || []).map(async (cat) => {
        const { count } = await supabase
          .from('posts')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'published')
          .eq('category_id', cat.id);

        return {
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
          postCount: count || 0
        };
      })
    );

    // 페이지네이션 정보 계산
    const totalPages = Math.ceil((totalCount || 0) / limit);
    const pagination = {
      currentPage: page,
      totalPages,
      totalItems: totalCount || 0,
      hasNext: page < totalPages,
      hasPrev: page > 1
    };

    // Category 타입의 빈 객체
    const EMPTY_CATEGORY: Category = {
      id: '',
      name: '',
      slug: '',
      description: null,
      color: '',
      created_at: '',
      updated_at: '',
    };    // PostCard 컴포넌트에 맞는 데이터 형식으로 변환 (좋아요 수 포함)
    const transformedPosts = (postsWithLikes || []).map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      slug: post.slug,
      excerpt: post.excerpt || '',
      coverImage: post.cover_image_url,
      author: {
        id: post.author_id,
        name: '작성자', // Clerk에서 가져올 예정
        avatar: '/default-avatar.png'
      },
      category: Array.isArray(post.categories)
        ? (post.categories[0]
            ? {
                id: (post.categories[0] as any).id,
                name: (post.categories[0] as any).name,
                slug: (post.categories[0] as any).slug,
                color: (post.categories[0] as any).color,
                description: (post.categories[0] as any).description ?? null,
                created_at: (post.categories[0] as any).created_at ?? '',
                updated_at: (post.categories[0] as any).updated_at ?? '',
              }
            : EMPTY_CATEGORY)
        : post.categories
        ? {
            id: (post.categories as any).id,
            name: (post.categories as any).name,
            slug: (post.categories as any).slug,
            color: (post.categories as any).color,
            description: (post.categories as any).description ?? null,
            created_at: (post.categories as any).created_at ?? '',
            updated_at: (post.categories as any).updated_at ?? '',
          }
        : EMPTY_CATEGORY,
      publishedAt: post.created_at,
      readTime: Math.ceil((post.content?.length || 0) / 200), // 대략적인 읽기 시간
      tags: [], // 추후 구현
      likes: post.likeCount, // 서버에서 조회한 좋아요 수
      comments: [], // 추후 구현 - Comment[] 타입으로 수정
      viewCount: post.view_count || 0,
      // BlogPost 타입 필수 필드 추가
      readingTime: Math.ceil((post.content?.length || 0) / 200),
      likeCount: post.likeCount, // 서버에서 조회한 좋아요 수
      featured: false,
    }));

    console.log('✅ 게시물 목록 데이터 조회 완료');
    return { posts: transformedPosts, pagination, categoriesWithCount };

  } catch (error) {
    console.error('데이터 조회 중 오류 발생:', error);
    return { 
      posts: [], 
      pagination: { currentPage: 1, totalPages: 0, totalItems: 0, hasNext: false, hasPrev: false },
      categoriesWithCount: []
    };
  }
}

async function PostsListContent({ searchParams }: { searchParams: any }) {
  const { posts, pagination, categoriesWithCount } = await PostsList({ searchParams });

  const page = parseInt(searchParams.page || '1');
  const category = searchParams.category || 'all';
  const sort = (searchParams.sort || 'latest') as 'latest' | 'popular' | 'views';
  const search = searchParams.search || '';

  // URL 파라미터 구성
  const buildUrl = (params: Record<string, string>) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value && value !== 'all' && value !== 'latest') {
        searchParams.set(key, value);
      }
    });
    const queryString = searchParams.toString();
    return `/posts${queryString ? `?${queryString}` : ''}`;
  };

  const baseUrl = buildUrl({ category, sort, search }).replace(/&page=\d+/, '');

  return (
    <div className="space-y-8">      {/* 필터링 및 정렬 섹션 */}
      <section className="space-y-6">
        {/* 카테고리 필터 */}
        <div className="bg-background/70 backdrop-blur-sm rounded-xl p-6 border border-primary/10 shadow-sm hover:shadow-md transition-all duration-500 relative">
          <div className="absolute -top-6 left-6 bg-gradient-to-r from-pink-500/20 to-purple-500/20 px-4 py-2 rounded-full border border-primary/10 shadow-sm">
            <span className="text-sm font-medium bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text flex items-center gap-1.5">
              <span>🏷️</span> 카테고리별 필터
            </span>
          </div>
          
          <div className="mt-2">
            <CategoryFilter 
              categories={categoriesWithCount}
              currentCategory={category}
              totalPosts={categoriesWithCount.reduce((sum, cat) => sum + cat.postCount, 0)}
            />
          </div>
        </div>

        {/* 정렬 옵션 */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-primary/10">
          <div className="flex items-center gap-4">
            <SortSelect currentSort={sort} />
          </div>
          
          {/* 검색 박스 (기본 구조) */}
          <div className="relative w-full sm:w-auto">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              🔍
            </div>
            <input
              type="text"
              placeholder="포스트 검색..."
              defaultValue={search}
              className="pl-10 pr-4 py-2 w-full sm:w-auto border border-primary/20 rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent shadow-sm transition-all duration-300"
              disabled // 추후 구현 예정
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
              <Badge variant="outline" className="text-xs bg-background/80">
                준비중
              </Badge>
            </div>
          </div>
        </div>
      </section>      {/* 결과 정보 */}
      <section>
        <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-background to-accent/10 shadow-sm border border-primary/10">
          <p className="text-muted-foreground flex items-center gap-2">
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-1.5 rounded-full flex items-center justify-center w-6 h-6 text-xs font-bold shadow-sm">
              {pagination.totalItems}
            </span>
            <span>
              {category !== 'all' && (
                <>
                  <span className="font-medium text-foreground">
                    {categoriesWithCount.find(cat => cat.slug === category)?.name}
                  </span>{' '}
                  카테고리의{' '}
                </>
              )}
              총 <span className="font-medium text-foreground">{pagination.totalItems}개</span>의 글
              {pagination.totalPages > 1 && (
                <> (페이지 <span className="font-medium text-foreground">{pagination.currentPage}</span> / {pagination.totalPages})</>
              )}
            </span>
          </p>
        </div>
      </section>{/* 포스트 그리드 */}
      <section>
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                showTags={true}
                maxTags={3}
                showCategory={category === 'all'}
              />
            ))}
          </div>
        ) : (
          /* 포스트가 없는 경우 */
          <div className="text-center py-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-blue-500/5 rounded-2xl"></div>
            <div className="relative z-10 py-10 px-8 border-2 border-dashed border-primary/30 rounded-2xl bg-background/50 backdrop-blur-sm shadow-lg max-w-xl mx-auto">
              <div className="text-6xl mb-6 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
                <span className="text-5xl">📄</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
                포스트를 찾을 수 없습니다
              </h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                {search ? (
                  <>검색어 <span className="font-medium">"{search}"</span>에 해당하는 글이 없습니다.</>
                ) : category !== 'all' ? (
                  <>이 카테고리에는 아직 작성된 글이 없습니다.</>
                ) : (
                  <>아직 작성된 글이 없습니다.</>
                )}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/posts"
                  className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-3 text-sm font-medium text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  모든 글 보기
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-lg border border-primary/20 bg-background px-6 py-3 text-sm font-medium hover:bg-accent hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow"
                >
                  홈으로 돌아가기
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 페이지네이션 */}
      {posts.length > 0 && (
        <section className="pt-8">
          <Pagination 
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            baseUrl={baseUrl}
          />
        </section>
      )}
    </div>
  );
}

// 메인 페이지 컴포넌트
export default async function PostsPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;

  return (
    <div className="container py-16 max-w-5xl mx-auto">
      {/* 페이지 헤더 */}
      <div className="text-center mb-16 relative">
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-full h-40 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 rounded-full blur-3xl -z-10"></div>
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
          BLOG POSTS
        </h1>
        <div className="flex justify-center mb-4">
          <Badge variant="outline" className="px-4 py-1 text-base font-medium border-2 border-primary/30">
            ✨ 다양한 주제의 이야기 ✨
          </Badge>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          관람, 제작, 일상, 기타 다양한 주제의 모든 블로그 글을 확인해보세요. 
          카테고리별로 필터링하거나 관심 있는 주제를 검색해보세요.
        </p>
      </div>

      {/* 포스트 목록 (Suspense로 래핑) */}
      <Suspense fallback={
        <div className="text-center py-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-blue-500/5 rounded-2xl"></div>
          <div className="relative z-10 py-8 px-6 border-2 border-dashed border-primary/30 rounded-2xl bg-background/50 backdrop-blur-sm shadow-lg max-w-lg mx-auto">
            <div className="text-6xl mb-6 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
              <span className="text-5xl">⏳</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
              포스트를 불러오는 중...
            </h3>
            <p className="text-muted-foreground">
              잠시만 기다려주세요. 포스트 정보를 가져오고 있습니다.
            </p>
          </div>
        </div>
      }>
        <PostsListContent searchParams={resolvedSearchParams} />
      </Suspense>
    </div>
  );
}