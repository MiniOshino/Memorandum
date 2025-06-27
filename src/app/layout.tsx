import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Memorandum",
  description: "The last memory",
  icons: {
    icon:[
      {
        media: '(prefers-color-scheme: light)',
        url: '/icon/websiteIcon_Light.png',
        href: '/icon/websiteIcon_Light.png',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/icon/websiteIcon_Dark.png',
        href: '/icon/websiteIcon_Dark.png',
      }
    ],
    },
  };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, orientation=landscape"/>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
