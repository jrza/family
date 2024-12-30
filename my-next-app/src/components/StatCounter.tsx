"use client";

import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';
import { calculateMinutes } from '../utils/calculateMinutes';

const StatContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0;
`;

const Label = styled.h2`
  font-family: ${theme.fonts.heading};
  font-size: 1.5rem;
  color: ${theme.colors.accent};
  margin: 0;
  text-align: center;
  
  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const Counter = styled.div`
  font-family: ${theme.fonts.heading};
  font-size: 3rem;
  color: ${theme.colors.text};
  
  @media (min-width: 768px) {
    font-size: 4rem;
  }
`;

interface StatCounterProps {
  startDate: Date;
  label: string;
  delay?: number;
  duration?: number;
  onComplete?: () => void;
}

const StatCounter: React.FC<StatCounterProps> = ({ 
  startDate, 
  label, 
  delay = 0, 
  duration = 3000,
  onComplete 
}) => {
  const [count, setCount] = useState(0);
  const targetCount = calculateMinutes(startDate);

  useEffect(() => {
    const steps = 100;
    const increment = Math.ceil(targetCount / steps);
    let current = 0;
    let timer: NodeJS.Timeout;

    const updateCount = () => {
      timer = setTimeout(() => {
        current += increment;
        if (current >= targetCount) {
          setCount(targetCount);
          if (onComplete) {
            setTimeout(onComplete, 1000);
          }
        } else {
          setCount(current);
          updateCount();
        }
      }, duration / steps);
    };

    updateCount();

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [targetCount, duration, onComplete]);

  return (
    <StatContainer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 1, ease: "easeOut", delay }}
    >
      <Label>{label}</Label>
      <Counter>{count.toLocaleString()} minutes</Counter>
    </StatContainer>
  );
};

export default StatCounter;