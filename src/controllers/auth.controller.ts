import { Request, Response } from "express";
import { CreateSessionInput } from "../schemas/auth.schema";
import {
  findAdminByEmailService,
  findAdminByIdService,
} from "../services/admin.service";
import {
  signAccessTokenService,
  signRefreshTokenService,
  findSessionByIdService,
} from "../services/auth.service";
import lodash from "lodash";
import { verifyJwt } from "../utils/jwt.util";

export async function createSessionHandler(
  req: Request<{}, {}, CreateSessionInput>,
  res: Response
) {
  const message = "Invalid email or password";
  const { email, password } = req.body;

  const admin = await findAdminByEmailService(email);

  if (!admin) return res.status(401).send(message);

  if (!admin.verified) return res.status(200).send("Please verify your email");

  const isValid = await admin.validatePassword(password);

  if (!isValid) return res.status(401).send(message);

  //   Sign access token
  const accessToken = signAccessTokenService(admin);
  //   Sign refresh token
  const refreshToken = await signRefreshTokenService({ adminId: admin._id });
  // Set Cookies
  res.cookie("access-token", accessToken, {
    maxAge: 900000, // 15mins
    httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: "strict",
    secure: false,
  });
  res.cookie("refresh-token", refreshToken, {
    maxAge: 3.154e10, // 1yr
    httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: "strict",
    secure: false,
  });
  //   Send tokens
  return res.status(200).send({ accessToken, refreshToken });
}

export async function refreshAccessTokenHandler(req: Request, res: Response) {
  const refreshToken = lodash.get(req, "headers.x-refresh") as string;

  const decoded = verifyJwt<{ session: string }>(
    refreshToken,
    "refreshTokenPublicKey"
  );

  if (!decoded) {
    return res.status(401).send("Could not refresh access token");
  }

  const session = await findSessionByIdService(decoded.session);

  if (!session || !session.valid) {
    return res.status(401).send("Could not refresh access token");
  }

  const admin = await findAdminByIdService(String(session.admin));

  if (!admin) {
    return res.status(401).send("Couldn't refresh access token");
  }

  const accessToken = signAccessTokenService(admin);

  return res.status(200).send({ accessToken });
}
