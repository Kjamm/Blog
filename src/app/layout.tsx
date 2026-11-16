import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import HomeGrain from "@/components/HomeGrain";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  // The optical-size axis is what gives the large headings their ink-trapped display cut.
  axes: ["opsz"],
  variable: "--font-bricolage",
  display: "swap",
});

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
    <html lang="en" className={display.variable}>
      <head>
        {/* Entrance animations start hidden; without JavaScript, show everything. */}
        <noscript>
          <style>{`[data-reveal], [style*="visibility: hidden"], [style*="visibility:hidden"] { opacity: 1 !important; visibility: visible !important; }`}</style>
        </noscript>
      </head>
      <body>
        <SmoothScroll />
        <Header />
        <main className="site-main">
          {children}
        </main>
        <Footer />
        <HomeGrain />
      </body>
    </html>
  );
}
