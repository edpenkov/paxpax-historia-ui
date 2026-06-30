import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { DevThemeToggle } from "@/components/dev/DevThemeToggle";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PaxPax Historia UI",
  description: "Standalone UI reference for Pax Historia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${poppins.variable} h-full`}>
      <body className="min-h-full font-sans antialiased">
        <ThemeProvider>
          {children}
          <DevThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
