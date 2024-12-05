"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { api } from "../lib/axios";
import ProductCard from "../app/components/cart/ProductCard";
import CartIcon from "../app/components/cart/CartIcon";
import CartDrawer from "../app/components/cart/CartDrawer";
import { motion } from "framer-motion";
import Button from "../app/components/common/Button";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      const data = await response.data;
      setProducts(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div className="flex flex-col bg-cover bg-center bg-[url('/images/fundo.png')] min-h-screen">
      <div className="relative w-full min-h-screen">
        <Image
          src="/images/fatflame.jpg"
          alt="Logo"
          fill
          style={{ objectFit: "cover" }}
          className="z-0"
        />
      </div>
      <main className="container mx-auto py-8 mb-8 bg-opacity-75 rounded-lg shadow-lg">
        <div className="flex justify-center space-x-8 mb-4">
          {["Pizzas", "Hamburguer", "Sushi", "Bebidas"].map((category) => (
            <Button
              key={category}
              className={`text-xl font-bold relative ${
                selectedCategory === category
                  ? "text-blue-600"
                  : "text-gray-600"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
              {selectedCategory === category && (
                <motion.span
                  layoutId="underline"
                  className="absolute left-0 right-0 bottom-0 h-1 bg-blue-600"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProducts.length > 0 &&
            filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
        </div>
      </main>
      <CartIcon
        onClick={() => setIsCartDrawerOpen(!isCartDrawerOpen)}
        isDrawerOpen={isCartDrawerOpen}
      />
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
      />
    </div>
  );
};

export default Home;
