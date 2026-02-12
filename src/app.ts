import express, { Request, Response, NextFunction } from "express";
import path from 'path';
import responseHandler from "./services/responseHandler.service";
import AuthRoute from "./routes/auth.route";
import connectDb from "./config/db.config";
import UserRoute from "./routes/user.route";

const createServer = async () => {
  const app = express();
  await connectDb();

  app.use((req: Request, res: Response, next: NextFunction) => {
    console.info(`[${Date.now()}] - ${req.url} | ${req.method} | ${req.ip} | ${req.headers["user-agent"]}`);
    next();
  });

  app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
  app.use(express.json());

  app.use("/api/auth", AuthRoute);
  app.use("/api/user", UserRoute);
  // app.use("/api/admin");

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