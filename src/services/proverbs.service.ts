import ProverbModel, { Proverb } from "../models/proverb.model";

/**
 * Returns a randomly selected proverb.
 */
export async function getProverbService() {
  const count = await ProverbModel.find().estimatedDocumentCount();
  const seed = await Math.floor(Math.random() * count);

  return seed;
}

/**
 * Fetches a randomly selected proverb filtered by country name.
 * @param country Name of country to use a filter.
 * @returns Proverb object
 */
export async function filterProverbHandlerService(country: string) {
  const value = await ProverbModel.find({ country: country });
  return "filter proverb";
}

/**
 * Fetches a proverb object from cached memory
 * @returns Proverb object from cached memory
 */
export async function todayProverbService() {
  return "proverb from redis memory";
}
