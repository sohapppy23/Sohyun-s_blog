"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function ForceUpdateCategoriesPage() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleForceUpdate = async () => {
    try {
      setIsUpdating(true);
      setMessage('');
      setError('');

      const response = await fetch('/api/admin-reset-categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('카테고리가 성공적으로 재설정되었습니다.');
      } else {
        throw new Error(result.error || '알 수 없는 오류가 발생했습니다.');
      }
    } catch (err: any) {
      setError(err.message || '카테고리 재설정 중 오류가 발생했습니다.');
      console.error('카테고리 재설정 오류:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">카테고리 강제 업데이트</h1>
      
      <div className="rounded-lg border bg-card shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">강제 카테고리 재설정</h2>
        <p className="mb-4">
          서비스 롤 키를 사용하여 카테고리를 "관람", "제작", "일상", "기타"로 강제 재설정합니다.
          이 작업은 되돌릴 수 없습니다.
        </p>
        
        {message && (
          <div className="bg-green-50 border border-green-200 text-green-800 rounded p-4 mb-4">
            {message}
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded p-4 mb-4">
            {error}
          </div>
        )}
        
        <div className="flex flex-col space-y-4">
          <button
            onClick={handleForceUpdate}
            disabled={isUpdating}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium disabled:opacity-50 bg-red-600 text-white shadow hover:bg-red-700 h-10 px-4 py-2"
          >
            {isUpdating ? '처리 중...' : '강제 카테고리 재설정'}
          </button>
          
          <Link href="/admin/categories">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-gray-100 text-gray-900 shadow hover:bg-gray-200 h-10 px-4 py-2 w-full">
              카테고리 관리로 돌아가기
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
