import prisma from "../prisma";

export class getProfile {
  async execute(user_id: string) {
    const user = await prisma.user.findFirst({
      where: {
        id: user_id,
      },
      select: {
        id: true,
        nome: true,
        email: true,
      },
    });

    return user;
  }
}
