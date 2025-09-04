// 決済方法の型定義
export interface PaymentMethod {
    id: string;
    name: string;
    icon: string;
    isSupported: boolean;
    verifiedAt: string;
    category: 'qr' | 'nfc' | 'card' | 'ic' | 'cash';
  }
  
  // 店舗カテゴリの型定義
  export type StoreCategory = 'restaurant' | 'retail' | 'convenience' | 'supermarket' | 'other';
  
  // 信頼度スコアの型定義
  export type TrustScore = 'high' | 'medium' | 'low';
  
  // 店舗情報の型定義
  export interface Store {
    id: string;
    name: string;
    address: string;
    lat: number;
    lng: number;
    category: StoreCategory;
    paymentMethods: PaymentMethod[];
    lastVerified: string;
    trustScore: TrustScore;
    description?: string;
    phoneNumber?: string;
    businessHours?: string;
  }
  
  // 決済方法のカテゴリ別グループ化
  export interface PaymentMethodCategory {
    id: string;
    name: string;
    methods: PaymentMethod[];
  }