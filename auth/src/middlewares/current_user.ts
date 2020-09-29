import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Describes the payload in the jwt.
interface UserPayload {
  id: string;
  email: string;
}

// Augment the Request type to optionally accept a UserPayload in currentUser.
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }
  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;
    req.currentUser = payload;
  } catch (err) {}
  next();
};
