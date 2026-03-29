import type { Metadata } from 'next';
import Providers from './providers';
import AppLayout from '@/components/layout/AppLayout';

export const metadata: Metadata = {
  title: 'My Next.js App',
  description: 'Next.js app with light/dark mode toggle and MUI integration',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AppLayout>{children}</AppLayout>
        </Providers>
      </body>
    </html>
  );
}
