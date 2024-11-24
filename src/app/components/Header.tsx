import Image from "next/image";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-950 text-white ">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Image
            src="/images/logo.jpg"
            alt="Logo"
            width={160}
            height={160}
            className="rounded-full"
          />
        </div>
        <nav className="mb-3">
          <ul className="flex space-x-4 ">
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
