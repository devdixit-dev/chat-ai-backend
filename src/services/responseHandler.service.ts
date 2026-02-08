import { Response } from "express";

const responseHandler = (
  res: Response,
  status: number,
  success: boolean,
  message: any,
  data: any = null
) => 
{
  return res.status(status).json({
    success, message, data
  });
}

export default responseHandler;