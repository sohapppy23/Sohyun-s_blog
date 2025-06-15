"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

type Category = {
  id?: string;
  name: string;
  slug: string;
  description: string;
  color: string;
}

export default function UpdateCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error('카테고리를 불러오는 중 오류가 발생했습니다.');
        }
        const data = await response.json();
        setCategories(data.data?.categories || []);
      } catch (err: any) {
        setError(err.message || '카테고리를 불러오는 중 오류가 발생했습니다.');
        console.error('카테고리 로딩 오류:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCategories();
  }, []);

  const handleUpdateCategory = async (category: Category) => {
    try {
      setMessage('');
      setError('');
      
      const response = await fetch('/api/categories/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(category),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setMessage(`"${category.name}" 카테고리가 업데이트되었습니다.`);
        // 카테고리 목록 갱신
        const updatedCategoriesRes = await fetch('/api/categories');
        const updatedCategoriesData = await updatedCategoriesRes.json();
        setCategories(updatedCategoriesData.data?.categories || []);
      } else {
        throw new Error(result.error || '알 수 없는 오류가 발생했습니다.');
      }
    } catch (err: any) {
      setError(err.message || '카테고리 업데이트 중 오류가 발생했습니다.');
      console.error('카테고리 업데이트 오류:', err);
    }
  };

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">카테고리 업데이트</h1>
      
      <div className="rounded-lg border bg-card shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">카테고리 관리</h2>
        
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
        
        {isLoading ? (
          <div className="text-center py-8">로딩 중...</div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 mt-6">
              {categories.map((category) => (
                <div key={category.id} className="border rounded-lg p-4" style={{ borderLeftColor: category.color, borderLeftWidth: '4px' }}>
                  <h3 className="font-medium">{category.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">slug: {category.slug}</p>
                  <p className="text-sm mb-4">{category.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 flex justify-end space-x-4">
              <Link href="/admin/categories">
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-gray-100 text-gray-900 shadow hover:bg-gray-200 h-10 px-4 py-2">
                  카테고리 관리로 돌아가기
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
