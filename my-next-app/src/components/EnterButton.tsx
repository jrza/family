"use client";

import React from 'react';
import styled from '@emotion/styled';
import { theme } from '../styles/theme';

const StyledButton = styled.button`
  font-family: ${theme.fonts.heading};
  font-size: 2rem;
  padding: 1rem 3rem;
  background: transparent;
  border: 2px solid ${theme.colors.accent};
  color: ${theme.colors.accent};
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.2em;
  
  &:hover, &:active {
    background: ${theme.colors.accent};
    color: ${theme.colors.background};
  }
  
  @media (min-width: 768px) {
    font-size: 3rem;
    padding: 1.5rem 4rem;
  }
`;

interface EnterButtonProps {
  onClick: () => void;
}

const EnterButton: React.FC<EnterButtonProps> = ({ onClick }) => (
  <StyledButton onClick={onClick}>
    ENTER
  </StyledButton>
);

export default EnterButton;