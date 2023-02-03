import AdminModel, { Admin } from "../models/admin.model";

export function createAdminService(payload: Partial<Admin>) {
  return AdminModel.create(payload);
}

export function findAdminByIdService(id: string) {
  return AdminModel.findById(id);
}

export function findAdminByEmailService(email: string) {
  return AdminModel.findOne({ email: email });
}
