"use client"

import { useEffect } from "react";
import "./globals.css";

import QueryProvider from "@/provider/QueryProvider";
import Header from "@/components/common/Header";
import Nav from "@/components/common/Nav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
      import("@/mocks/browser").then(({ worker }) => {
        worker.start();
      });
    }
  }, []);

  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <Header />
          <Nav />
          {children}
          <ToastContainer position="top-center" autoClose={3000} />
        </QueryProvider>
      </body>
    </html>
  );
}
