"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react"
import Provider from "./_trpc/Provider";
const inter = Inter({ subsets: ["latin"] });
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './redux/store';


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


    <ReduxProvider store={store}>
      <SessionProvider >
        <html lang="en">
          <body className={inter.className}> <Provider>   <ToastContainer /> {children} </Provider> </body>
        </html>
      </SessionProvider>
    </ReduxProvider>


  );
}
