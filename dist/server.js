var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.ts
var import_express2 = __toESM(require("express"));
var import_express_async_errors = require("express-async-errors");
var import_cors = __toESM(require("cors"));

// src/routes.ts
var import_express = require("express");

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prisma_default = prisma;

// src/service/CreateUserService.ts
var import_bcryptjs = require("bcryptjs");
var CreateUserService = class {
  async execute({ nome, email, senha }) {
    if (!nome || nome == "" || !email || email == "" || !senha || senha == "") {
      throw new Error("Um ou mais campos vazios");
    }
    const userExiste = await prisma_default.user.findFirst({
      where: {
        email
      }
    });
    if (userExiste) {
      throw new Error("Usuario j\xE1 cadastrado");
    }
    const senhaHash = await (0, import_bcryptjs.hash)(senha, 8);
    const newUser = await prisma_default.user.create({
      data: {
        nome,
        email,
        senha: senhaHash
      },
      select: {
        nome: true,
        email: true
      }
    });
    return newUser;
  }
};

// src/controllers/CreateUserController.ts
var UserController = class {
  async handle(req, res) {
    const { nome, email, senha } = req.body;
    const createUser = new CreateUserService();
    const user = await createUser.execute({ nome, email, senha });
    return res.json(user);
  }
};

// src/service/loginService.ts
var import_jsonwebtoken = require("jsonwebtoken");
var import_bcryptjs2 = __toESM(require("bcryptjs"));
var Login = class {
  async execute({ email, senha }) {
    const userExiste = await prisma_default.user.findFirst({
      where: {
        email
      }
    });
    if (!userExiste) {
      throw new Error("Usuario n\xE3o encontrado!");
    }
    const validateSenha = await import_bcryptjs2.default.compare(senha, userExiste.senha);
    if (!validateSenha) {
      throw new Error("Email ou senha inv\xE1lidos");
    }
    const token = (0, import_jsonwebtoken.sign)({ id: userExiste.id }, process.env.JWT_SECRET ?? "", {
      expiresIn: "7d"
    });
    return {
      id: userExiste.id,
      nome: userExiste.nome,
      email: userExiste.email,
      token
    };
  }
};

// src/controllers/loginController.ts
var LoginController = class {
  async handle(req, res) {
    const { email, senha } = req.body;
    const loginUser = new Login();
    const login = await loginUser.execute({ email, senha });
    return res.json(login);
  }
};

// src/service/getProfile.ts
var getProfile = class {
  async execute(user_id) {
    const user = await prisma_default.user.findFirst({
      where: {
        id: user_id
      },
      select: {
        id: true,
        nome: true,
        email: true
      }
    });
    return user;
  }
};

// src/controllers/getProfileController.ts
var getUserProfileController = class {
  async handle(req, res) {
    const user_id = req.user_id;
    const getInfo = new getProfile();
    const info = await getInfo.execute(user_id);
    return res.json(info);
  }
};

// src/middlewares/isAuth.ts
var import_jsonwebtoken2 = require("jsonwebtoken");
function isAuthenticated(req, res, next) {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.status(401).end();
  }
  const [, token] = authToken.split(" ");
  try {
    const { id } = (0, import_jsonwebtoken2.verify)(token, process.env.JWT_SECRET);
    req.user_id = id;
    return next();
  } catch (error) {
    return res.status(401).end();
  }
}

// src/routes.ts
var routes = (0, import_express.Router)();
routes.post("/user", new UserController().handle);
routes.post("/login", new LoginController().handle);
routes.get("/details", isAuthenticated, new getUserProfileController().handle);
var routes_default = routes;

// src/server.ts
var app = (0, import_express2.default)();
app.use(import_express2.default.json());
app.use((0, import_cors.default)());
app.use(routes_default);
app.use((err, req, res, next) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message
    });
  }
  return res.status(500).json({
    status: "error",
    message: "Internal server error"
  });
});
app.listen(process.env.HOST_PORT, () => {
  console.log("Running");
});
