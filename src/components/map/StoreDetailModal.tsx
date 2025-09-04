'use client';

import { X, MapPin, Clock, Phone, Star } from 'lucide-react';
import { Store, PaymentMethod } from '@/types/store';

interface StoreDetailModalProps {
  store: Store | null;
  onClose: () => void;
}

export default function StoreDetailModal({ store, onClose }: StoreDetailModalProps) {
  if (!store) return null;

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      restaurant: '飲食店',
      retail: '小売店',
      convenience: 'コンビニ',
      supermarket: 'スーパー',
      other: 'その他'
    };
    return labels[category] || category;
  };

  const getTrustScoreColor = (score: string) => {
    const colors: Record<string, string> = {
      high: 'text-green-600 bg-green-100',
      medium: 'text-yellow-600 bg-yellow-100',
      low: 'text-red-600 bg-red-100'
    };
    return colors[score] || 'text-gray-600 bg-gray-100';
  };

  const getTrustScoreLabel = (score: string) => {
    const labels: Record<string, string> = {
      high: '高',
      medium: '中',
      low: '低'
    };
    return labels[score] || score;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* ヘッダー */}
        <div className="relative p-6 border-b border-gray-100">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
          
          <div className="flex items-start space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">
              {store.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-1">{store.name}</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{store.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 店舗情報 */}
        <div className="p-6 space-y-4">
          {/* カテゴリと信頼度 */}
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
              {getCategoryLabel(store.category)}
            </span>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getTrustScoreColor(store.trustScore)}`}>
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3" />
                <span>信頼度: {getTrustScoreLabel(store.trustScore)}</span>
              </div>
            </div>
          </div>

          {/* 営業時間 */}
          {store.businessHours && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>{store.businessHours}</span>
            </div>
          )}

          {/* 電話番号 */}
          {store.phoneNumber && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Phone className="h-4 w-4" />
              <span>{store.phoneNumber}</span>
            </div>
          )}

          {/* 最終更新日 */}
          <div className="text-xs text-gray-500">
            最終更新: {new Date(store.lastVerified).toLocaleDateString('ja-JP')}
          </div>
        </div>

        {/* 決済方法 */}
        <div className="px-6 pb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">対応決済方法</h3>
          
          {/* 対応している決済方法 */}
          <div className="space-y-3">
            {store.paymentMethods
              .filter(pm => pm.isSupported)
              .map(pm => (
                <div key={pm.id} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                    {pm.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-green-800">{pm.name}</div>
                    <div className="text-xs text-green-600">
                      対応確認済み
                    </div>
                  </div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              ))}
          </div>

          {/* 対応していない決済方法 */}
          {store.paymentMethods.some(pm => !pm.isSupported) && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">非対応の決済方法</h4>
              <div className="space-y-2">
                {store.paymentMethods
                  .filter(pm => !pm.isSupported)
                  .map(pm => (
                    <div key={pm.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                      <div className="w-6 h-6 bg-gray-300 rounded-lg flex items-center justify-center text-gray-500 text-xs">
                        {pm.icon}
                      </div>
                      <span className="text-sm text-gray-500">{pm.name}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* アクションボタン */}
        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition-colors"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}