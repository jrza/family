"use client";

import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import NameInput from '../../components/NameInput';
import Countdown from '../../components/Countdown';
import StatCounter from '../../components/StatCounter';
import { playAudio } from '../../utils/audioController';
import { theme } from '../../styles/theme';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  position: relative;
  overflow: hidden;
`;

const Content = styled(motion.div)`
  text-align: center;
  z-index: 2;
`;

const Message = styled(motion.h2)`
  font-family: ${theme.fonts.heading};
  font-size: 2rem;
  color: ${theme.colors.accent};
  text-align: center;
`;

const SlideImage = styled(motion.img)`
  width: 50%;
  height: 60%;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 182, 193, 0.2);
  z-index: 2;
  border-radius: 12px;
`;

const FinalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.background};
  z-index: 0;
`;

const textVariants = {
  initial: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.23, 1.2, 0.36, 1]
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    scale: 0.95,
    transition: {
      duration: 0.5,
      ease: [0.23, 1.2, 0.36, 1]
    }
  }
};

export default function CelebrationPage() {
  const [stage, setStage] = useState(0);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [currentImage, setCurrentImage] = useState(1);

  const handleNameSubmit = async () => {
    const audioElement = await playAudio('/audio/birthday.mp3');
    setAudio(audioElement);
    setStage(1);
    setTimeout(() => setStage(2), 5200);
  };

  const handleCountdownComplete = () => {
    setTimeout(() => setStage(3), 1300);
  };

  const handleFirstStatComplete = () => {
    setTimeout(() => setStage(4), 1300);
  };

  const handleSecondStatComplete = () => {
    setTimeout(() => setStage(5), 1300);
  };

  const handleFinallyComplete = () => {
    setTimeout(() => setStage(6), 4000);
  };

  const handleEternityComplete = () => {
    setStage(7);
  };

  // Handle image cycling for final scene
  useEffect(() => {
    if (stage === 7) {
      let count = 0;
      const interval = setInterval(() => {
        count++;
        if (count <= 100) {
          setCurrentImage(prev => prev === 5 ? 1 : prev + 1);
        } else {
          clearInterval(interval);
        }
      }, 400);

      return () => clearInterval(interval);
    }
  }, [stage]);

  // Cleanup audio
  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [audio]);

  useEffect(() => {
    if (stage === 6) {
      const timer = setTimeout(() => {
        setStage(7);
      }, 11000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  return (
    <Container>
      <AnimatePresence mode="wait">
        {stage === 0 && <NameInput onSubmit={handleNameSubmit} />}
        
        {stage === 1 && (
          <Message
            variants={textVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ fontSize: '4rem' }}
          >
            GET READY FOR YOUR STATS
          </Message>
        )}
        
        {stage === 2 && (
          <Countdown 
            onComplete={handleCountdownComplete}
          />
        )}
        
        {stage === 3 && (
          <StatCounter 
            startDate={new Date('1976-12-30')} 
            label="A KIND & DEDICATED PERSON"
            onComplete={handleFirstStatComplete}
            duration={8000}
          />
        )}
        
        {stage === 4 && (
          <StatCounter 
            startDate={new Date('2003-02-21')} 
            label="A CARING & CONSIDERATE WIFE"
            onComplete={handleSecondStatComplete}
            duration={8000}
          />
        )}
        
        {stage === 5 && (
          <Message
            variants={textVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onAnimationComplete={handleFinallyComplete}
            style={{ fontSize: '4rem' }}
          >
            AND FINALLY...
          </Message>
        )}
        
        {stage === 6 && (
          <Message
            variants={textVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            YOU WILL SPEND AN ETERNITY AS THE BEST MOTHER ONE COULD HOPE FOR
          </Message>
        )}
        
        {stage === 7 && (
          <Content>
            <FinalBackground />
            <div style={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100vh',
              position: 'relative',
              zIndex: 2
            }}>
              <div style={{ 
                width: '50%',
                height: '60vh',
                position: 'relative',
                marginBottom: '2rem'
              }}>
                <SlideImage
                  key={currentImage}
                  src={`/image/P${currentImage}.jpg`}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
                  }}
                />
              </div>
              <Message
                style={{ 
                  fontSize: '4rem',
                  color: theme.colors.accent,
                  fontWeight: 'bold',
                  letterSpacing: '2px',
                  position: 'relative',
                  zIndex: 3
                }}
              >
                HAPPY BIRTHDAY MAMA!!
              </Message>
            </div>
          </Content>
        )}
      </AnimatePresence>
    </Container>
  );
}