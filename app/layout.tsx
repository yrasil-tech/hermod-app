// import { GeistMono } from "geist/font/mono";
// import { GeistSans } from "geist/font/sans";
import { IBM_Plex_Mono } from 'next/font/google';

import type { Metadata } from 'next';
import './globals.css';

const spaceMono = IBM_Plex_Mono({
  subsets: ['latin', 'vietnamese'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-space-mono', // biến CSS custom để dùng trong tailwind
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='vi' className={spaceMono.className}>
      <head></head>
      <body>{children}</body>
    </html>
  );
}
