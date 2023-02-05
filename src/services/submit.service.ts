import SubmitModel, { Submit } from "../models/submit.model";
import log from "../utils/logger.util";
import { copyToProverbService } from "./proverbs.service";

export function submitProverbService(payload: Partial<Submit>) {
  return SubmitModel.create(payload);
}

export function getSubmittedProverbsService() {
  return "paginated submit";
}

export async function approveSubmittedProverbService({
  submitId,
  authorId,
}: {
  submitId: string;
  authorId: string;
}) {
  try {
    const submitted = await SubmitModel.findOneAndRemove({ _id: submitId });
    const proverb = await copyToProverbService({
      payload: submitted,
      authorId,
    });
    return proverb;
  } catch (err: any) {
    log.error(err);
    return null;
  }
}

export function disapprovedSubmittedProverbService(submitId: string) {
  return SubmitModel.findByIdAndDelete(submitId);
}
