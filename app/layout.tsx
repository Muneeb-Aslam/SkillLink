"use client";
import { SessionProvider } from "next-auth/react";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import ReduxProvider from "./provider";
// import { PageLoading } from "./components/PageLoading";

const poppins = Poppins({
   subsets: ["latin"],
   weight: "400",
});
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body className={poppins.className}>
            <ReduxProvider>
               <SessionProvider>
                  <main className="bg-white w-full min-h-screen flex flex-col justify-start items-center">
                     {children}
                     <div id="backdrop-hook" />
                     <div id="overlay" />
                  </main>
                  <Toaster />
               </SessionProvider>
            </ReduxProvider>
         </body>
      </html>
   );
}
