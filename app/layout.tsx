import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NO SWEAT Design Studio",
  description: "Your creative workspace for designing NO SWEAT.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}