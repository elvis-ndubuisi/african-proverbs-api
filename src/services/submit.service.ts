import SubmitModel, { Submit } from "../models/submit.model";

export function submitProverbService(payload: Submit) {
  return SubmitModel.create(payload);
}
