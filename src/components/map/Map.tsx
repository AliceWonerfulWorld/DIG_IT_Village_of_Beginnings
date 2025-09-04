'use client';

import { useCallback, useRef, useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Store } from '@/types/store';
import { SAMPLE_STORES } from '@/data/sampleStores';
import StoreDetailModal from './StoreDetailModal';

// 北九州市の中心座標（小倉駅周辺）
const CENTER = {
  lat: 33.8867,
  lng: 130.8828
};

const MAP_OPTIONS = {
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: true,
  styles: [
    {
      featureType: 'poi.business',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }]
    }
  ]
};

interface MapProps {
  children?: React.ReactNode;
  userData?: { email: string; username: string; selectedMethods: string[] } | null;
}

export default function Map({ children, userData }: MapProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
  });

  const mapRef = useRef<google.maps.Map | undefined>(undefined); // 初期値をundefinedに設定
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  // サンプルデータの読み込み
  useEffect(() => {
    setStores(SAMPLE_STORES);
  }, []);
 
  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = undefined;
  }, []);

  const handleMarkerClick = (store: Store) => {
    setSelectedStore(store);
  };

  if (loadError) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
        <div className="text-center">
          <div className="text-red-500 text-lg font-semibold mb-2">
            地図の読み込みに失敗しました
          </div>
          <div className="text-gray-600">
            APIキーの設定を確認してください
          </div>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <div className="text-gray-600">地図を読み込み中...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <GoogleMap
        mapContainerClassName="w-full h-full rounded-lg"
        center={CENTER}
        zoom={15}
        options={MAP_OPTIONS}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
       
       {/* 店舗ピンの表示 */}
       {stores.map((store) => (
          <Marker
            key={store.id}
            position={{ lat: store.lat, lng: store.lng }}
            title={store.name}
            onClick={() => handleMarkerClick(store)}
            icon={{
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="16" fill="#3B82F6" opacity="0.8"/>
                  <circle cx="16" cy="16" r="8" fill="white"/>
                  <text x="16" y="20" text-anchor="middle" font-size="12" fill="#3B82F6" font-weight="bold">店</text>
                </svg>
              `),
              scaledSize: new google.maps.Size(32, 32)
            }}
          />
        ))}
      </GoogleMap>

      {/* 店舗情報の表示（デバッグ用） */}
      {selectedStore && (
        <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg max-w-sm">
          <h3 className="font-semibold text-lg mb-2">{selectedStore.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{selectedStore.address}</p>
          <p className="text-sm text-gray-600 mb-2">カテゴリ: {selectedStore.category}</p>
          <p className="text-sm text-gray-600 mb-2">信頼度: {selectedStore.trustScore}</p>
          <div className="text-sm">
            <p className="font-medium mb-1">対応決済方法:</p>
            <div className="flex flex-wrap gap-1">
              {selectedStore.paymentMethods
                .filter(pm => pm.isSupported)
                .map(pm => (
                  <span key={pm.id} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    {pm.name}
                  </span>
                ))}
            </div>
          </div>
          <button
            onClick={() => setSelectedStore(null)}
            className="mt-3 px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300"
          >
            閉じる
          </button>
        </div>
      )}

      {/* 店舗数の表示（デバッグ用） */}
      <div className="absolute top-4 left-4 bg-white px-3 py-2 rounded-lg shadow-lg">
        <span className="text-sm font-medium text-gray-700">
          店舗数: {stores.length}件
        </span>
      </div>

       {/* 店舗詳細モーダル */}
       <StoreDetailModal 
        store={selectedStore} 
        onClose={() => setSelectedStore(null)} 
      />
    </div>
  );
}