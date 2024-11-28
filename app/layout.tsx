import type { Metadata } from "next";
import { Urbanist } from "next/font/google";

import "./globals.css";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import Navbar from "@/components/main/navbar";
import Header from "@/components/main/header";
import { ThirdwebProvider } from "thirdweb/react";
import { Analytics } from "@vercel/analytics/react";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SKRTEEEEEEDev Landing Page",
  description: "Landing page made by SKRTEEEEEEDev",
};


// El thirdweb provider lo he de usar en el Layout de mas al fondo NO EN ESTE
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-ES" className="dark">
      <body className={urbanist.className}>
      <ThirdwebProvider>
        <Navbar />
        <Header />
        {children}
        <Analytics />
      </ThirdwebProvider>
      </body>
    </html>
  );
}
