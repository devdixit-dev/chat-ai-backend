import { Request,Response } from "express";
import responseHandler from "../services/responseHandler.service";

export const AuthInit = (req: Request, res: Response) => {
  try{

  }
  catch(error: any) {
    console.error('Error in auth init', error);
    return responseHandler(res, 500, false, "Internal server error");
  }
}

export const AuthLogin = (req: Request, res: Response) => {
  try{

  }
  catch(error: any) {
    console.error('Error in auth login', error);
    return responseHandler(res, 500, false, "Internal server error");
  }
}

export const AuthLogout = (req: Request, res: Response) => {
  try{

  }
  catch(error: any) {
    console.error('Error in auth logout', error);
    return responseHandler(res, 500, false, "Internal server error");
  }
}