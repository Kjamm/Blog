import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";


const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

export const metadata: Metadata = {
  title: "Jaemin KIM",
  description: "Tech blog sharing our engineering journey",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Header />
        <main style={{ minHeight: '80vh', paddingTop: '40px' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
