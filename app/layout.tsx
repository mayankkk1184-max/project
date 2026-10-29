import './globals.css';
import type { Metadata } from 'next';
import { Inter, Dancing_Script, Playfair_Display } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const dancing = Dancing_Script({ subsets: ['latin'], variable: '--font-script' });
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'A Birthday Letter in Chapters',
  description: 'A romantic interactive birthday experience.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${dancing.variable} ${playfair.variable} font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
