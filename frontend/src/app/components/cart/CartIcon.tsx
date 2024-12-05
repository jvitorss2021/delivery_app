import { ShoppingCartIcon } from "@heroicons/react/20/solid";

interface CartIconProps {
  onClick: () => void;
  isDrawerOpen: boolean;
}

const CartIcon: React.FC<CartIconProps> = ({ onClick, isDrawerOpen }) => {
  return (
    <div
      onClick={onClick}
      className={`fixed bottom-4 ${
        isDrawerOpen ? "right-[38%]" : "right-4"
      } bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 cursor-pointer transition-all duration-300`}
    >
      <ShoppingCartIcon className="h-6 w-6" />
    </div>
  );
};

export default CartIcon;
