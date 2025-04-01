"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { store } from "./store";
import { Provider } from "react-redux";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <Provider store={store}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <SidebarProvider>
            <div className="flex w-full h-full">
              <AppSidebar />
              <SidebarTrigger />
              <div className="flex-grow">{children}</div>
            </div>
          </SidebarProvider>
        </body>
      </Provider>
    </html>
  );
}
