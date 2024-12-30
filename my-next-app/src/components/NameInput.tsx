"use client";

import * as React from 'react';
import { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { theme } from '../styles/theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const Title = styled.h1`
  font-family: var(--font-racing);
  font-size: 3rem;
  color: ${theme.colors.accent};
  text-align: center;
  margin: 0;
`;

const Input = styled.input`
  font-family: var(--font-racing);
  font-size: 2rem;
  padding: 1rem;
  background: transparent;
  border: none;
  border-bottom: 2px solid ${theme.colors.accent};
  color: ${theme.colors.accent};
  text-align: center;
  width: 80%;
  max-width: 400px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  
  &:focus {
    outline: none;
    border-bottom-width: 3px;
  }

  &::placeholder {
    color: ${theme.colors.accent}40;
  }
`;

interface NameInputProps {
  onSubmit: (name: string) => void;
}

const NameInput: React.FC<NameInputProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = useCallback((e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    const trimmedName = name.toLowerCase().trim();
    if (trimmedName === 'sarwat') {
      onSubmit(name);
    }
  }, [name, onSubmit]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  }, [handleSubmit]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    // Auto-submit if the name matches
    if (e.target.value.toLowerCase().trim() === 'sarwat') {
      setTimeout(() => handleSubmit(), 100);
    }
  }, [handleSubmit]);

  return (
    <Container>
      <Title>WHO IS THIS?</Title>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={name}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          autoFocus
          autoComplete="off"
          spellCheck="false"
        />
      </form>
    </Container>
  );
};

export default NameInput;