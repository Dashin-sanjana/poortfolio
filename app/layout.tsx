import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dashin Sanjana — Aspiring iOS Developer",
  description:
    "Software Engineering undergraduate and aspiring iOS Developer building native mobile and full-stack applications.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
