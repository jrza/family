"use client";

import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../styles/theme';

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  text-align: center;
  padding: 2rem;
  position: relative;
  z-index: 1;
`;

const Message = styled(motion.h1)`
  font-family: ${theme.fonts.heading};
  font-size: 2.5rem;
  color: ${theme.colors.white};
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  
  @media (min-width: 768px) {
    font-size: 4rem;
  }
`;

const BackgroundTransition = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${theme.colors.accent};
  z-index: -2;
`;

const ImageSlideshow = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const SlideImage = styled(motion.img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FinalScene: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(1);
  const totalImages = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => prev === totalImages ? 1 : prev + 1);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <Message
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ 
          duration: 1.5, 
          ease: [0.4, 0, 0.2, 1]
        }}
      >
        HAPPY BIRTHDAY MAMA!!
      </Message>
      <BackgroundTransition
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ 
          delay: 3, 
          duration: 4,
          ease: [0.4, 0, 0.2, 1]
        }}
      />
      <ImageSlideshow
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          delay: 3, 
          duration: 4,
          ease: [0.4, 0, 0.2, 1]
        }}
      >
        <AnimatePresence mode="wait">
          <SlideImage
            key={currentImage}
            src={`/image/P${currentImage}.jpg`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>
      </ImageSlideshow>
    </Container>
  );
};

export default FinalScene;