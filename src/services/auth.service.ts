import { DocumentType } from "@typegoose/typegoose";
import { Admin, privateFields } from "../models/admin.model";
import lodash from "lodash";
import SessionModel from "../models/session.model";
import { signJwt } from "../utils/jwt.util";

export async function createSessionService({ adminId }: { adminId: string }) {
  return SessionModel.create({ admin: adminId });
}

export async function findSectionByIdService(id: string) {
  return SessionModel.findById(id);
}

export function signAccessTokenService(admin: DocumentType<Admin>) {
  const payload = lodash.omit(admin.toJSON(), privateFields);

  const accessToken = signJwt(payload, "accessTokenPrivateKey", {
    expiresIn: "15m",
  });
  return accessToken;
}

export async function signRefreshTokenService({
  adminId,
}: {
  adminId: string;
}) {
  const session = await createSessionService({ adminId: adminId });

  const refreshToken = signJwt(
    { session: session._id },
    "refreshTokenPrivateKey",
    {
      expiresIn: "1yr",
    }
  );

  return refreshToken;
}
