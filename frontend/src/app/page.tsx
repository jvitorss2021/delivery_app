"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { api } from "../lib/axios";
import ProductCard from "../app/components/cart/ProductCard";
import CartIcon from "../app/components/cart/CartIcon";

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

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      const data = await response.data;
      const mappedData = data.map((product: Product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      }));
      setProducts(mappedData);
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
        <div className="flex justify-around mb-4">
          <button
            className="text-xl font-bold"
            onClick={() => setSelectedCategory("Pizzas")}
          >
            Pizzas
          </button>
          <button
            className="text-xl font-bold"
            onClick={() => setSelectedCategory("Hamburguer")}
          >
            Hamburguer
          </button>
          <button
            className="text-xl font-bold"
            onClick={() => setSelectedCategory("Sushi")}
          >
            Sushi
          </button>
          <button
            className="text-xl font-bold"
            onClick={() => setSelectedCategory("Bebidas")}
          >
            Bebidas
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProducts.length > 0 &&
            filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
        </div>
      </main>
      <CartIcon />
    </div>
  );
};

export default Home;
