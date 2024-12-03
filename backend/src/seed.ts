import mongoose from "mongoose";
import { config } from "dotenv";
import Product from "./models/product";

config(); // Carregar variáveis de ambiente do arquivo .env

const products = [
  {
    id: 1,
    name: "Hambúrguer com bacon",
    price: "R$ 20,00",
    image: "burger2.webp",
    category: "Hamburguer",
  },
  {
    id: 2,
    name: "Hamburguer duplo cheddar",
    price: "R$ 26,00",
    image: "burger1.webp",
    category: "Hamburguer",
  },
  {
    id: 3,
    name: "Hamburguer duplo bacon picles",
    price: "R$ 30,00",
    image: "burger3.webp",
    category: "Hamburguer",
  },
  {
    id: 4,
    name: "Batata Frita",
    price: "R$ 12,00",
    image: "fries.webp",
    category: "Hamburguer",
  },
  {
    id: 5,
    name: "Pizza de burrata",
    price: "R$ 45,00",
    image: "pizza.webp",
    category: "Pizzas",
  },
  {
    id: 6,
    name: "Pizza de peperoni",
    price: "R$ 45,00",
    image: "pizza2.webp",
    category: "Pizzas",
  },
  {
    id: 7,
    name: "Pizza de frango com catupiry",
    price: "R$ 45,00",
    image: "pizza3.webp",
    category: "Pizzas",
  },
  {
    id: 8,
    name: "Combinado individual",
    price: "R$ 40,00",
    image: "sushi.webp",
    category: "Sushi",
  },
  {
    id: 9,
    name: "Combinado Premium",
    price: "R$ 95,00",
    image: "sushi2.webp",
    category: "Sushi",
  },
  {
    id: 10,
    name: "Combinado Premium Famĺia",
    price: "R$ 140,00",
    image: "sushi3.webp",
    category: "Sushi",
  },
  {
    id: 11,
    name: "Poke",
    price: "R$ 35,00",
    image: "poke.webp",
    category: "Sushi",
  },
  {
    id: 12,
    name: "Suco natural de limão",
    price: "R$ 7,00",
    image: "juice.webp",
    category: "Bebidas",
  },
  {
    id: 12,
    name: "Suco natural de Maracujá",
    price: "R$ 9,00",
    image: "juice2.webp",
    category: "Bebidas",
  },
  {
    id: 14,
    name: "Suco natural de Morango",
    price: "R$ 9,00",
    image: "juice3.webp",
    category: "Bebidas",
  },
  {
    id: 15,
    name: "Refrigerante lata",
    price: "R$ 6,00",
    image: "refri.webp",
    category: "Bebidas",
  },
  {
    id: 16,
    name: "Água mineral",
    price: "R$ 3,00",
    image: "water.webp",
    category: "Bebidas",
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase"
    );
    console.log("Conectado ao MongoDB");

    await Product.deleteMany({});
    console.log("Produtos removidos");

    await Product.insertMany(products);
    console.log("Produtos adicionados");

    mongoose.connection.close();
    console.log("Conexão fechada");
  } catch (err) {
    console.error("Erro ao popular o banco de dados", err);
  }
};

seedDB();
