import React, { useState } from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleRegisterSuccess = () => {
    setIsLogin(true);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={handleOutsideClick}
    >
      <div className="bg-white p-8 rounded shadow-lg w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-700"
        >
          X
        </button>
        <h2 className="text-2xl font-bold mb-4">
          {isLogin ? "Login" : "Registrar"}
        </h2>
        {isLogin ? (
          <LoginForm onLoginSuccess={onClose} />
        ) : (
          <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
        )}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="mt-4 text-gray-800 hover:underline"
        >
          {isLogin
            ? "Não tem uma conta? Registre-se"
            : "Já tem uma conta? Faça login"}
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
