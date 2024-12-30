'use client';

import { useRouter } from 'next/navigation';
import styled from 'styled-components';

export default function Home() {
  const router = useRouter();

  const handleEnter = () => {
    router.push('/sarwat'); // Navigate to the dynamic greeting page
  };

  return (
    <Container>
      <EnterButton onClick={handleEnter}>ENTER</EnterButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fef8e8;
`;

const EnterButton = styled.button`
  padding: 20px 40px;
  border: 2px solid #ff0080;
  background: transparent;
  color: #ff0080;
  font-size: 24px;
  font-family: 'Futura', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #ff0080;
    color: #fff;
  }
`;
