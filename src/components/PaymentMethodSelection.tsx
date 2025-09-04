'use client';

import { useState } from 'react';
import { ArrowLeft, Check, CreditCard, Smartphone, Wallet, Train } from 'lucide-react';

interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: 'qr' | 'nfc' | 'card' | 'ic' | 'cash';
  color: string;
}

const PAYMENT_METHODS: PaymentMethod[] = [
  // QRコード決済
  {
    id: 'paypay',
    name: 'PayPay',
    icon: '��',
    description: 'QRコード決済',
    category: 'qr',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'rakuten-pay',
    name: '楽天ペイ',
    icon: '��',
    description: 'QRコード決済',
    category: 'qr',
    color: 'from-red-500 to-red-600'
  },
  // NFC決済
  {
    id: 'google-pay',
    name: 'Google Pay',
    icon: '��',
    description: 'NFC決済',
    category: 'nfc',
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'apple-pay',
    name: 'Apple Pay',
    icon: '��',
    description: 'NFC決済',
    category: 'nfc',
    color: 'from-gray-800 to-gray-900'
  },
  // カード決済
  {
    id: 'credit-card',
    name: 'クレジットカード',
    icon: '��',
    description: '磁気・ICチップ',
    category: 'card',
    color: 'from-purple-500 to-purple-600'
  },
  // 交通系IC
  {
    id: 'nimoca',
    name: 'nimoca',
    icon: '��',
    description: '交通系IC',
    category: 'ic',
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 'suica',
    name: 'Suica',
    icon: '��',
    description: '交通系IC',
    category: 'ic',
    color: 'from-red-600 to-red-700'
  },
  {
    id: 'pasmo',
    name: 'PASMO',
    icon: '��',
    description: '交通系IC',
    category: 'ic',
    color: 'from-blue-600 to-blue-700'
  },
  // 現金
  {
    id: 'cash',
    name: '現金',
    icon: '��',
    description: '現金決済',
    category: 'cash',
    color: 'from-green-600 to-green-700'
  }
];

const CATEGORIES = {
  qr: { name: 'QRコード決済', icon: Smartphone, color: 'bg-blue-100 text-blue-800' },
  nfc: { name: 'NFC決済', icon: Smartphone, color: 'bg-green-100 text-green-800' },
  card: { name: 'カード決済', icon: CreditCard, color: 'bg-purple-100 text-purple-800' },
  ic: { name: '交通系IC', icon: Train, color: 'bg-orange-100 text-orange-800' },
  cash: { name: '現金', icon: Wallet, color: 'bg-green-100 text-green-800' }
};

interface PaymentMethodSelectionProps {
  onBack: () => void;
  onComplete: (userData: { email: string; username: string; selectedMethods: string[]}) => void;
  onRegistrationComplete: (userData: { email: string; username: string; selectedMethods: string[]}) => void;
}

export default function PaymentMethodSelection({ onBack, onRegistrationComplete }: PaymentMethodSelectionProps) {
  const [selectedMethods, setSelectedMethods] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = async () => {
    if (selectedMethods.length === 0) {
      alert('少なくとも1つの決済方法を選択してください');
      return;
    }

    setIsLoading(true);

    setTimeout (() => {
      setIsLoading(false);
      onRegistrationComplete({ email: '', username: '', selectedMethods });
    }, 1000);
  };


  const toggleMethod = (methodId: string) => {
    setSelectedMethods(prev => 
      prev.includes(methodId)
        ? prev.filter(id => id !== methodId)
        : [...prev, methodId]
    );
  };

  const groupedMethods = PAYMENT_METHODS.reduce((acc, method) => {
    if (!acc[method.category]) {
      acc[method.category] = [];
    }
    acc[method.category].push(method);
    return acc;
  }, {} as Record<string, PaymentMethod[]>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8">
        {/* ヘッダー */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div className="ml-4">
            <h1 className="text-3xl font-bold text-gray-900">
              よく使う決済方法を選択
            </h1>
            <p className="text-gray-600">
              複数選択できます • 後から変更可能
            </p>
          </div>
        </div>

        {/* カテゴリ別の決済方法 */}
        <div className="space-y-8 mb-8">
          {Object.entries(groupedMethods).map(([category, methods]) => {
            const categoryInfo = CATEGORIES[category as keyof typeof CATEGORIES];
            const IconComponent = categoryInfo.icon;
            
            return (
              <div key={category} className="space-y-4">
                {/* カテゴリヘッダー */}
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${categoryInfo.color}`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {categoryInfo.name}
                  </h2>
                </div>
                
                {/* 決済方法グリッド */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {methods.map((method) => (
                    <div
                      key={method.id}
                      onClick={() => toggleMethod(method.id)}
                      className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all transform hover:scale-105 ${
                        selectedMethods.includes(method.id)
                          ? 'border-blue-500 bg-blue-50 shadow-lg'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }`}
                    >
                      {/* 選択チェックマーク */}
                      {selectedMethods.includes(method.id) && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      )}
                      
                      {/* 決済方法アイコン */}
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${method.color} flex items-center justify-center text-white text-2xl mb-3`}>
                        {method.icon}
                      </div>
                      
                      {/* 決済方法名 */}
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {method.name}
                      </h3>
                      
                      {/* 説明 */}
                      <p className="text-sm text-gray-600">
                        {method.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* 選択状況表示 */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                選択状況
              </h3>
              <p className="text-sm text-gray-600">
                {selectedMethods.length}個の決済方法を選択中
              </p>
            </div>
            <div className="text-3xl font-bold text-blue-600">
              {selectedMethods.length}
            </div>
          </div>
          
          {selectedMethods.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedMethods.map(methodId => {
                const method = PAYMENT_METHODS.find(m => m.id === methodId);
                return (
                  <span
                    key={methodId}
                    className="px-3 py-2 bg-white border border-blue-200 text-blue-800 text-sm rounded-full font-medium shadow-sm"
                  >
                    {method?.name}
                  </span>
                );
              })}
            </div>
          )}
        </div>

        {/* 完了ボタン */}
        <button
          onClick={handleComplete}
          disabled={selectedMethods.length === 0 || isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
              登録中...
            </div>
          ) : (
            `登録完了 (${selectedMethods.length}個選択)`
          )}
        </button>
      </div>
    </div>
  );
}