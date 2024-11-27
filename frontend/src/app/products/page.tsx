"use client";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import ProductCard from "../components/ProductCard";
import CartIcon from "../components/CartIcon";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      // const response = await fetch("http://localhost:5000/api/products");
      const data = await response.data;
      const mappedData = data.map((product: Product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      }));
      setProducts(mappedData);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col bg-cover bg-center bg-[url('/images/fundo.png')] min-h-screen">
      <main className="container mx-auto py-8 mb-8 bg-opacity-75 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Produtos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.length > 0 &&
            products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
        </div>
      </main>
      <CartIcon />
    </div>
  );
};

export default Products;
