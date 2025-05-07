'use client'; // Add this directive

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from '@/context/cart-context';
import { ThemeProvider } from '@/context/theme-context';
import { GlobalLoader } from '@/components/global-loader';
import { useState, useEffect } from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Removed metadata export as it's not allowed in client components.
// export const metadata: Metadata = {
//   title: 'ArtVerse Gallery',
//   description: 'Discover and purchase unique artwork and paintings from talented artists.',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate an initial loading period or wait for critical assets.
    // In a real app, you might set this to false after specific data is fetched
    // or a crucial initialization step is completed.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Adjust delay as needed

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth"> {/* Added scroll-smooth */}
      <head>
        {/* Title and meta description can be added here directly or via a Head component if dynamic changes are needed from client side */}
        <title>ArtVerse Gallery</title>
        <meta name="description" content="Discover and purchase unique artwork and paintings from talented artists." />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        {isLoading && <GlobalLoader />}
        <ThemeProvider
          // attribute="class" // Managed internally by ThemeProvider
          // defaultTheme="system" // Managed internally by ThemeProvider
          // enableSystem // Managed internally by ThemeProvider
          // disableTransitionOnChange // Managed internally by ThemeProvider
        >
          <CartProvider>
            {!isLoading && children} {/* Render children only after initial load */}
            <Toaster />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
