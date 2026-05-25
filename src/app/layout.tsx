import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Quicksand } from 'next/font/google';
import '../styles/tailwind.css';

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'QuizLMS — Islamic Learning & Quiz Platform',
  description: 'Platform belajar dan kuis Islami yang menyenangkan untuk guru dan murid — materi, kuis, leaderboard, dan mini game dalam satu tempat.',
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={quicksand.variable}>
      <body className={quicksand.className}>
        {children}
</body>
    </html>
  );
}