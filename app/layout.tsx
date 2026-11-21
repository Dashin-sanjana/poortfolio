import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dashin Sanjana | iOS Developer & Software Engineer",
  description: "Swift, SwiftUI and SwiftData focused developer portfolio. Explore mobile apps, full-stack work, technical training and software engineering experience.",
  keywords: ["Dashin Sanjana", "iOS Developer", "SwiftUI", "Swift", "SwiftData", "Mobile Developer", "Software Engineer", "Sri Lanka"],
  openGraph: { title: "Dashin Sanjana — iOS Developer", description: "Building thoughtful mobile experiences. Swift / SwiftUI / SwiftData.", type: "website" },
};
export const viewport: Viewport = { themeColor: "#080a10", width: "device-width", initialScale: 1 };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
