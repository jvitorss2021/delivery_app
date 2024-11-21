import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

const Products: React.FC = () => {
  const products = [
    { id: 1, name: "Pizza", price: "R$ 25,00", image: "pizza.jpg" },
    { id: 2, name: "Hambúrguer", price: "R$ 20,00", image: "burger.jpg" },
    { id: 3, name: "Sushi", price: "R$ 40,00", image: "sushi.jpg" },
  ];

  return (
    <>
      <Header />
      <main className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Produtos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Products;
