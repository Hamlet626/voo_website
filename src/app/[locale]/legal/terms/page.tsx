'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl'; // 引入 next-intl

import LegalPageViewer from '@/app/components/LegalPageViewer';
import { lastUpdatedString, TERMS_TEMPLATES } from '@/app/lib/legal-content'; // 引入多语言模板
import { fetchPolicyData, replacePlaceholders, PolicyData } from '@/app/lib/policy-helper';

// 定义合法的 Locale 类型，防止类型报错
type SupportedLocale = 'en' | 'zh' | 'tw' | 'hk';

export default function TermsPage() {
  // 1. 获取翻译钩子
  const t = useTranslations('Legal');
  const locale = useLocale(); // 获取当前语言代码 (例如 'zh', 'en')

  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      // A. 获取 Firebase 数据 (数字)
      const data: PolicyData = await fetchPolicyData();
      
      // B. 确定当前应该用哪个语言模板
      // 如果当前的 locale 不在我们需要支持的列表里，回退到英文
      const currentLang = (['en', 'zh', 'tw', 'hk'].includes(locale) ? locale : 'en') as SupportedLocale;
      
      const rawMarkdown = TERMS_TEMPLATES[currentLang];
      
      // C. 替换占位符 (把 {{platformFee}} 变成 3.6%)
      const finalMarkdown = replacePlaceholders(rawMarkdown, data);
      
      setContent(finalMarkdown);
      setLoading(false);
    }

    loadData();
  }, [locale]); // 当语言改变时，重新运行

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
         {/* 使用 next-intl 翻译 Loading 文字 */}
         <p className="text-gray-500">{t('loading')}</p>
      </div>
    );
  }

  return (
    <LegalPageViewer 
      // 使用 next-intl 翻译标题
      title={t('termsTitle')} 
      lastUpdate={t('lastUpdated', { date: lastUpdatedString })}
      content={content} 
    />
  );
}