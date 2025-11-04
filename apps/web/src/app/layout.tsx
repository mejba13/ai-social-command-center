import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { cn } from '@/lib/utils';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AI Social Command Center',
  description: 'Unified AI-powered social media management platform',
  keywords: ['social media', 'AI', 'automation', 'analytics', 'content creation'],
  authors: [{ name: 'AI Social Command Center' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="smooth-scroll" suppressHydrationWarning>
      <body className={cn(inter.variable, 'font-sans antialiased')}>
        {children}
      </body>
    </html>
  );
}
