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
app.use("/products", productRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;
