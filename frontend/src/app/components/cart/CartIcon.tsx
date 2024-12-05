import { ShoppingCartIcon } from "@heroicons/react/20/solid";

interface CartIconProps {
  onClick: () => void;
}

const CartIcon: React.FC<CartIconProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 cursor-pointer"
    >
      <ShoppingCartIcon className="h-6 w-6" />
    </div>
  );
};

export default CartIcon;
