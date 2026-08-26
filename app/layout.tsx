import type { Metadata } from "next";
import MediaInteractionGuard from "./components/MediaInteractionGuard";
import "./globals.css";

export const metadata: Metadata = {
  title: "EGLSHIP — доставка товаров из США",
  description:
    "Надёжная доставка покупок из США в Россию, Беларусь, Казахстан, Киргизию и Армению.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="preload" href="/fonts/open-sans-cyrillic.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/open-sans-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/golos-text-cyrillic.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/golos-text-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
        <MediaInteractionGuard />
        {children}
      </body>
    </html>
  );
}
