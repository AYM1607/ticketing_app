import { Request, Response, NextFunction } from "express";

import { NotAuthorizedError } from "../errors/not_authorized_error";

// We assume that this middleware is always put after the currentUser middleware.
export const requireAuth = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }
  next();
};
