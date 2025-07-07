import React from "react";
import NavBar from "./NavBar";
import { Manrope, Roboto_Slab } from "next/font/google";
import Footer from "./footer";
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div
      className={`${manrope.className} ${robotoSlab.className}  font-[family-name:var(--font-geist-sans)] min-h-screen bg-muted`}
    >
      <NavBar />
      <main className="px-4">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
