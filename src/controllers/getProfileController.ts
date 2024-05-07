import { Request, Response } from "express";
import { getProfile } from "../service/getProfile";

export class getUserProfileController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;

    const getInfo = new getProfile();

    const info = await getInfo.execute(user_id);

    return res.json(info);
  }
}
