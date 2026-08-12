import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { SearchOverlay } from '@/components/navigation/SearchOverlay';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { ToastContainer } from '@/components/ui/ToastContainer';
import { GrainOverlay } from '@/components/ui/GrainOverlay';
import { Providers } from '@/app/providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    default: 'OUTSIX — Outside The Ordinary',
    template: '%s | OUTSIX',
  },
  description:
    'OUTSIX is a Gen-Z streetwear brand built for those who refuse to blend in. Shop oversized graphic tees, hoodies, cargo pants, and accessories.',
  keywords: ['streetwear', 'outsix', 'graphic tees', 'hoodies', 'Gen-Z fashion', 'Indian streetwear'],
  authors: [{ name: 'OUTSIX' }],
  creator: 'OUTSIX',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://outsix.in',
    siteName: 'OUTSIX',
    title: 'OUTSIX — Outside The Ordinary',
    description: 'Gen-Z streetwear. Built for the outside.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'OUTSIX — Outside The Ordinary',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OUTSIX — Outside The Ordinary',
    description: 'Gen-Z streetwear. Built for the outside.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#070707',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@500;600;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <GrainOverlay />
          <CustomCursor />
          <Header />
          <MobileMenu />
          <SearchOverlay />
          <CartDrawer />
          <main>{children}</main>
          <Footer />
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
