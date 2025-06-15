'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ReloadIcon, CheckIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons';

export default function ResetCategoriesPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    count?: number;
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

      // 세 가지 엔드포인트를 순차적으로 시도
      const endpoints = [
        '/api/categories/update?force=true', 
        '/api/simple-reset-categories',
        '/api/admin-reset-categories'
      ];
      
      let success = false;
      let responseData = null;
      
      for (const endpoint of endpoints) {
        try {
          console.log(`카테고리 재설정 시도: ${endpoint}`);
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          responseData = await response.json();
          
          if (response.ok && responseData.success) {
            success = true;
            console.log(`✅ 카테고리 재설정 성공 (${endpoint}):`, responseData);
            break;
          } else {
            console.warn(`⚠️ 카테고리 재설정 실패 (${endpoint}):`, responseData);
          }
        } catch (endpointError) {
          console.error(`❌ 엔드포인트 오류 (${endpoint}):`, endpointError);
        }
      }

      if (success && responseData) {
        setResult({
          success: true,
          message: responseData.message || '카테고리가 성공적으로 재설정되었습니다.',
          count: responseData.data?.length || 4,
        });
      } else {
        setResult({
          success: false,
          message: responseData?.error || '모든 카테고리 재설정 시도가 실패했습니다.',
        });
      }
    } catch (error) {
      console.error('카테고리 재설정 중 오류:', error);
      setResult({
        success: false,
        message: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-2xl py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">카테고리 재설정</CardTitle>
          <CardDescription>
            모든 카테고리를 삭제하고 기본 카테고리로 재설정합니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">기본 카테고리:</h3>
            <div className="flex flex-wrap gap-2">
              {defaultCategories.map((category) => (
                <Badge key={category.slug} style={{ backgroundColor: category.color }}>
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>

          {result && (
            <Alert className={result.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}>
              {result.success ? (
                <CheckIcon className="h-4 w-4 text-green-600" />
              ) : (
                <ExclamationTriangleIcon className="h-4 w-4 text-red-600" />
              )}
              <AlertTitle className={result.success ? 'text-green-800' : 'text-red-800'}>
                {result.success ? '성공!' : '오류!'}
              </AlertTitle>
              <AlertDescription className={result.success ? 'text-green-700' : 'text-red-700'}>
                {result.message}
                {result.success && result.count && (
                  <p className="mt-1">{result.count}개의 카테고리가 생성되었습니다.</p>
                )}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            onClick={resetCategories} 
            disabled={isLoading}
            variant="destructive"
            size="lg"
            className="w-full"
          >
            {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? '처리 중...' : '카테고리 재설정하기'}
          </Button>
        </CardFooter>
      </Card>
      
      <div className="mt-8 text-sm text-muted-foreground">
        <p>참고: 이 작업은 모든 카테고리를 삭제하고 새로운 카테고리로 교체합니다.</p>
        <p>게시물에 연결된 카테고리 ID는 변경될 수 있으므로 게시물 업데이트가 필요할 수 있습니다.</p>
      </div>
    </div>
  );
}
