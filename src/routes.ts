import { Router } from "express";

import { UserController } from "./controllers/CreateUserController";
import { LoginController } from "./controllers/loginController";
import { getUserProfileController } from "./controllers/getProfileController";

//MIDDLEWARE
import { isAuthenticated } from "./middlewares/isAuth";

const routes = Router();

routes.post("/user", new UserController().handle);
routes.post("/login", new LoginController().handle);
routes.get("/details", isAuthenticated, new getUserProfileController().handle);

export default routes;
