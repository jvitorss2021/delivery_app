import { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";

// Registrar um novo usuário
export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: "Usuário registrado com sucesso" });
  } catch (err) {
    res.status(400).json({ message: "Erro ao registrar usuário", error: err });
  }
};

// Login de usuário
export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(400).json({ message: "Usuário não encontrado" });
      return;
      console.log(User);
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(400).json({ message: "Senha incorreta" });
      return;
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor", error: err });
  }
};
