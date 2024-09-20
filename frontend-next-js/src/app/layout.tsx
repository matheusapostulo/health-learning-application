import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";

const lato = Lato({ weight: ['100', '300', '400', '700', '900'], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Health Learning",
  description: "Generated by create next app",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
return (
    <html lang="pt-br">
      <body className={lato.className}>
        <main className="h-screen">
          <Header/>
          {children}
        </main>
      </body>
    </html>
  );
}
