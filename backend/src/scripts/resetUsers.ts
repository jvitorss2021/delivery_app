import mongoose from "mongoose";
import { config } from "dotenv";
import User from "../models/user";

config();

const resetUsers = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase"
    );
    console.log("Conectado ao MongoDB");

    await User.deleteMany({});
    console.log("Todos os usuários foram removidos");

    mongoose.connection.close();
    console.log("Conexão com o MongoDB fechada");
  } catch (err) {
    console.error("Erro ao resetar usuários", err);
  }
};

resetUsers();
