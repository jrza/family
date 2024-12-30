"use client";

import * as React from 'react';
import { useEffect, useState } from 'react';
import Countdown from '../../components/Countdown';
import AnimatedStat from '../../components/AnimatedStat';
import styled from '@emotion/styled';
import { theme } from '../../styles/theme';

interface Stats {
  kind: number;
  wife: number;
}

export default function GreetingPage({ params }: { params: { name: string } }) {
  const { name } = params;
  const [scene, setScene] = useState<number>(0);
  const [stats, setStats] = useState<Stats>({ kind: 0, wife: 0 });

  const START_DATE_KIND = new Date('1976-12-30');
  const START_DATE_WIFE = new Date('2003-02-21');

  const calculateMinutes = (startDate: Date): number => {
    const now = new Date();
    return Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60));
  };

  useEffect(() => {
    setStats({
      kind: calculateMinutes(START_DATE_KIND),
      wife: calculateMinutes(START_DATE_WIFE),
    });

    const audio = new Audio('/audio/Birthday.mp3');
    
    // Wait for audio to be loaded
    audio.addEventListener('canplaythrough', () => {
      audio.play();
      
      // Sync scenes with audio timing
      const sceneTimings = [
        1000,  // Initial countdown
        2000,  // "3"
        3000,  // "2"
        4000,  // "1"
        5000,  // "Get ready for stats"
        7000,  // First stat
        12000, // Second stat
        17000, // "And Finally..."
        19000, // "BEST MOTHER"
        22000  // Final scene with video (timed with loud chant)
      ];

      sceneTimings.forEach((time, index) => {
        setTimeout(() => setScene(index), time);
      });
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return (
    <Container>
      {scene === 0 && <Countdown onComplete={() => setScene(1)} />}
      {scene === 1 && <Message>Get ready for your stats...</Message>}
      {scene === 2 && (
        <Stat>
          <h2>You spent</h2>
          <AnimatedStat endValue={stats.kind} label="minutes as a kind & dedicated person" />
        </Stat>
      )}
      {scene === 3 && (
        <Stat>
          <h2>You spent</h2>
          <AnimatedStat endValue={stats.wife} label="minutes as a caring & considerate wife" />
        </Stat>
      )}
      {scene === 4 && (
        <Message>
          <h1>And finally...</h1>
          <h2>YOU WILL SPEND AN ETERNITY AS THE BEST MOTHER ONE COULD HOPE FOR</h2>
        </Message>
      )}
      {scene === 5 && (
        <FinalScene>
          <h1>Happy Birthday, {name}!</h1>
          <VideoBackground>
            <video autoPlay muted loop>
              <source src="/video/slideshow.mp4" type="video/mp4" />
            </video>
          </VideoBackground>
        </FinalScene>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${theme.colors.background};
  color: ${theme.colors.accent};
  text-align: center;
`;

const Message = styled.div`
  font-size: 24px;
  font-family: 'Futura', sans-serif;
`;

const Stat = styled.div`
  h2 {
    font-size: 28px;
    color: #ff0080;
  }
`;

const FinalScene = styled.div`
  position: relative;
  text-align: center;
  color: white;

  h1 {
    font-size: 36px;
  }
`;

const VideoBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.5;
  }
`; 