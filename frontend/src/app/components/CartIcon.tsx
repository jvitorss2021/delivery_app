import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/20/solid";

const CartIcon: React.FC = () => {
  return (
    <Link href="/cart">
      <div className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 cursor-pointer">
        <ShoppingCartIcon className="h-6 w-6" />
      </div>
    </Link>
  );
};

export default CartIcon;
