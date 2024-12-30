"use client";

import * as React from 'react';
import { useState } from 'react';
import styled from '@emotion/styled';
import { theme } from '../styles/theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const Title = styled.h1`
  font-family: ${theme.fonts.heading};
  font-size: 3rem;
  color: ${theme.colors.accent};
  text-align: center;
  margin: 0;
`;

const Input = styled.input`
  font-family: ${theme.fonts.heading};
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.toLowerCase().trim() === 'sarwat') {
      onSubmit(name);
    }
  };

  return (
    <Container>
      <Title>WHO IS THIS?</Title>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
      </form>
    </Container>
  );
};

export default NameInput;