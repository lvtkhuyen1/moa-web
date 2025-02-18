"use client";

// import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeaderCard from "@/components/HeaderCard";
import { MovieProvider } from "@/hooks/useMoviesContext";
import TabCategory from "@/components/TabCategory";

const notoSansKR = Noto_Sans_KR({
  weight: ["100", "100", "300", "400", "500", "700", "900"],
  subsets: ["latin-ext"],
  variable: "--font-noto-sans-kr",
});

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSansKR.variable} noto-sans-kr-font`}>
        <MovieProvider>
          <div className="bg-black min-h-screen text-white p-2 md:p-5">
            <Header />
            <TabCategory />
            <HeaderCard />
            {children}
            <Footer />
          </div>
        </MovieProvider>
      </body>
    </html>
  );
}
