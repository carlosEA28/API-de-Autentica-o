var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/service/loginService.ts
var loginService_exports = {};
__export(loginService_exports, {
  Login: () => Login
});
module.exports = __toCommonJS(loginService_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prisma_default = prisma;

// src/service/loginService.ts
var import_jsonwebtoken = require("jsonwebtoken");
var import_bcryptjs = __toESM(require("bcryptjs"));
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
    const validateSenha = await import_bcryptjs.default.compare(senha, userExiste.senha);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Login
});
