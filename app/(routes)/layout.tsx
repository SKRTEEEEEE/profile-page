import type { Metadata } from "next";


import { Providers } from "@/providers";



export const metadata: Metadata = {
  title: "SKRTEEEEEEDev Landing Page",
  description: "Landing page made by SKRTEEEEEEDev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      
        <Providers>
        
        {children}</Providers>
      
    </main>
  );
}