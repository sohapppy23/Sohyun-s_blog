/**
 * 카테고리 관리자 직접 재설정 API 라우트
 * 서비스 롤 키를 사용하여 인증 없이 카테고리 재설정
 * 
 * GET/POST: 모든 카테고리를 새로운 카테고리로 교체 (관람, 제작, 일상, 기타)
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Database, ApiResponse } from '@/types/database.types';

// 타입 정의
type CategoryInsert = Database['public']['Tables']['categories']['Insert'];

// 새 카테고리 데이터
const DEFAULT_CATEGORIES: CategoryInsert[] = [
  {
    name: '관람',
    slug: 'watching',
    description: '공연, 영화, 전시회 등 문화 예술 관람에 관한 이야기',
    color: '#3B82F6'  // 파란색
  },
  {
    name: '제작',
    slug: 'creating',
    description: '직접 만들고 제작하는 콘텐츠와 작품에 대한 이야기',
    color: '#8B5CF6'  // 보라색
  },
  {
    name: '일상',
    slug: 'daily',
    description: '소소한 일상과 경험을 공유하는 이야기',
    color: '#10B981'  // 초록색
  },
  {
    name: '기타',
    slug: 'etc',
    description: '다양한 주제의 기타 이야기',
    color: '#6B7280'  // 회색
  }
];

// 서비스 롤 키로 Supabase 클라이언트 생성
function createServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!url || !serviceRoleKey) {
    console.error('환경 변수 오류: Supabase URL 또는 서비스 롤 키가 없습니다.');
    throw new Error('서버 설정 오류가 발생했습니다. 관리자에게 문의하세요.');
  }
  
  return createClient<Database>(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

// 모든 HTTP 메소드 처리 (GET, POST 지원)
export async function GET(request: NextRequest): Promise<NextResponse> {
  return resetCategoriesWithServiceRole();
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  return resetCategoriesWithServiceRole();
}

// 서비스 롤로 카테고리 재설정 함수
async function resetCategoriesWithServiceRole(): Promise<NextResponse> {
  const supabase = createServiceRoleClient();
  
  try {
    console.log('=== 관리자 카테고리 재설정 API 호출 (서비스 롤) ===');

    // 1. 기존 카테고리 삭제 (RLS 우회)
    console.log('1. 기존 카테고리 모두 삭제 시도');
    const { error: deleteError } = await supabase
      .from('categories')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');

    if (deleteError) {
      console.error('❌ 카테고리 삭제 오류:', deleteError);
      throw new Error(`카테고리 삭제 실패: ${deleteError.message}`);
    }

    // 2. 새 카테고리 추가 (RLS 우회)
    console.log('2. 새 카테고리 추가 시도');
    const { error: insertError } = await supabase
      .from('categories')
      .insert(DEFAULT_CATEGORIES);

    if (insertError) {
      console.error('❌ 카테고리 추가 오류:', insertError);
      throw new Error(`새 카테고리 추가 실패: ${insertError.message}`);
    }

    console.log('✅ 카테고리 재설정 완료');
    
    // 성공 응답
    return NextResponse.json(
      { 
        success: true, 
        message: '카테고리가 성공적으로 재설정되었습니다.',
        data: {
          categories: DEFAULT_CATEGORIES
        }
      } as ApiResponse,
      { 
        status: 200,
        headers: {
          'Cache-Control': 'no-store',
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
          'X-XSS-Protection': '1; mode=block'
        }
      }
    );

  } catch (error: any) {
    console.error('❌ 카테고리 재설정 중 오류 발생:', error);
    
    // 에러 응답
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || '알 수 없는 오류가 발생했습니다.'
      } as ApiResponse,
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-store',
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
          'X-XSS-Protection': '1; mode=block'
        }
      }
    );
  }
}
