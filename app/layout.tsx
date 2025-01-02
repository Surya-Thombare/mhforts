import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'Maharashtra Forts | Historical Fortifications',
    template: '%s | Maharashtra Forts'
  },
  description: 'Explore historical forts of Maharashtra. Discover hill forts, sea forts, and ancient fortifications with detailed guides, trek information, and rich history.',
  keywords: ['Maharashtra forts', 'historical forts', 'hill forts', 'sea forts', 'Raigad fort', 'Shivaji Maharaj forts', 'fort trekking', 'Indian fortifications'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mhforts.vercel.app',
    title: 'Maharashtra Forts - Historical Guide & Trek Information',
    description: 'Comprehensive guide to Maharashtra\'s historical forts. Plan your visits, find trek information, and explore the rich heritage.',
    images: [
      {
        url: 'https://shorturl.at/qandq',
        width: 1200,
        height: 630,
        alt: 'Maharashtra Forts'
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
