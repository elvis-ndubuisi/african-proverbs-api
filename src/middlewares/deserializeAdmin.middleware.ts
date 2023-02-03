import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt.util";

/**
 * Get access token from authorization header, decode access token/verify and attach admin to res.locals
 */
const deserializeAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = (req.headers.authorization || "").replace(
    /^Bearer\s/,
    ""
  );

  if (!accessToken) return next();
  const decoded = verifyJwt(accessToken, "accessTokenPublicKey");

  if (decoded) {
    res.locals.admin = decoded;
  }
  return next();
};

export default deserializeAdmin;
