import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tic Tac Toe - Test Zero',
  description: 'A fullstack Tic Tac Toe game built with Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900`}>
        <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
          <div className="w-full max-w-4xl">
            <header className="mb-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-2">Tic Tac Toe</h1>
              <p className="text-gray-600 dark:text-gray-300">A fullstack game built with Next.js 14, TypeScript, and SQLite</p>
            </header>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}