"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import AuthModal from "./AuthModal";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-gray-950 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={160}
            height={160}
            style={{ width: "auto", height: "auto" }}
            className="rounded-full"
          />
        </div>
        <div className="relative" ref={menuRef}>
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
                <li>
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="hover:underline"
                  >
                    Login
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
};

export default Header;
