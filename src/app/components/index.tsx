import Header from "../components/Header";
import Footer from "../components/Footer";

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center">
          Bem-vindo ao Delivery App
        </h1>
        <p className="text-center text-gray-700 mt-4">
          O melhor lugar para pedir seus pratos favoritos!
        </p>
      </main>
      <Footer />
    </>
  );
};

export default Home;
