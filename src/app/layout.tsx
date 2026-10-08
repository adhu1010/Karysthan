import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://karyasthan.in'),
  title: 'കാര്യസ്ഥൻ (Karyasthan) - കൊച്ചിയുടെ സ്വന്തം ഓൺ-ഡിമാൻഡ് സഹായം | Kochi Home Services',
  description:
    'കൊച്ചിയിലെ വീടുകൾക്കായി വിശ്വസ്തരായ പ്ലംബർ, ഇലക്ട്രീഷ്യൻ, കാർപെന്റർ ചേട്ടന്മാർ 30 മിനിറ്റിൽ വാതിൽപ്പടിയിൽ. On-demand task marketplace in Kochi, Kerala for Plumbing, Electrical, and Carpentry.',
  keywords: [
    'Karyasthan',
    'കാര്യസ്ഥൻ',
    'Kochi plumber',
    'Kochi electrician',
    'Kochi carpentry',
    'Ernakulam home services',
    'Kakkanad handyman',
    'Edappally plumbing',
    'Aluva electrical',
    'Kerala task marketplace',
  ],
  authors: [{ name: 'Karyasthan Technologies Kochi' }],
  openGraph: {
    title: 'കാര്യസ്ഥൻ (Karyasthan) - കൊച്ചിയുടെ സ്വന്തം ഓൺ-ഡിമാൻഡ് സഹായം',
    description:
      'കൊച്ചിയിലെ വീടുകൾക്കായി വിശ്വസ്തരായ പ്ലംബർ, ഇലക്ട്രീഷ്യൻ, കാർപെന്റർ ചേട്ടന്മാർ 30 മിനിറ്റിൽ വാതിൽപ്പടിയിൽ. ചേരൂ വെയ്റ്റ്‌ലിസ്റ്റിൽ!',
    url: 'https://karyasthan.in',
    siteName: 'കാര്യസ്ഥൻ (Karyasthan)',
    locale: 'ml_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'കാര്യസ്ഥൻ (Karyasthan) - Kochi On-demand Task Marketplace',
    description:
      'Verified plumbers, electricians, and carpenters in Kochi, Kerala. 30-minute arrival.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { LanguageProvider } from '@/context/LanguageContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased text-stone-900 bg-[#fcfdfa] selection:bg-emerald-200 selection:text-emerald-950">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
