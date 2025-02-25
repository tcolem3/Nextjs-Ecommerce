import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@/assets/styles/globals.css';
import { APP_DESCRIPTION, APP_Name, SERVER_URL } from "@/lib/constants";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: {
    template: `%s | Prostore`,
    default: APP_Name,
  },
  description: "APP_DESCRIPTION",
  metadataBase: new URL(SERVER_URL)
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <header>Header</header>
        {children}
        <footer>Footer</footer>
      </body>
    </html>
  );
}
