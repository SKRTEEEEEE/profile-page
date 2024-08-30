import { SiteHeader } from "@/components/site-header";
import { CThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/config/site";
import type { Metadata, Viewport } from "next";
import { ThirdwebProvider } from "thirdweb/react";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL??siteConfig.url)
};
export const viewport: Viewport = {
  themeColor: [
    {media: "(prefers-color-scheme: light", color: "white"},
    {media: "(prefers-color-scheme: dark", color: "black"}
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-dvh flex-col bg-background">
      <CThemeProvider disableTransitionOnChange defaultTheme="dark-soft">
        <ThirdwebProvider>
          <SiteHeader/>
          {children}
          </ThirdwebProvider></CThemeProvider>
          </div>
  );
}