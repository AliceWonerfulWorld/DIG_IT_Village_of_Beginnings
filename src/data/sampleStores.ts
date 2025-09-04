import { Store, PaymentMethod } from '@/types/store';

// 決済方法のマスターデータ
export const PAYMENT_METHODS_MASTER: PaymentMethod[] = [
  // QRコード決済
  {
    id: 'paypay',
    name: 'PayPay',
    icon: '��',
    isSupported: false,
    verifiedAt: '',
    category: 'qr'
  },
  {
    id: 'rakuten-pay',
    name: '楽天ペイ',
    icon: '��',
    isSupported: false,
    verifiedAt: '',
    category: 'qr'
  },
  // NFC決済
  {
    id: 'google-pay',
    name: 'Google Pay',
    icon: '��',
    isSupported: false,
    verifiedAt: '',
    category: 'nfc'
  },
  {
    id: 'apple-pay',
    name: 'Apple Pay',
    icon: '��',
    isSupported: false,
    verifiedAt: '',
    category: 'nfc'
  },
  // カード決済
  {
    id: 'credit-card',
    name: 'クレジットカード',
    icon: '��',
    isSupported: false,
    verifiedAt: '',
    category: 'card'
  },
  // 交通系IC
  {
    id: 'nimoca',
    name: 'nimoca',
    icon: '��',
    isSupported: false,
    verifiedAt: '',
    category: 'ic'
  },
  {
    id: 'suica',
    name: 'Suica',
    icon: '��',
    isSupported: false,
    verifiedAt: '',
    category: 'ic'
  },
  {
    id: 'pasmo',
    name: 'PASMO',
    icon: '��',
    isSupported: false,
    verifiedAt: '',
    category: 'ic'
  },
  // 現金
  {
    id: 'cash',
    name: '現金',
    icon: '��',
    isSupported: false,
    verifiedAt: '',
    category: 'cash'
  }
];

// サンプル店舗データ（北九州市小倉駅周辺）
export const SAMPLE_STORES: Store[] = [
  {
    id: '1',
    name: 'セブン-イレブン 小倉駅前店',
    address: '北九州市小倉北区浅野1-1-1',
    lat: 33.8867,
    lng: 130.8828,
    category: 'convenience',
    paymentMethods: [
      { ...PAYMENT_METHODS_MASTER[0], isSupported: true, verifiedAt: '2024-01-15' }, // PayPay
      { ...PAYMENT_METHODS_MASTER[4], isSupported: true, verifiedAt: '2024-01-15' }, // クレジットカード
      { ...PAYMENT_METHODS_MASTER[5], isSupported: true, verifiedAt: '2024-01-15' }, // nimoca
      { ...PAYMENT_METHODS_MASTER[8], isSupported: true, verifiedAt: '2024-01-15' }  // 現金
    ],
    lastVerified: '2024-01-15',
    trustScore: 'high',
    description: '小倉駅前のコンビニエンスストア',
    businessHours: '24時間営業'
  },
  {
    id: '2',
    name: 'マクドナルド 小倉駅前店',
    address: '北九州市小倉北区浅野1-1-2',
    lat: 33.8870,
    lng: 130.8830,
    category: 'restaurant',
    paymentMethods: [
      { ...PAYMENT_METHODS_MASTER[0], isSupported: true, verifiedAt: '2024-01-10' }, // PayPay
      { ...PAYMENT_METHODS_MASTER[1], isSupported: true, verifiedAt: '2024-01-10' }, // 楽天ペイ
      { ...PAYMENT_METHODS_MASTER[4], isSupported: true, verifiedAt: '2024-01-10' }, // クレジットカード
      { ...PAYMENT_METHODS_MASTER[8], isSupported: true, verifiedAt: '2024-01-10' }  // 現金
    ],
    lastVerified: '2024-01-10',
    trustScore: 'high',
    description: '小倉駅前のファストフード店',
    businessHours: '6:00-24:00'
  },
  {
    id: '3',
    name: 'ローソン 小倉駅北口店',
    address: '北九州市小倉北区浅野1-1-3',
    lat: 33.8865,
    lng: 130.8825,
    category: 'convenience',
    paymentMethods: [
      { ...PAYMENT_METHODS_MASTER[0], isSupported: true, verifiedAt: '2024-01-12' }, // PayPay
      { ...PAYMENT_METHODS_MASTER[4], isSupported: true, verifiedAt: '2024-01-12' }, // クレジットカード
      { ...PAYMENT_METHODS_MASTER[8], isSupported: true, verifiedAt: '2024-01-12' }  // 現金
    ],
    lastVerified: '2024-01-12',
    trustScore: 'medium',
    description: '小倉駅北口のコンビニエンスストア',
    businessHours: '24時間営業'
  }
];

// 店舗カテゴリの表示名
export const STORE_CATEGORY_LABELS: Record<string, string> = {
  restaurant: '飲食店',
  retail: '小売店',
  convenience: 'コンビニ',
  supermarket: 'スーパー',
  other: 'その他'
};

// 信頼度スコアの表示名
export const TRUST_SCORE_LABELS: Record<string, string> = {
  high: '高',
  medium: '中',
  low: '低'
};