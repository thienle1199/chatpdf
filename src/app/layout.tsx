import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "./_trpc/Provider";

export const metadata: Metadata = {
  title: "ChatPDF",
  description: "Chat with your document",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <Provider>
        <html lang="en">
          <body>{children}</body>
        </html>
      </Provider>
    </ClerkProvider>
  );
}
