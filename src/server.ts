import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";

import routes from "./routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

// app.use(errorMidlleware); pesquisar o video dele (guido), sobre tratamento de erros

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

app.listen(process.env.HOST_PORT, () => {
  console.log("Running");
});
