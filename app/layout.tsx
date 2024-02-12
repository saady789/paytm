"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react"
import Provider from "./_trpc/Provider";
const inter = Inter({ subsets: ["latin"] });

 const metadata: Metadata = {
  title: "Paytm",
  description: "send and receive money with ease",
};

export default function RootLayout(
  {
    children,
  }
    :
    Readonly<{
      children: React.ReactNode;
    }>) {
  return (
    
      <SessionProvider >
        <html lang="en">
          <body className={inter.className}> <Provider> {children} </Provider> </body>
        </html>
      </SessionProvider>
   
  );
}
