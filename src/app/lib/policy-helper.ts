// lib/policy-helper.ts
import { db } from '@/app/lib/firebase'; // 假设你已经初始化了 firebase
import { doc, getDoc } from 'firebase/firestore';

// 1. 定义 Firestore 中 policy 文档的结构
export interface PolicyData {
  booking: {
    max: number; // e.g., 26 (tier limit)
    percent: number; // e.g., 3 (可能未使用的其他费率，或者是基础费率)
  };
  cancel: {
    percent: number; // e.g., 20
  };
  prePayDays: number; // e.g., 2
  referral: {
    max: number; 
    months: number;
    percent: number; // e.g., 3.6 (平台费率/总佣金池)
    secondInviterPercent: number; // e.g., 10 (二级分销比例)
  };
}

// 2. 默认值 (当 Firebase 加载失败或还在加载时显示)
export const DEFAULT_POLICY: PolicyData = {
  booking: { max: 26, percent: 3 },
  cancel: { percent: 20 },
  prePayDays: 2,
  referral: { max: 10, months: 18, percent: 3.6, secondInviterPercent: 10 },
};

// 3. 获取数据的函数
export async function fetchPolicyData(): Promise<PolicyData> {
  try {
    const docRef = doc(db, 'appText', 'policy');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as PolicyData;
    } else {
      console.warn("No policy document found, using defaults.");
      return DEFAULT_POLICY;
    }
  } catch (error) {
    console.error("Error fetching policy:", error);
    return DEFAULT_POLICY;
  }
}

// 4. 替换文本中的占位符
export function replacePlaceholders(template: string, data: PolicyData): string {
  // 计算直接推荐人获得的比例 (100% - 10% = 90%)
  const directInviterShare = 100 - data.referral.secondInviterPercent;
  
  return template
    // Booking / Fees
    .replace(/{{platformFee}}/g, `${data.referral.percent}%`)
    .replace(/{{monthlyAllowance}}/g, `$${data.booking.max}`)
    
    // Cancellation
    .replace(/{{cancelPenalty}}/g, `${data.cancel.percent}%`)
    .replace(/{{prePayDays}}/g, `${data.prePayDays}`)
    
    // Referral Logic
    .replace(/{{referralPercent}}/g, `${data.referral.percent}%`)
    .replace(/{{referralMonths}}/g, `${data.referral.months}`)
    .replace(/{{secondInviterPercent}}/g, `${data.referral.secondInviterPercent}%`)
    .replace(/{{directInviterShare}}/g, `${directInviterShare}%`);
}