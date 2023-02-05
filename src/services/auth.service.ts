import { DocumentType } from "@typegoose/typegoose";
import { Admin, privateFields } from "../models/admin.model";
import lodash from "lodash";
import SessionModel from "../models/session.model";
import { signJwt } from "../utils/jwt.util";
import config from "config";

export async function createSessionService({ adminId }: { adminId: string }) {
  return SessionModel.create({ admin: adminId });
}

export async function findSessionByIdService(id: string) {
  return SessionModel.findById(id);
}

export function signAccessTokenService(admin: DocumentType<Admin>) {
  const payload = lodash.omit(admin.toJSON(), privateFields);

  const accessToken = signJwt(payload, "accessTokenPrivateKey", {
    expiresIn: config.get<string>("shortSession"),
  });
  return accessToken;
}

export async function signRefreshTokenService({
  adminId,
}: {
  adminId: string;
}) {
  const session = await createSessionService({ adminId });

  const refreshToken = signJwt(
    { session: session._id },
    "refreshTokenPrivateKey",
    {
      expiresIn: config.get<string>("longSession"),
    }
  );

  return refreshToken;
}
