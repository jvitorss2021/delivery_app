const Home: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-500">
        Bem-vindo ao Delivery App 🚀
      </h1>
      <h1>O melhor lugar para pedir sua comida favorita!</h1>
      <div className="flex space-x-4">
        <a
          href="/products"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Produtos
        </a>
        <a
          href="/carrinho"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Carrinho
        </a>
      </div>
    </div>
  );
};

export default Home;
