"use client";

import Image from "next/image";
import { useCart } from "../../context/CartContext";
import { useState, useEffect } from "react";
import Button from "../../components/common/Button"; // Importe o componente de botão

interface ProductProps {
  id: number;
  name: string;
  price: string;
  image: string;
}

const ProductCard: React.FC<ProductProps> = ({ id, name, price, image }) => {
  const { addItemToCart, decrementItemInCart, cartItems } = useCart();
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      setQuantity(item.quantity);
    } else {
      setQuantity(0);
    }
  }, [cartItems, id]);

  const handleAddToCart = () => {
    addItemToCart({ id, name, price, image, quantity: 1 });
  };

  const handleRemoveFromCart = () => {
    if (quantity > 0) {
      decrementItemInCart(id);
    }
  };

  return (
    <div className="border rounded shadow-md p-4 transform transition-transform duration-300 hover:scale-105">
      <div className="relative w-full h-40">
        <Image
          src={`/images/${image}`}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
          className="rounded"
          priority={true}
        />
      </div>
      <h2 className="text-lg font-bold mt-2">{name}</h2>
      <p className="text-gray-600">{price}</p>
      <div className="flex items-center mt-2">
        <Button
          onClick={handleAddToCart}
          className="bg-blue-900 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Adicionar ao Carrinho
        </Button>
        {quantity > 0 && (
          <div className="flex items-center ml-2">
            <Button
              onClick={handleRemoveFromCart}
              className="bg-red-900 text-white py-1 px-2 rounded hover:bg-red-700 transition duration-300 ease-in-out"
            >
              -
            </Button>
            <span className="ml-2 text-gray-700 font-bold">{quantity}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
