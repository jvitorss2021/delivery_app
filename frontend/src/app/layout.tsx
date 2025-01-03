import "./globals.css";
import { Metadata } from "next";
import { CartProvider } from "./context/CartContext";
import Header from "./components/header/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Fat Flame",
  description: "O melhor lugar para pedir sua comida favorita!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <CartProvider>
          <Header />
          <div className="flex-grow">{children}</div>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
