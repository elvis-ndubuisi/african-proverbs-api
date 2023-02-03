import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import log from "../utils/logger.util";

/**
 *  Validate incoming requests again a schema.
 * @param schema Object used for validation
 * @returns An error is validation fails or process to next middleware.
 */
const validateResources =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (err: any) {
      log.error(err.messages);
      return res.status(400).send(err.errors);
    }
  };

export default validateResources;
