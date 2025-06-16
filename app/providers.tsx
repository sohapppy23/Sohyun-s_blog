'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';
import { type ReactNode, useEffect, useState } from 'react';

/**
 * 전역 프로바이더 컴포넌트
 * - ClerkProvider: 인증 상태 관리
 */
export function Providers({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 하이드레이션 이슈 방지를 위해 클라이언트 사이드에서만 마운트 완료로 설정
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div suppressHydrationWarning={true}>
      <ClerkProvider
        appearance={{
          baseTheme: mounted && theme === 'dark' ? dark : undefined,
          variables: {
            colorPrimary: '#0F172A',
            colorTextOnPrimaryBackground: '#FFFFFF',
          },
        }}
        localization={{
          locale: 'ko-KR',
          socialButtonsBlockButton: '{{provider}}로 계속하기',
          signIn: {
            start: {
              title: '로그인',
              subtitle: '계정에 로그인하여 계속하세요',
            },
          },
          signUp: {
            start: {
              title: '회원가입',
              subtitle: '계정을 만들어 시작하세요',
            },
          },
        }}
      >
        {children}
      </ClerkProvider>
    </div>
  );
}
