import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

import SmoothScroller from "../components/layout/SmoothScroller";
import CustomCursor from "../components/layout/CustomCursor";
import Navigation from "../components/layout/Navigation"; // NEW IMPORT

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600"],
  variable: "--font-editorial"
});

const montserrat = Montserrat({ 
  subsets: ["latin"], 
  weight: ["200", "300", "400", "500"],
  variable: "--font-modern"
});

export const metadata: Metadata = {
  title: "Disha Bafna | Luxury Jewellery Designer",
  description: "Every piece begins as a story. Discover the jewellery design portfolio of Disha Bafna.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body className="cursor-none"> 
        <SmoothScroller>
          <CustomCursor />
          <Navigation /> {/* ADDED HERE */}
          <main className="min-h-screen relative z-10">
            {children}
          </main>
        </SmoothScroller>
      </body>
    </html>
  );
}