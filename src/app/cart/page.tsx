import Header from "../components/Header";
import Footer from "../components/Footer";
import Cart from "../components/Cart";

const CartPage: React.FC = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto py-8">
        <Cart />
      </main>
      <Footer />
    </>
  );
};

export default CartPage;
