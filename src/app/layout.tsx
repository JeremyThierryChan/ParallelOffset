import { Bebas_Neue, Space_Mono, Inter } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const space = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      className={`${bebas.variable} ${space.variable} ${inter.variable}`}
    >
      <body className="min-h-screen bg-white text-[#1A1A1A]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
