import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/SmoothScroll";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Esa Hair Saloon",
  description: "Experience the best grooming service in town.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${dmSans.variable} font-sans antialiased bg-background text-foreground`}
      >
        <SmoothScroll />
        <AppProvider>
          <div className="flex flex-col min-h-screen w-full bg-background text-foreground">
            <Header />
            <main className="flex-grow w-full">{children}</main>
            <Footer />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
