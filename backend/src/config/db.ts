import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase"
    );
    console.log("Conectado ao MongoDB");
  } catch (err) {
    console.error("Erro ao conectar ao MongoDB", err);
    process.exit(1);
  }
};

export default connectDB;
