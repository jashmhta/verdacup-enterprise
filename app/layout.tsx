import type { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
});

export const metadata: Metadata = {
  title: {
    default: 'VerdaCup - Premium Biodegradable Cups Manufacturer in India',
    template: '%s | VerdaCup',
  },
  description: 'Leading manufacturer of eco-friendly biodegradable cups in India. Premium paper cups, bagasse cups, and custom printed solutions. Sustainable packaging for a greener tomorrow.',
  keywords: ['biodegradable cups', 'paper cups', 'bagasse cups', 'eco-friendly packaging', 'sustainable cups', 'India', 'manufacturer'],
  authors: [{ name: 'VerdaCup' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://verdacup.com',
    siteName: 'VerdaCup',
    title: 'VerdaCup - Premium Biodegradable Cups Manufacturer in India',
    description: 'Leading manufacturer of eco-friendly biodegradable cups in India. Premium paper cups, bagasse cups, and custom printed solutions.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'VerdaCup - Biodegradable Cups',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VerdaCup - Premium Biodegradable Cups Manufacturer',
    description: 'Leading manufacturer of eco-friendly biodegradable cups in India.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${workSans.variable} font-sans antialiased`}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
