import { Request, Response } from "express";
import { nanoid } from "nanoid";
import {
  ForgotPasswordAdminInput,
  RegisterAdminInput,
  VerifyAdminInput,
  ResetPasswordAdminInput,
} from "../schemas/admin.schema";
import {
  createAdminService,
  findAdminByEmailService,
  findAdminByIdService,
} from "../services/admin.services";
import log from "../utils/logger";
// Test
import sendEmail from "../utils/mailer";

/**
 * Authenticate admin register
 */
export async function registerAdminHandler(
  req: Request<{}, {}, RegisterAdminInput>,
  res: Response
) {
  const body = req.body;

  try {
    const admin = await createAdminService(body);
    await sendEmail({
      from: "test@email.com",
      to: admin.email,
      subject: "Please verify your account",
      text: `verification code ${admin.verificationCode} : id-${admin._id}`,
    });
    res.send("Admin was created");
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(409).send("account already exists");
    }
    return res.status(500).send(err);
  }
}

/**
 * Verify admin on register
 */
export async function verifyAdminHandler(
  req: Request<VerifyAdminInput, {}, {}>,
  res: Response
) {
  const id = req.params.id;
  const verificationCode = req.params.verificationCode;
  //   find admin by id
  const admin = await findAdminByIdService(id);

  //   check to see if admin is registered
  if (!admin) return res.send("Couldn't verify user");

  //   check to see if admin is already verified
  if (admin.verified) return res.send("admin is already verified");

  // check to see if the verification code matched
  if (admin.verificationCode === verificationCode) {
    admin.verified = true;
    await admin.save();
    return res.send("admin successfully verified");
  }

  return res.send("Couldn't verify admin");
}

/**
 * Forgot password
 */
export async function forgotPasswordAdminHandler(
  req: Request<{}, {}, ForgotPasswordAdminInput>,
  res: Response
) {
  const email = req.body.email;

  const admin = await findAdminByEmailService(email);

  if (!admin) {
    log.debug(`Admin with email: ${email} doesn't exists`);
    return res.send("A message has been sent to your mail");
  }

  if (!admin?.verified) {
    return res.send("User is not verified");
  }

  const passwordResetCode = "nanoid";
  admin.passwordResetCode = passwordResetCode;

  await admin.save();

  //   Send email to Admin
  await sendEmail({
    from: "test@email.com",
    to: admin.email,
    subject: "Reset your password",
    text: `Password reset code ${passwordResetCode} : id : ${admin._id}`,
  });

  log.debug(`Password reset email sent to ${admin.email}`);
  return res.send("A message has been sent to your mail");
}

/**
 * Reset password
 */
export async function resetPasswordAdminHandler(
  req: Request<
    ResetPasswordAdminInput["params"],
    {},
    ResetPasswordAdminInput["body"]
  >,
  res: Response
) {
  const { id, passwordResetCode } = req.params;
  const { password, confirmPassword } = req.body;

  const admin = await findAdminByIdService(id);

  if (
    !admin ||
    !admin.passwordResetCode ||
    admin.passwordResetCode !== passwordResetCode
  ) {
    return res.status(400).send("couldn't reset your password");
  }

  admin.passwordResetCode = null;
  admin.password = password;

  await admin.save();

  return res.send("Password updated successfully");
}

/**
 * Authenticate admin login
 */

/**
 * Authenticate admin forget password
 */

/**
 * Add proverb to data source
 */

/**
 * Add multiple proverbs to data source
 */

/**
 * Delete proverb from data source
 */

/**
 * Edit proverb from data source
 */
