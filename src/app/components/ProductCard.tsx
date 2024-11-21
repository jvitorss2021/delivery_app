import Image from "next/image";

interface ProductProps {
  id: number;
  name: string;
  price: string;
  image: string;
}

const ProductCard: React.FC<ProductProps> = ({ name, price, image }) => {
  return (
    <div className="border rounded shadow-md p-4">
      <Image
        src={`/images/${image}`}
        alt={name}
        width={400}
        height={160}
        className="w-full h-40 object-cover rounded"
      />
      <h2 className="text-lg font-bold mt-2">{name}</h2>
      <p className="text-gray-600">{price}</p>
      <button
        type="button"
        className="bg-blue-500 text-white py-2 px-4 rounded mt-2 hover:bg-blue-600"
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
};

export default ProductCard;
