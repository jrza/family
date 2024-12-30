"use client";

import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../styles/theme';

const CountdownContainer = styled(motion.div)`
  font-family: ${theme.fonts.heading};
  font-size: 8rem;
  color: ${theme.colors.accent};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  
  @media (min-width: 768px) {
    font-size: 12rem;
  }
`;

interface CountdownProps {
  onComplete: () => void;
}

const countVariants = {
  initial: { 
    opacity: 0, 
    scale: 0.5,
  },
  animate: { 
    opacity: 1, 
    scale: 1,
  },
  exit: { 
    opacity: 0, 
    scale: 1.5,
  }
};

const Countdown: React.FC<CountdownProps> = ({ onComplete }) => {
  const [count, setCount] = useState<number>(3);

  useEffect(() => {
    if (count === 0) {
      onComplete();
      return;
    }

    // Fixed timing for each number
    const timer = setTimeout(() => {
      setCount(prev => prev - 1);
    }, 800); // Total time for each number

    return () => clearTimeout(timer);
  }, [count, onComplete]);

  return (
    <AnimatePresence mode="wait">
      {count > 0 && (
        <CountdownContainer
          key={count}
          variants={countVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            duration: 0.2,
            ease: [0.23, 1.2, 0.36, 1], // More aggressive spring
          }}
        >
          {count}
        </CountdownContainer>
      )}
    </AnimatePresence>
  );
};

export default Countdown;