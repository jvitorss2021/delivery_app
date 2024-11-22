const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Delivery App</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/products" className="hover:underline">
                Produtos
              </a>
            </li>
            <li>
              <a href="/cart" className="hover:underline">
                Carrinho
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
