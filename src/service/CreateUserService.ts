import prisma from "../prisma";
import { hash } from "bcryptjs";

interface User {
  nome: string;
  email: string;
  senha: string;
}

export class CreateUserService {
  async execute({ nome, email, senha }: User) {
    if (!nome || nome == "" || !email || email == "" || !senha || senha == "") {
      throw new Error("Um ou mais campos vazios");
    }

    const userExiste = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userExiste) {
      throw new Error("Usuario já cadastrado");
    }

    const senhaHash = await hash(senha, 8);

    const newUser = await prisma.user.create({
      data: {
        nome,
        email,
        senha: senhaHash,
      },
      select: {
        nome: true,
        email: true,
      },
    });

    return newUser;
  }
}
