import { Request, Response } from "express";
import { Login } from "../service/loginService";

export class LoginController {
  async handle(req: Request, res: Response) {
    const { email, senha } = req.body;

    const loginUser = new Login();

    const login = await loginUser.execute({ email, senha });

    return res.json(login);
  }
}
