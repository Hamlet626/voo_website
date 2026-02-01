'use client';

import { useEffect, useState } from 'react';
import { CLIENT_GOOGLE_PLAY_LINK, CLIENT_APPLE_STORE_LINK, PRO_GOOGLE_PLAY_LINK, PRO_APPLE_STORE_LINK } from '@/app/lib/links';
import { useTranslations } from 'next-intl';
import { recordFingerprint } from './actions';

interface InviteClientProps {
  inviteId?: string;
  userType?: string; // 'client' | 'provider' | undefined
}

export default function InviteClient({ inviteId, userType }: InviteClientProps) {
  const t = useTranslations('InvitePage');

  // 1. 仅保留 useEffect 用于页面加载时的“静默复制”
  useEffect(() => {
    if (inviteId) {
      const code = `ivid:${inviteId}`;
      navigator.clipboard.writeText(code).catch(() => {});
      
      const clientUA = navigator.userAgent;
      recordFingerprint(inviteId, clientUA);
    }
  }, [inviteId]);

  // 2. 将设备检测逻辑移到点击事件中 (这样就不需要 State 了)
  const handleDownload = (targetType: 'client' | 'provider') => {
    // A. 再次强制写入剪贴板
    if (inviteId) {
      navigator.clipboard.writeText(`ivid:${inviteId}`);
    }

    // B. 在点击瞬间检测设备 (安全，因为点击肯定在客户端发生)
    const u = navigator.userAgent;
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;

    // C. 决定跳转链接
    let targetUrl = '';
    if (targetType === 'provider') {
      targetUrl = isAndroid ? PRO_GOOGLE_PLAY_LINK : PRO_APPLE_STORE_LINK;
    } else {
      targetUrl = isAndroid ? CLIENT_GOOGLE_PLAY_LINK : CLIENT_APPLE_STORE_LINK;
    }

    // D. 跳转
    window.location.href = targetUrl;
  };

  // 3. 纯 UI 按钮组件
  const DownloadButton = ({ 
    text, 
    variant = 'primary',
    targetType 
  }: { 
    text: string, 
    variant?: 'primary' | 'dark', 
    targetType: 'client' | 'provider'
  }) => {
    const baseStyle = `flex items-center justify-center gap-3 px-8 py-4 font-bold rounded-xl shadow-lg transition-all transform active:scale-[0.98] text-lg w-full sm:w-auto min-w-[220px] z-10`;
    
    const variants = {
      primary: 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-green-200/50',
      dark: 'bg-gray-800 hover:bg-gray-900 text-white shadow-gray-500/30',
    };

    return (
      <button 
        onClick={() => handleDownload(targetType)}
        className={`${baseStyle} ${variants[variant]}`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        <span>{text}</span>
      </button>
    );
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
      {userType ? (
        // 情况 A: 指定了 Type (显示单个按钮)
        <DownloadButton 
          text={t(userType === 'provider' ? 'buttonTextProvider' : 'buttonTextClient')}
          variant="primary"
          targetType={userType as 'client' | 'provider'}
        />
      ) : (
        // 情况 B: 未指定 Type (显示双按钮)
        <>
          <DownloadButton 
            text={t('buttonTextClient')}
            variant="primary"
            targetType="client"
          />
          <DownloadButton 
            text={t('buttonTextProvider')}
            variant="dark"
            targetType="provider"
          />
        </>
      )}
    </div>
  );
}