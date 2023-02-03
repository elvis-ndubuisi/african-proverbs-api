import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

function requestError(
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) {
  next(err);
}

export default requestError;
