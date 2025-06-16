'use client';

import { useState } from 'react';

interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
  data?: any[];
}

export default function QuickResetCategoriesPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    details?: string;
  } | null>(null);

  const defaultCategories = [
    { name: '관람', slug: 'watching', color: '#3B82F6' },
    { name: '제작', slug: 'creating', color: '#8B5CF6' },
    { name: '일상', slug: 'daily', color: '#10B981' },
    { name: '기타', slug: 'etc', color: '#6B7280' },
  ];

  const resetCategories = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      setResult(null);

      // 세 가지 엔드포인트를 순차적으로 시도      const endpoints = [
        '/api/categories/update?force=true', 
        '/api/simple-reset-categories',
        '/api/admin-reset-categories'
      ];
        let success = false;
      let responseData: ApiResponse | null = null;
      const allErrors: string[] = [];
      
      for (const endpoint of endpoints) {
        try {
          console.log(`카테고리 재설정 시도: ${endpoint}`);
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          // 응답이 JSON인지 확인하기 전에 텍스트로 가져옵니다
          const responseText = await response.text();
          
          // 빈 응답 처리
          if (!responseText.trim()) {
            console.warn(`⚠️ 빈 응답 (${endpoint})`);
            allErrors.push(`${endpoint}: 서버가 빈 응답을 반환했습니다`);
            continue;
          }
          
          // 텍스트를 JSON으로 변환 시도
          let data: ApiResponse;
          try {
            data = JSON.parse(responseText);
          } catch (error) {
            const jsonError = error as Error;
            console.error(`JSON 파싱 오류 (${endpoint}):`, jsonError);
            console.log('응답 상태:', response.status, response.statusText);
            console.log('응답 텍스트:', responseText.substring(0, 500)); // 로그 크기 제한
            
            // 기본 응답 객체 생성
            data = {
              success: false,
              message: `JSON 파싱 오류: ${jsonError.message || '알 수 없는 오류'}. 서버 응답: ${response.status} ${response.statusText}`,
            };
          }
          
          if (response.ok && data.success) {
            success = true;
            responseData = data;
            console.log(`✅ 카테고리 재설정 성공 (${endpoint}):`, data);
            break;
          } else {
            console.warn(`⚠️ 카테고리 재설정 실패 (${endpoint}):`, data);
            allErrors.push(`${endpoint}: ${data.error || data.message || '알 수 없는 오류'}`);
          }
        } catch (endpointError) {
          console.error(`❌ 엔드포인트 오류 (${endpoint}):`, endpointError);
          allErrors.push(`${endpoint}: ${endpointError instanceof Error ? endpointError.message : '알 수 없는 오류'}`);
        }
      }

      if (success && responseData) {
        setResult({
          success: true,
          message: responseData.message || '카테고리가 성공적으로 재설정되었습니다.',
          details: `생성된 카테고리: ${responseData.data?.length || 4}개`
        });
      } else {
        setResult({
          success: false,
          message: '모든 카테고리 재설정 시도가 실패했습니다.',
          details: allErrors.join('\n')
        });
      }
    } catch (error) {
      console.error('카테고리 재설정 중 오류:', error);
      setResult({
        success: false,
        message: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        카테고리 간편 재설정
      </h1>
      
      <div style={{ 
        border: '1px solid #e5e7eb', 
        borderRadius: '0.5rem', 
        padding: '1.5rem',
        marginBottom: '1rem' 
      }}>
        <p style={{ marginBottom: '1rem' }}>
          모든 카테고리를 삭제하고 기본 카테고리로 재설정합니다:
        </p>
        
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {defaultCategories.map((category) => (
            <span 
              key={category.slug}
              style={{ 
                backgroundColor: category.color, 
                color: 'white', 
                padding: '0.25rem 0.5rem',
                borderRadius: '0.25rem',
                fontSize: '0.875rem'
              }}
            >
              {category.name}
            </span>
          ))}
        </div>
        
        <button
          onClick={resetCategories}
          disabled={isLoading}
          style={{
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '0.25rem',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.7 : 1
          }}
        >
          {isLoading ? '처리 중...' : '카테고리 재설정하기'}
        </button>
      </div>
      
      {result && (
        <div style={{
          padding: '1rem',
          borderRadius: '0.375rem',
          backgroundColor: result.success ? '#f0fdf4' : '#fef2f2',
          borderLeft: `4px solid ${result.success ? '#22c55e' : '#ef4444'}`,
          marginTop: '1rem'
        }}>
          <h3 style={{ 
            fontWeight: 'bold', 
            color: result.success ? '#15803d' : '#b91c1c',
            marginBottom: '0.5rem' 
          }}>
            {result.success ? '성공!' : '오류!'}
          </h3>
          <p style={{ color: result.success ? '#166534' : '#b91c1c' }}>
            {result.message}
          </p>
          {result.details && (
            <p style={{ 
              marginTop: '0.5rem', 
              fontSize: '0.875rem',
              color: result.success ? '#166534' : '#b91c1c'
            }}>
              {result.details}
            </p>
          )}
        </div>
      )}
      
      <div style={{ marginTop: '2rem', fontSize: '0.875rem', color: '#6b7280' }}>
        <p>참고: 이 작업은 모든 카테고리를 삭제하고 새로운 카테고리로 교체합니다.</p>
        <p>이 페이지는 UI 컴포넌트를 사용하지 않는 간소화된 버전입니다.</p>
      </div>
    </div>
  );
}
