import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./index.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata tipini olib tashladik, faqat oddiy JS obyekti
export const metadata = {
  title: "Akhmad Mentor",
  description: "Ahmadjon Qahramonovich o`quv platformasi",
};

// RootLayout uchun JSX, type annotationlar olib tashlandi
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
