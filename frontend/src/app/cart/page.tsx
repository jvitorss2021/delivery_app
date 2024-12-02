import Cart from "../components/cart/Cart";

const CartPage: React.FC = () => {
  return (
    <div className="flex flex-col bg-cover bg-center bg-[url('/images/fundo.jpg')] min-h-screen">
      <main className="container mx-auto py-8 mb-8 bg-opacity-75 rounded-lg shadow-lg">
        <Cart />
      </main>
    </div>
  );
};

export default CartPage;
