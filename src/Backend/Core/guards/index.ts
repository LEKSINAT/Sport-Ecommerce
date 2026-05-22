import { NextFunction, Request, Response } from "express";

export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    res.status(401).json({ message: "Authorization header is required." });
    return;
  }

  next();
};
