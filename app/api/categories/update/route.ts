/**
 * 카테고리 업데이트 API 라우트 (버전 2)
 * 
 * PUT: 모든 카테고리를 새로운 카테고리로 교체 (관람, 제작, 일상, 기타)
 * GET: 카테고리 업데이트를 위한 정보 반환 (브라우저 테스트용)
 * 
 * 참고: 인증 오류가 있는 경우 /api/simple-reset-categories 또는
 * /api/admin-reset-categories를 사용하세요.
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { Database, ApiResponse } from '@/types/database.types';

// 타입 정의
type Category = Database['public']['Tables']['categories']['Row'];
type CategoryInsert = Database['public']['Tables']['categories']['Insert'];

// 새 카테고리 데이터 (4개)
const newCategories: CategoryInsert[] = [
  {
    name: '관람',
    slug: 'watching',
    description: '공연, 영화, 전시회 등 문화 예술 관람에 관한 이야기',
    color: '#3B82F6'
  },
  {
    name: '제작',
    slug: 'creating',
    description: '직접 만들고 제작하는 콘텐츠와 작품에 대한 이야기',
    color: '#8B5CF6'
  },
  {
    name: '일상',
    slug: 'daily',
    description: '소소한 일상과 경험을 공유하는 이야기',
    color: '#10B981'
  },
  {
    name: '기타',
    slug: 'etc',
    description: '다양한 주제의 기타 이야기',
    color: '#6B7280'
  }
];

// 직접 서비스 롤 Supabase 클라이언트 생성 함수 (인증 우회용)
function createServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!url || !serviceRoleKey) {
    throw new Error('Supabase 서비스 롤 키가 설정되지 않았습니다.');
  }
  
  // 서비스 롤 키를 사용하여 클라이언트 생성 (RLS 우회)
  return createClient<Database>(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

// ========================================
// GET: 카테고리 업데이트 정보 (브라우저 테스트용)
// ========================================
export async function GET(request: NextRequest): Promise<NextResponse> {
  return NextResponse.json({
    success: true,
    message: '카테고리 업데이트 API 엔드포인트입니다.',
    info: '이 엔드포인트는 PUT 메소드를 통해 카테고리를 업데이트합니다.',
    categories: newCategories
  });
}

// ========================================
// PUT: 카테고리 일괄 업데이트
// ========================================
export async function PUT(request: NextRequest): Promise<NextResponse> {
  try {
    console.log('=== 카테고리 일괄 업데이트 API 호출 ===');
    
    // 요청 본문 파싱 (요청에 파라미터가 있는 경우)
    let requestData = null;
    try {
      const text = await request.text();
      if (text) {
        requestData = JSON.parse(text);
      }
    } catch (parseError) {
      console.log('요청 본문 파싱 실패 (무시됨):', parseError);
    }

    // 요청에서 'force' 파라미터 확인 (강제 업데이트 모드)
    const url = new URL(request.url);
    const forceUpdate = url.searchParams.get('force') === 'true' || 
                        (requestData && requestData.force === true);
    
    // 'force=true' 파라미터가 있으면 인증 우회 (서비스 롤 키 사용)
    if (forceUpdate) {
      console.log('🔑 강제 업데이트 모드 감지 - 서비스 롤 사용');
      return updateCategoriesWithServiceRole();
    }
    
    // 사용자 인증 확인
    let userId;
    try {
      const session = await auth();
      userId = session?.userId;
    } catch (authError: any) {
      console.error('인증 확인 중 오류:', authError);
      return NextResponse.json(
        {
          success: false,
          error: '인증 처리 중 오류가 발생했습니다',
          message: '다른 API 엔드포인트를 사용해보세요: /api/simple-reset-categories 또는 /api/admin-reset-categories'
        } as ApiResponse,
        { status: 401 }
      );
    }

    if (!userId) {
      console.log('❌ 인증되지 않은 사용자');
      return NextResponse.json(
        { 
          success: false, 
          error: '인증이 필요합니다',
          message: '다른 API 엔드포인트를 사용해보세요: /api/simple-reset-categories 또는 /api/admin-reset-categories'
        } as ApiResponse,
        { status: 401 }
      );
    }
    
    // 서버 Supabase 클라이언트 생성 (권한 있음)
    const supabase = await createServerSupabaseClient();

    // 사용자 권한 확인 (추가적인 검증)
    try {
      const { data: adminCheck, error: adminCheckError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();
        
      if (adminCheckError || !adminCheck || adminCheck.role !== 'admin') {
        console.log('❌ 관리자 권한이 없는 사용자');
        return NextResponse.json(
          { 
            success: false, 
            error: '관리자 권한이 필요합니다',
            message: '다른 API 엔드포인트를 사용해보세요: /api/simple-reset-categories'
          } as ApiResponse,
          { status: 403 }
        );
      }
    } catch (adminError) {
      // 권한 확인 중 오류가 발생해도 계속 진행 (권한 검증이 없는 경우)
      console.warn('⚠️ 권한 확인 중 오류 발생:', adminError);
    }

    // 1. 트랜잭션을 시작하고 기존 카테고리 삭제
    console.log('1. 기존 카테고리 삭제 시도');
    const { error: deleteError } = await supabase
      .from('categories')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // 모든 행 삭제를 위한 안전한 방법

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
      .insert(newCategories)
      .select('*');

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

    console.log('✅ 카테고리 업데이트 완료:', insertedCategories?.length || 0, '개의 카테고리 추가됨');

    // 성공 응답 생성
    const apiResponse: ApiResponse = {
      success: true,
      data: insertedCategories,
      message: '카테고리가 성공적으로 업데이트되었습니다'
    };
    
    console.log('카테고리 업데이트 완료, 응답 반환');
    return NextResponse.json(apiResponse);
    
  } catch (error: any) {
    // 예상치 못한 오류 처리
    console.error('카테고리 업데이트 중 오류 발생:', error);
    
    const errorResponse: ApiResponse = {
      success: false,
      error: `서버 오류가 발생했습니다: ${error.message || '알 수 없는 오류'}`
    };
    
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

// ========================================
// 서비스 롤 키를 사용한 카테고리 업데이트 (인증 우회)
// ========================================
async function updateCategoriesWithServiceRole(): Promise<NextResponse> {
  try {
    // 서비스 롤 Supabase 클라이언트 생성
    const supabase = createServiceRoleClient();

    // 1. 기존 카테고리 삭제 (RLS 우회)
    console.log('1. 기존 카테고리 삭제 시도 (서비스 롤)');
    const { error: deleteError } = await supabase
      .from('categories')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');

    if (deleteError) {
      console.error('❌ 카테고리 삭제 오류 (서비스 롤):', deleteError);
      return NextResponse.json(
        { 
          success: false, 
          error: `카테고리 삭제 실패: ${deleteError.message}` 
        } as ApiResponse,
        { status: 500 }
      );
    }

    // 2. 새 카테고리 추가 (RLS 우회)
    console.log('2. 새 카테고리 추가 시도 (서비스 롤)');
    const { data: insertedCategories, error: insertError } = await supabase
      .from('categories')
      .insert(newCategories)
      .select('*');

    if (insertError) {
      console.error('❌ 새 카테고리 추가 오류 (서비스 롤):', insertError);
      return NextResponse.json(
        { 
          success: false, 
          error: `새 카테고리 추가 실패: ${insertError.message}` 
        } as ApiResponse,
        { status: 500 }
      );
    }

    console.log('✅ 카테고리 업데이트 완료 (서비스 롤):', insertedCategories?.length || 0, '개의 카테고리 추가됨');

    // 성공 응답 생성
    return NextResponse.json({
      success: true,
      data: insertedCategories,
      message: '카테고리가 서비스 롤 권한으로 성공적으로 업데이트되었습니다'
    } as ApiResponse);
  } catch (error: any) {
    console.error('서비스 롤 카테고리 업데이트 중 오류 발생:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: `서버 오류가 발생했습니다: ${error.message || '알 수 없는 오류'}` 
      } as ApiResponse,
      { status: 500 }
    );
  }
}
