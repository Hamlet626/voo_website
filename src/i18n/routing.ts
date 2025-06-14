import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'zh', 'zh-TW', 'zh-HK'],
 
  // Used when no locale matches
  defaultLocale: 'en'
});