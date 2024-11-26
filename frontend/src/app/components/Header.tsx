"use client";

import { useState } from "react";
import Image from "next/image";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-950 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={170}
            height={170}
            className="rounded-full"
          />
        </div>
        <div className="relative">
          <button className="flex flex-col space-y-1.5" onClick={toggleMenu}>
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
          </button>
          {isMenuOpen && (
            <nav className="absolute right-0 mt-2 w-48 bg-gray-800 rounded shadow-lg z-50">
              <ul className="flex flex-col space-y-2 p-4">
                <li>
                  <a href="/" className="hover:underline">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/products" className="hover:underline">
                    Produtos
                  </a>
                </li>
                <li>
                  <a href="/cart" className="hover:underline">
                    Carrinho
                  </a>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
