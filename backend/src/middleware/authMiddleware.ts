import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";

interface AuthenticatedUser {
  id: string;
  username: string;
}

interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}

export const protect = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string;
      };
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        res.status(401).json({ message: "Usuário não encontrado" });
        return;
      }

      req.user = {
        id: user.id.toString(),
        username: user.username,
      };

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Não autorizado, token falhou" });
    }
  } else {
    res.status(401).json({ message: "Não autorizado, sem token" });
  }
};
