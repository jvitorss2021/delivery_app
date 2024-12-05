import React from "react";
import { useCart } from "../../context/CartContext";
import { useRouter } from "next/navigation";
import { api } from "../../../lib/axios"; // Use o Axios configurado

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset" | "finalize";
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  className,
  children,
  type = "button",
}) => {
  const { cartItems, paymentMethod, clearCart } = useCart();
  const router = useRouter();

  const handleFinalizeOrder = async () => {
    if (cartItems.length === 0) {
      alert(
        "O carrinho está vazio. Adicione itens ao carrinho antes de finalizar a compra."
      );
      return;
    }

    if (!paymentMethod) {
      alert("Por favor, selecione uma forma de pagamento.");
      return;
    }

    const estimatedDeliveryTime = new Date();
    estimatedDeliveryTime.setMinutes(estimatedDeliveryTime.getMinutes() + 45);

    try {
      const token = localStorage.getItem("token");
      const response = await api.post(
        "/orders",
        {
          items: cartItems,
          total: cartItems.reduce(
            (acc, item) =>
              acc +
              parseFloat(item.price.replace("R$", "").replace(",", ".")) *
                item.quantity,
            0
          ),
          paymentMethod,
          deliveryTime: estimatedDeliveryTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Pedido criado com sucesso:", response.data);
      clearCart();
      router.push("/orders");
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
    }
  };

  const handleClick = () => {
    if (type === "finalize") {
      handleFinalizeOrder();
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <button onClick={handleClick} className={`py-2 px-4 rounded ${className}`}>
      {children}
    </button>
  );
};

export default Button;
