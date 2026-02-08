import express, { Request, Response, NextFunction } from "express";
import path from 'path';
import responseHandler from "./services/responseHandler.service";
import { createUserTable } from "./data/createTables";

const createServer = async () => {
  const app = express();

  app.use((req: Request, res: Response, next: NextFunction) => {
    console.info(`[${Date.now()}] - ${req.url} | ${req.method} | ${req.ip} | ${req.headers["user-agent"]}`);
    next();
  });

  app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
  app.use(express.json());

  createUserTable();

  app.get("/", async (_: Request, res: Response) => {
    return responseHandler(
      res, 
      200, 
      true, 
      "Welcome to the Chat AI Backend"
    );
  });

  return app
}

export default createServer;