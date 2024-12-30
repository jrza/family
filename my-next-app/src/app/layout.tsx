import '../styles/globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Happy Birthday',
  description: 'A birthday greeting website',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
