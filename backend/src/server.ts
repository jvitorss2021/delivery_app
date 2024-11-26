import express from "express";
import mongoose from "mongoose";
import productRoutes from "./routes/product";
import authRoutes from "./routes/auth";
import { config } from "dotenv";
import cors from "cors";

config(); // Carregar variáveis de ambiente do arquivo .env

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Rotas
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// Conexão com o Banco de Dados
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase")
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB", err));

// Iniciar o Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
