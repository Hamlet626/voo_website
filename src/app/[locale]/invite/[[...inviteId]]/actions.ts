'use server';

import { headers } from 'next/headers';
import { db } from '@/app/lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { UAParser } from 'ua-parser-js';

/**
 * 记录用户指纹信息到 Firestore
 * 增加了防抖逻辑，防止同一 IP 短时间内重复写入
 */
export async function recordFingerprint(inviteId?: string, clientUserAgent?: string) {
  if (!inviteId) return;
  
  const headersList = await headers();
  // 获取 IP
  const forwardedFor = headersList.get('x-forwarded-for');
  const ip = forwardedFor ? forwardedFor.split(',')[0] : 'unknown';
  const userAgent = clientUserAgent || headersList.get('user-agent') || '';

  // 1. 如果没有 IP，记录无意义，直接返回
  if (ip === 'unknown') return;

  /// --- 解析 OS 逻辑开始 ---
  const parser = new UAParser(userAgent);
  let osName = parser.getOS().name;
  let osVersion = parser.getOS().version;

  // 手动兜底匹配 (解决 ua-parser-js 识别不全的问题)
  if (!osName || osName === 'undefined') {
    const lowerUA = userAgent.toLowerCase();
    if (lowerUA.includes('android')) {
      osName = 'Android';
      const match = userAgent.match(/Android\s([0-9.]+)/);
      if (match) osVersion = match[1];
    } else if (lowerUA.includes('iphone') || lowerUA.includes('ipad') || lowerUA.includes('ipod')) {
      osName = 'iOS';
      const match = userAgent.match(/OS\s([\d_]+)/);
      if (match) osVersion = match[1].replace(/_/g, '.');
    } else if (lowerUA.includes('macintosh') || lowerUA.includes('mac os')) {
      osName = 'Mac/iOS'; 
    } else if (lowerUA.includes('windows')) {
      osName = 'Windows';
    } else {
      osName = 'unknown';
    }
  }

  // 简化版本号
  const simpleVersion = osVersion ? osVersion.split('.').slice(0, 2).join('.') : 'unknown';
  // --- 解析 OS 逻辑结束 ---

  // 1. 防抖检查 (智能去重)
  try {
    const q = query(
      collection(db, 'app_install_data'),
      where('ip', '==', ip),
      where('invite_code', '==', inviteId)
    );

    const snapshot = await getDocs(q);

    // 筛选出 30 分钟内的记录
    const recentRecords = snapshot.docs.filter(doc => {
      const data = doc.data();
      if (!data.timestamp) return false;
      const recordTime = (data.timestamp as any).toMillis?.() || 0;
      return Date.now() - recordTime < 30 * 60 * 1000;
    });

    // 策略 A: 如果当前连 OS 都识别不出，且已有任何记录 -> 放弃
    if (osName === 'unknown' && recentRecords.length > 0) {
      return;
    }

    // 策略 B: 如果当前 OS 识别出来了
    if (osName !== 'unknown') {
      const hasBetterOrSameRecord = recentRecords.some(doc => {
        const data = doc.data();
        
        // 只比较相同 OS 的记录
        if (data.os !== osName) return false;

        // 1. 如果版本号完全一致 -> 拦截 (重复请求)
        if (data.version === simpleVersion) return true;

        // 2. 如果当前版本是 'unknown'，而库里已经是有效版本 -> 拦截 (低质量数据)
        if (simpleVersion === 'unknown' && data.version !== 'unknown') return true;
        

        // 其他情况返回 false (允许写入):
        // - 库里是 'unknown'，当前是 '16.5' (数据升级)
        // - 库里是 '16.5'，当前是 '17.0' (不同设备)
        return false;
      });

      if (hasBetterOrSameRecord) return;
    }

  } catch (error) {
    console.warn("Error checking duplicates:", error);
  }


  // 4. 写入新记录
  try {
    await addDoc(collection(db, 'app_install_data'), {
      ip: ip,
      os: osName,
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