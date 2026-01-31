'use server';

import { headers } from 'next/headers';
import { db } from '@/app/lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { UAParser } from 'ua-parser-js';

/**
 * 记录用户指纹信息到 Firestore
 * 增加了防抖逻辑，防止同一 IP 短时间内重复写入
 */
export async function recordFingerprint(inviteId: string) {
  const headersList = await headers();
  // 获取 IP
  const forwardedFor = headersList.get('x-forwarded-for');
  const ip = forwardedFor ? forwardedFor.split(',')[0] : 'unknown';
  const userAgent = headersList.get('user-agent') || '';

  // 1. 如果没有 IP，记录无意义，直接返回
  if (ip === 'unknown') return;

  // 2. 【防抖检查】查询该 IP 是否在过去 30 分钟内已经记录过该邀请码
  // 为了避免复杂的 Firestore 复合索引配置报错，这里采用策略：
  // 先按 IP 和 InviteCode 筛选出记录，然后在内存中检查时间（通常一个 IP 的记录数极少，效率很高）
  try {
    const q = query(
      collection(db, 'app_install_data'),
      where('ip', '==', ip),
      where('invite_code', '==', inviteId)
    );

    const snapshot = await getDocs(q);
    
    // 检查是否存在 30 分钟内的记录
    const hasRecentRecord = snapshot.docs.some(doc => {
      const data = doc.data();
      if (!data.timestamp) return false;
      
      // timestamp 是 Firestore Timestamp 对象，需转换为毫秒
      // 使用可选链防止数据格式异常
      const recordTime = (data.timestamp as any).toMillis?.() || 0;
      const thirtyMinutes = 30 * 60 * 1000;
      
      return Date.now() - recordTime < thirtyMinutes;
    });

    if (hasRecentRecord) {
      console.log(`[Fingerprint] Skipped duplicate (debounce): IP=${ip}, Code=${inviteId}`);
      return; // 如果有最近的记录，直接跳过，不写入
    }

  } catch (error) {
    console.warn("Error checking duplicates:", error);
    // 即使查重失败，为了不影响核心功能，也可以选择继续写入，或者直接 return
  }

  // 3. 解析 UA 获取 OS 信息
  const parser = new UAParser(userAgent);
  const os = parser.getOS();
  const simpleVersion = os.version?.split('.').slice(0, 2).join('.') || 'unknown';

  // 4. 写入新记录
  try {
    await addDoc(collection(db, 'app_install_data'), {
      ip: ip,
      os: os.name || 'unknown',
      version: simpleVersion,
      invite_code: inviteId,
      raw_ua: userAgent,
      timestamp: serverTimestamp(),
    });
    console.log(`[Fingerprint] Recorded: IP=${ip}, Code=${inviteId}`);
  } catch (error) {
    console.error("Error recording fingerprint:", error);
  }
}