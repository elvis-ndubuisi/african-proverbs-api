import { Request, Response } from "express";
import { getProverbService } from "../services/proverbs.service";

/**
 * Get a random proverb.
 * @returns A proverb object
 */
export async function getProverbHandler(_: Request, res: Response) {
  const proverb = await getProverbService();
  console.log(proverb);
  return res.send("done");
}

/**
 * Get a random proverb whos country field matches request params.
 * @returns A proverb object.
 */
export async function filterProverbHandler(req: Request, res: Response) {
  res.send("randome flder proverb");
}

/**
 * Get a single proverb object from cached memory.
 * @param req
 * @param res
 * @returns A proverb object.
 */
export async function todayProverbHandler(req: Request, res: Response) {
  res.send("proverb today");
}

// Admins only
export async function createNewProverb(req: Request, res: Response) {}
