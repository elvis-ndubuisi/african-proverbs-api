import { Request, Response } from "express";

/**
 * Gets a random proverb object
 * @param res
 * @route /proverb
 * @return object
 */
export async function getProverb(req: Request, res: Response): Promise<void> {}

/**
 * Gets a random proverbs which country fields matches request query.
 * @param String
 * @return Promise<void>
 */
export async function queryProverb(
  req: Request,
  res: Response
): Promise<void> {}

/**
 * Gets cached proverb. This proverb only chances every 24hrs.
 */
export async function getCachedProverb(
  req: Request,
  res: Response
): Promise<void> {}
