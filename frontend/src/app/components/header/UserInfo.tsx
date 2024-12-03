import { useEffect, useState, useRef } from "react";
import { useCart } from "../../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const UserInfo: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { clearCart } = useCart();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    clearCart();
    setUsername(null);
    setIsDropdownOpen(false);
    window.location.reload();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!username) {
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="text-white font-semibold bg-blue-600 px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Bem-vindo, {username}!
      </motion.button>
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute right-0 mt-2 w-48 bg-gray-800 rounded shadow-lg z-50"
          >
            <ul className="flex flex-col space-y-2 p-4">
              <li>
                <button
                  onClick={handleLogout}
                  className="hover:underline text-white"
                >
                  Deslogar
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserInfo;
