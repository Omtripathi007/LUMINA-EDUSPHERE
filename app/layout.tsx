import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Lumina | Premium Learning Dashboard',
  description: 'A premium, interactive student learning dashboard for mastering engineering concepts.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full`}
      style={{ colorScheme: 'dark' }}
    >
      <body className="min-h-screen bg-bg-dark text-text-primary antialiased font-sans relative overflow-x-hidden">
        {/* Global Physical Film Grain overlay */}
        <div className="grain-overlay" />
        
        {/* Subtle grid mesh overlay behind layout content */}
        <div className="grid-bg" />

        {/* Children can be dashboard group (with sidebar) or landing group (without sidebar) */}
        {children}
      </body>
    </html>
  );
}
