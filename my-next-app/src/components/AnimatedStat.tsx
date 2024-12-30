"use client";

import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';

interface AnimatedStatProps {
  endValue: number;
  label: string;
}

const StatContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Value = styled(motion.span)`
  font-family: ${theme.fonts.heading};
  font-size: 3.5rem;
  color: ${theme.colors.accent};
  
  @media (min-width: 768px) {
    font-size: 4.5rem;
  }
`;

const Label = styled(motion.span)`
  font-family: ${theme.fonts.heading};
  font-size: 1.5rem;
  color: ${theme.colors.accent};
  text-align: center;
  
  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const AnimatedStat: React.FC<AnimatedStatProps> = ({ endValue, label }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 3000; // 3 seconds
    const steps = 100;
    const increment = Math.ceil(endValue / steps);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= endValue) {
        setCount(endValue);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [endValue]);

  return (
    <StatContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
    >
      <Value>{count.toLocaleString()}</Value>
      <Label>{label}</Label>
    </StatContainer>
  );
};

export default AnimatedStat; 