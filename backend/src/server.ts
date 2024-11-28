import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import productRoutes from "./routes/product";
import authRoutes from "./routes/auth";
import { config } from "dotenv";

config(); // Carregar variáveis de ambiente do arquivo .env

const app = express();

// Conectar ao MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// Rota para a raiz
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;
