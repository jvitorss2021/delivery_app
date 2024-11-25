import ProductCard from "../components/ProductCard";

const Products: React.FC = () => {
  const products = [
    { id: 1, name: "Hambúrguer", price: "R$ 20,00", image: "burger.webp" },
    { id: 2, name: "Batata Frita", price: "R$ 12,00", image: "fries.webp" },
    { id: 3, name: "Pizza", price: "R$ 25,00", image: "pizza.webp" },
    { id: 4, name: "Sushi", price: "R$ 40,00", image: "sushi.webp" },
    { id: 5, name: "poke", price: "R$ 35,00", image: "poke.webp" },
    { id: 6, name: "Salada", price: "R$ 12,00", image: "salad.webp" },
    { id: 7, name: "Tapioca", price: "R$ 18,00", image: "tapioca.webp" },
    { id: 8, name: "Suco Natural", price: "R$ 8,00", image: "suco1.webp" },
    { id: 9, name: "Refrigerante lata", price: "R$ 6,00", image: "refri.webp" },
  ];

  return (
    <div className="flex flex-col bg-cover bg-center bg-[url('/images/fundo.jpg')] min-h-screen">
      <main className="container mx-auto py-8 mb-8 bg-opacity-75 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Produtos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Products;
