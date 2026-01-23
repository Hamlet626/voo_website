'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import LegalPageViewer from '@/app/components/LegalPageViewer';
import { lastUpdatedString, PRIVACY_TEMPLATES } from '@/app/lib/legal-content';

// 定义支持的语言类型，确保 TypeScript 不报错
type SupportedLocale = 'en' | 'zh' | 'tw' | 'hk';

export default function PrivacyPage() {
  // 1. 获取翻译钩子（用于标题）
  const t = useTranslations('Legal');
  
  // 2. 获取当前 URL 的语言前缀
  const locale = useLocale();

  // 3. 确定当前应该用哪个语言模板
  // 逻辑：检查当前 locale 是否在我们的支持列表中，如果不在（比如是 'fr'），默认回退到 'en'
  const currentLang = (['en', 'zh', 'tw', 'hk'].includes(locale) ? locale : 'en') as SupportedLocale;

  // 4. 直接获取静态 Markdown 内容 (因为不需要替换占位符，所以直接读常量)
  const content = PRIVACY_TEMPLATES[currentLang];

  return (
    <LegalPageViewer 
      title={t('privacyTitle')} // 使用 json 里的 "隐私政策" / "Privacy Policy"
      lastUpdate={t('lastUpdated', { date: lastUpdatedString })}
      content={content} 
    />
  );
}