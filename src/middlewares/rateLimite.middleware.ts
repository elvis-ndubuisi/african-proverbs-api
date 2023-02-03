import { Request, Response, NextFunction } from "express";

/**
 * Set rate limite
 * @param req
 * @param res
 * @param next
 */
function rateLimiter(req: Request, res: Response, next: NextFunction) {}

export default rateLimiter;
