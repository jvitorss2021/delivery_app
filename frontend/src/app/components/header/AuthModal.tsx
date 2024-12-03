import React, { useState } from "react";
import { motion } from "framer-motion";
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
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-8 rounded-lg shadow-lg w-96 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 transition-colors"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isLogin ? "Login" : "Registrar"}
        </h2>
        {isLogin ? (
          <LoginForm onLoginSuccess={onClose} />
        ) : (
          <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
        )}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="mt-4 text-blue-950 hover:underline transition-colors block text-center"
        >
          {isLogin
            ? "Não tem uma conta? Registre-se"
            : "Já tem uma conta? Faça login"}
        </button>
      </motion.div>
    </div>
  );
};

export default AuthModal;
