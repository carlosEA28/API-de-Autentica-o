var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/controllers/CreateUserController.ts
var CreateUserController_exports = {};
__export(CreateUserController_exports, {
  UserController: () => UserController
});
module.exports = __toCommonJS(CreateUserController_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserController
});
