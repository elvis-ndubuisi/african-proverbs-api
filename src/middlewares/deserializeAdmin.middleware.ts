import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt.util";
import lodash from "lodash";

/**
 * Get access token from authorization header, decode access token/verify and attach admin to res.locals
 */
const deserializeAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken =
    lodash.get(req.cookies, "access-token") ||
    (req.headers.authorization || "").replace(/^Bearer\s/, "");

  if (!accessToken) return next();
  const decoded = verifyJwt(accessToken, "accessTokenPublicKey");

  if (decoded) {
    res.locals.admin = decoded;
  }
  return next();
};

export default deserializeAdmin;
