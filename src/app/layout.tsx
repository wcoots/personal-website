'use client';
import { Fjord_One } from 'next/font/google';
import './globals.css';
import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';

const fjordOne = Fjord_One({ weight: '400', subsets: ['latin'], display: 'swap', adjustFontFallback: false });

const Dynamic = ({ children }: { children: React.ReactNode }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={fjordOne.className} style={{ margin: 0 }}>
        <Dynamic>{children}</Dynamic>
        <Analytics />
      </body>
    </html>
  );
}
