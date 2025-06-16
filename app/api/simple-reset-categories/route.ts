/**
 * 카테고리 단순 재설정 API 라우트
 * 인증 없이 카테고리를 기본값으로 재설정
 * 
 * GET/POST: 모든 카테고리를 새로운 카테고리로 교체 (관람, 제작, 일상, 기타)
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Database, ApiResponse } from '@/types/database.types';

// 타입 정의
type CategoryInsert = Database['public']['Tables']['categories']['Insert'];

// 새 카테고리 데이터
const NEW_CATEGORIES: CategoryInsert[] = [
  {
    name: '관람',
    slug: 'watching',
    description: '공연, 영화, 전시회 등 문화 예술 관람에 관한 이야기',
    color: '#A5C8FF'  // 파스텔 블루
  },
  {
    name: '제작',
    slug: 'creating',
    description: '직접 만들고 제작하는 콘텐츠와 작품에 대한 이야기',
    color: '#D8B4FE'  // 파스텔 퍼플
  },
  {
    name: '일상',
    slug: 'daily',
    description: '소소한 일상과 경험을 공유하는 이야기',
    color: '#A7F3D0'  // 파스텔 그린
  },
  {
    name: '기타',
    slug: 'etc',
    description: '다양한 주제의 기타 이야기',
    color: '#D1D5DB'  // 파스텔 그레이
  }
];

// 직접 Supabase 클라이언트 생성 함수
function createDirectSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  // 서비스 롤 키를 우선 사용하고, 없으면 익명 키 사용
  const key = serviceRoleKey || anonKey;
  
  if (!url || !key) {
    throw new Error('Supabase 환경 변수가 설정되지 않았습니다');
  }
  
  return createClient<Database>(url, key);
}

// ========================================
// 모든 HTTP 메소드 처리 (GET, POST 등)
// ========================================
export async function GET(request: NextRequest): Promise<NextResponse> {
  return handleCategoryReset();
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  return handleCategoryReset();
}

// 카테고리 재설정 함수
async function handleCategoryReset(): Promise<NextResponse> {
  try {
    console.log('=== 간단한 카테고리 재설정 API 호출 ===');

    // Supabase 클라이언트 생성
    const supabase = createDirectSupabaseClient();

    // 1. 기존 카테고리 삭제
    console.log('1. 기존 카테고리 삭제 시도');
    const { error: deleteError } = await supabase
      .from('categories')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // 모든 행 안전하게 삭제

    if (deleteError) {
      console.error('❌ 카테고리 삭제 오류:', deleteError);
      return NextResponse.json(
        { 
          success: false, 
          error: `카테고리 삭제 실패: ${deleteError.message}` 
        } as ApiResponse,
        { status: 500 }
      );
    }

    // 2. 새 카테고리 추가
    console.log('2. 새 카테고리 추가 시도');
    const { data: insertedCategories, error: insertError } = await supabase
      .from('categories')
      .insert(NEW_CATEGORIES)
      .select();

    if (insertError) {
      console.error('❌ 새 카테고리 추가 오류:', insertError);
      return NextResponse.json(
        { 
          success: false, 
          error: `새 카테고리 추가 실패: ${insertError.message}` 
        } as ApiResponse,
        { status: 500 }
      );
    }

    console.log('✅ 카테고리 재설정 완료:', insertedCategories?.length || 0, '개의 카테고리 추가됨');

    // 성공 응답 반환
    return NextResponse.json({
      success: true,
      data: insertedCategories,
      message: '카테고리가 성공적으로 재설정되었습니다',
      categories: NEW_CATEGORIES
    });
    
  } catch (error: any) {
    // 예상치 못한 오류 처리
    console.error('카테고리 재설정 중 오류 발생:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: `서버 오류가 발생했습니다: ${error.message || '알 수 없는 오류'}` 
      } as ApiResponse,
      { status: 500 }
    );
  }
}
