import jwt from "jsonwebtoken";

export function signJwt(
  object: Object,
  keyName: "accessTokePrivateKey" | "refreshTokePrivateKey",
  options?: jwt.SignOptions | undefined
) {
  const signingKey = "adsf";
  return jwt.sign(object, signingKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}
