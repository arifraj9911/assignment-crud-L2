import express, { Application, Request, Response } from "express";
import cors from "cors";
import { UsersRouter } from "./modules/users/users.routes";
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// router connect
app.use("/api/v1/users", UsersRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World! Live from vercel cli,,,,change to see github");
});

export default app;
