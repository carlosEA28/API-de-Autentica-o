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

// src/controllers/getProfileController.ts
var getProfileController_exports = {};
__export(getProfileController_exports, {
  getUserProfileController: () => getUserProfileController
});
module.exports = __toCommonJS(getProfileController_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prisma_default = prisma;

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getUserProfileController
});
