"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import AuthModal from "./AuthModal";
import UserInfo from "./UserInfo";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <header className="bg-gray-950 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={160}
              height={160}
              style={{ width: "auto", height: "auto" }}
              className="rounded-full cursor-pointer"
            />
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <UserInfo />
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
                    <Link href="/" className="hover:underline">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/cart" className="hover:underline">
                      Carrinho
                    </Link>
                  </li>
                  <li>
                    <Link href="/products" className="hover:underline">
                      Pedidos
                    </Link>
                  </li>
                  {!isLoggedIn && (
                    <li>
                      <button
                        onClick={() => setIsAuthModalOpen(true)}
                        className="hover:underline"
                      >
                        Login
                      </button>
                    </li>
                  )}
                </ul>
              </nav>
            )}
          </div>
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
