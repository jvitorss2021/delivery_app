const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black-100">
      <h1 className="text-3xl font-bold text-blue-500 mb-4">
        Bem-vindo ao Delivery App 🚀
      </h1>
      <h2 className="text-xl mb-8">
        O melhor lugar para pedir sua comida favorita!
      </h2>
      <div className="flex flex-row space-x-4">
        <a
          href="/products"
          className="bg-blue-500 text-white py-1.5 px-2.5 rounded hover:bg-blue-600"
        >
          Produtos
        </a>
        <a
          href="/carrinho"
          className="bg-blue-500 text-white py-1.5 px-2.5 rounded hover:bg-blue-600"
        >
          Carrinho
        </a>
      </div>
    </div>
  );
};

export default Home;
