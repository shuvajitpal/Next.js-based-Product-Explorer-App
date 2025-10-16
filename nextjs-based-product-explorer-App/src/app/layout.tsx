import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { ThemeProvider } from "../context/ThemeContext";

export const metadata: Metadata = {
  title: "Product Explorer",
  description: "This is a product explorer demo app description using DummyJSON API",
};


export default function RootLayout({children,}: {children: React.ReactNode;}) {

  return (
    <html lang="en" className={`data-scroll-behavior="smooth"`}>
      <body className="min-h-screen flex flex-col bg-scroll bg-gradient-to-br
from-[#908974]
via-[#5f5d5d]
to-[#271e35]">
        <ThemeProvider>
          <div className="max-w-7xl mx-auto w-full min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 px-4 sm:px-6 lg:px-8">
            {children}
            </main>
          <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
