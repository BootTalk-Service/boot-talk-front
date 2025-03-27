import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/provider/QueryProvider";

export const metadata: Metadata = {
  title: "Boot Talk App",
  description: "Generated by I Can Do It",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
