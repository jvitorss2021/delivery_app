import mongoose from "mongoose";
import { config } from "dotenv";
import Product from "./models/product";

config(); // Carregar variáveis de ambiente do arquivo .env

const products = [
  { id: 1, name: "Hambúrguer", price: "R$ 20,00", image: "burger.webp" },
  { id: 2, name: "Batata Frita", price: "R$ 12,00", image: "fries.webp" },
  { id: 3, name: "Pizza", price: "R$ 25,00", image: "pizza.webp" },
  { id: 4, name: "Sushi", price: "R$ 40,00", image: "sushi.webp" },
  { id: 5, name: "Poke", price: "R$ 35,00", image: "poke.webp" },
  { id: 6, name: "Salada", price: "R$ 12,00", image: "salad.webp" },
  { id: 7, name: "Tapioca", price: "R$ 18,00", image: "tapioca.webp" },
  { id: 8, name: "Suco Natural", price: "R$ 8,00", image: "suco1.webp" },
  { id: 9, name: "Refrigerante lata", price: "R$ 6,00", image: "refri.webp" },
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
