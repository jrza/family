"use client";

import * as React from 'react';
import { useRouter } from 'next/navigation';
import EnterButton from '../components/EnterButton';

const HomePage: React.FC = () => {
  const router = useRouter();

  const handleEnter = () => {
    router.push('/celebration');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <EnterButton onClick={handleEnter} />
    </div>
  );
};

export default HomePage;