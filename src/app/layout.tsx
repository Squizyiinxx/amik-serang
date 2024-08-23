import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Provider } from "@/components";
import { SpeedInsights } from '@vercel/speed-insights/next';

const font = Open_Sans({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Akademi Manajemen Informatika dan Komputer", 
  description: "Webite Akademi Manajemen Informatika dan Komputer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="32x32" />
        <link rel="preconnect" href="https://www.google.com"/>
        <link rel="preload" href="/jumbotron.webp" as="image" type="image/webp" />
      </head>
      <body className={font.className}>
        <Provider>
        {children}
        <Toaster/>
          <SpeedInsights />
        </Provider>
        </body>
    </html>
  );
}
