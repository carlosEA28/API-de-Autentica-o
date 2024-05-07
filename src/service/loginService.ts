import prisma from "../prisma";
import { sign } from "jsonwebtoken";
import bcryptjs from "bcryptjs";

interface LoginUser {
  email: string;
  senha: string;
}

export class Login {
  async execute({ email, senha }: LoginUser) {
    const userExiste = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!userExiste) {
      throw new Error("Usuario não encontrado!");
    }

    const validateSenha = await bcryptjs.compare(senha, userExiste.senha);

    if (!validateSenha) {
      throw new Error("Email ou senha inválidos");
    }

    const token = sign({ id: userExiste.id }, process.env.JWT_SECRET ?? "", {
      expiresIn: "7d",
    });

    return {
      id: userExiste.id,
      nome: userExiste.nome,
      email: userExiste.email,
      token: token,
    };
  }
}
