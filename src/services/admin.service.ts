import AdminModel, { Admin } from "../models/admin.model";
import ProverbModel, { Proverb } from "../models/proverb.model";

export function createAdminService(payload: Partial<Admin>) {
  return AdminModel.create(payload);
}

export function findAdminByIdService(id: string) {
  return AdminModel.findById(id);
}

export function findAdminByEmailService(email: string) {
  return AdminModel.findOne({ email: email });
}

export function createProverbService(payload: Partial<Proverb>) {
  return ProverbModel.create(payload);
}
