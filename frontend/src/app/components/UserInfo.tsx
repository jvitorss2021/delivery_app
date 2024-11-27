import { useEffect, useState, useRef } from "react";
import { useCart } from "../context/CartContext";

const UserInfo: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { clearCart } = useCart(); // Obtenha a função clearCart do contexto do carrinho

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    clearCart(); // Limpar o carrinho ao deslogar
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
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="text-white"
      >
        Bem-vindo, {username}!
      </button>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded shadow-lg z-50">
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
        </div>
      )}
    </div>
  );
};

export default UserInfo;
