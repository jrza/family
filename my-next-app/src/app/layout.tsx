"use client";

import { Racing_Sans_One, Inter } from 'next/font/google';
import styled from '@emotion/styled';
import { theme } from '../styles/theme';

const racing = Racing_Sans_One({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-racing'
});

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
});

const StyledBody = styled.div`
  background: ${theme.colors.background};
  min-height: 100vh;
  color: ${theme.colors.text};
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${racing.variable} ${inter.variable}`}>
      <body>
        <StyledBody>{children}</StyledBody>
      </body>
    </html>
  );
}