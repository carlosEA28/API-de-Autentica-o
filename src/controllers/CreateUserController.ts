import { Request, Response } from "express";
import { CreateUserService } from "../service/CreateUserService";

class UserController {
  async handle(req: Request, res: Response) {
    const { nome, email, senha } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ nome, email, senha });

    return res.json(user);
  }
}

export { UserController };
