import ProverbModel, { privateFields } from "../models/proverb.model";
import { CreateNewProverbInput } from "../schemas/proverb.schema";
import lodash from "lodash";

/**
 * Fetches a single randomly selected proverb field.
 * If filter param is passed, only proverb object which statisfies filter param is returned.
 * @param {filter: filterString} Query string to use as filter.
 * @returns A proverb object.
 */
export function getProverbService({ filter }: { filter?: string }) {
  return ProverbModel.aggregate([
    { $match: { $or: [{ country: filter }, { native: filter }] } },
    { $sample: { size: 1 } },
  ]);
}

/**
 * Fetches a proverb object from cached memory
 * @returns Proverb object from cached memory
 */
export async function todayProverbService() {
  return "proverb from redis memory";
}

export async function createNewProverbService(
  body: CreateNewProverbInput,
  authorId: string
) {
  return ProverbModel.create({ ...body, author: authorId });
}

export async function deleteProverbService({
  proverbId,
  authorId,
}: {
  proverbId: string;
  authorId: string;
}) {
  try {
    return await ProverbModel.findByIdAndDelete({
      _id: proverbId,
      author: authorId,
    });
  } catch (err) {
    return err;
  }
}

export async function editProverbService({
  proverbId,
  payload,
}: {
  proverbId: string;
  payload: Partial<CreateNewProverbInput>;
}) {
  return ProverbModel.findByIdAndUpdate(proverbId, payload);
}

export function copyToProverbService({
  payload,
  authorId,
}: {
  payload: any;
  authorId: string;
}) {
  const p = lodash.omit(payload, privateFields);
  return ProverbModel.create({ ...p, author: authorId });
}
