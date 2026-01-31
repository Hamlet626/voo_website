import Image from 'next/image';
import { db } from '@/app/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { recordFingerprint } from './actions';
import InviteClient from './InviteClient';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

// 定义接口
interface ServiceItem {
  id: string;
  title: string;
  image: string;
  category?: string;
}

// 获取预览服务数据 (服务端执行)
async function getServiceData(): Promise<ServiceItem[]> {
  try {
    // 🔥 在这里配置你想展示的固定 Document ID
    // 确保这些 ID 在你的 Firestore 'services' 集合中真实存在
    const fixedServiceIds = [
      '/comps/MPIO9lAkOQNEGykB5YHo0a2w3fy2/services/E2RLW0XVSYpRMiLvVKsU', 
      '/comps/MPIO9lAkOQNEGykB5YHo0a2w3fy2/services/J22s11ZoZwyxFS0bEbbC', 
      '/comps/MPIO9lAkOQNEGykB5YHo0a2w3fy2/services/hEYWjIXej51g18kCKvN4' , 
      '/comps/MPIO9lAkOQNEGykB5YHo0a2w3fy2/services/TQ9AZzmk5l9uN8SFE8Gc' 
    ];

    // 1. 创建读取任务列表 (并行读取，速度最快)
    const fetchPromises = fixedServiceIds.map(id => getDoc(doc(db, id)));
    
    // 2. 等待所有读取完成
    const snapshots = await Promise.all(fetchPromises);
    
    // 3. 过滤掉不存在的文档(以防ID填错了)，并转换数据格式
    return snapshots
      .filter(snap => snap.exists())
      .map(snap => {
        const data = snap.data();
        return {
          id: snap.id,
          title: data?.name || '精选服务',
          // 如果没有图，用一个占位图
          image: data?.meta?.previewImg || 'https://placehold.co/100x100/e2e8f0/1e293b?text=Service',
          category: data?.category,
        };
      });
  } catch (e) {
    console.error("Failed to fetch services", e);
    return []; // 失败了也不要崩，返回空数组
  }
}

interface PageProps {
  params: Promise<{ inviteId: string; locale: string }>;
  searchParams: Promise<{ type?: string }>;
}

export default async function InvitePage({ params, searchParams }: PageProps) {
  const { inviteId, locale } = await params;
  const { type } = await searchParams;
  
  // 1. 记录指纹
  recordFingerprint(inviteId);

  // 2. 获取带文字的服务数据
  const services = await getServiceData();
  const isProvider = type === 'provider';
  
  const t = await getTranslations('HomePage');
  const contentBlocks = type === 'provider'?
      {
          heading: t('provider.heading'),
          body: t('provider.body'),
          tagline: t('provider.tagline'),
          appEntryProps: {
              text: t('provider.appEntry'),
              playLink: 'https://play.google.com/store/apps/details?id=dev.voo.providers',
              appleLink: 'https://apps.apple.com/us/app/voo-pro-百事通店商/id6740048998',
              isPvd: true
          }
      }:
      {
          heading: t('customer.heading'),
          body: t('customer.body'),
          tagline: t('customer.tagline'),
          appEntryProps: {
              text: t('customer.appEntry'),
              playLink: 'https://play.google.com/store/apps/details?id=dev.voo.customers',
              appleLink: 'https://apps.apple.com/us/app/百事通-您需要的生活服务/id6747854851',
              isPvd: false
          }
      };

  return (
    <section className="relative w-full h-screen flex items-center bg-black overflow-hidden">
      
      {/* Header / Logo (Absolute positioning to match layout) */}
      <div className="absolute top-8 left-8 sm:left-32 z-20">
         <Link href="/" className="flex items-center space-x-2 drop-shadow-md">
        <Image
          src="/images/app_icon_nobg.svg"
          alt="Voo Logo"
          width={40}
          height={40}
          priority
        />
        <span className="text-2xl font-bold text-green-500 drop-shadow-md">
          {t('appName')}
        </span>
      </Link>
      </div>

      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute right-0 top-0 h-full w-2/3 object-cover opacity-90"
      >
        <source src="/videos/landing_bg.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay (Matching your HeroSection) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black via-[33%] to-black/50 to-[70%]"></div>

      {/* Content Container (Left aligned) */}
      <div className="absolute left-8 sm:left-32 top-1/2 -translate-y-1/2 pl-0 w-[90%] sm:w-1/3 sm:min-w-[500px] text-white drop-shadow-md z-10">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
          {contentBlocks.heading}
        </h1>
        <p className="text-base sm:text-xl mb-4 sm:mb-8 text-gray-200">
          {contentBlocks.body}
        </p>

        {/* Tagline showing Invite ID context */}
        <p className="text-sm sm:text-md italic mt-2 mb-20 sm:mb-32 text-gray-400 border-l-2 border-green-500 pl-4">
          {contentBlocks.tagline}
        </p>

        {/* Single Button Client Component */}
        <InviteClient 
          inviteId={inviteId} 
          userType={type}
        />
      </div>
    </section>
  );
}