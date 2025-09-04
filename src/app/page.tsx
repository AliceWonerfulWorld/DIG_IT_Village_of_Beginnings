'use client';

import { useState } from 'react';
import LoginForm from '@/components/LoginForm';
import Map from '@/components/map/Map';

export default function Home() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<{ email: string; username: string; selectedMethods: string[] } | null>(null);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleRegistrationComplete = (userData: { email: string; username: string; selectedMethods: string[] }) => {
    // 新規登録完了時の処理
    console.log('新規登録完了:', userData);
    setUserData(userData);
    setIsLoggedIn(true); // 地図画面に遷移
  };

  if (!isLoggedIn) {
    return (
      <main>
        <LoginForm 
          currentMode={mode} 
          onModeChange={setMode}
          onLoginSuccess={handleLoginSuccess}
          onRegistrationComplete={handleRegistrationComplete} // この行を追加
        />
      </main>
    );
  }

  return (
    <main className="h-screen">
      <Map />
    </main>
  );
}