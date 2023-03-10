import { Request, Response } from "express";
import config from "config";
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
} from "../services/admin.service";
import log from "../utils/logger.util";
import lodash from "lodash";
import sendEmail from "../utils/mailer.util";
import { nanoid } from "nanoid";

/**
 * Register Admin. Admin roles are assigned by default if non is provided.
 * @param req.body.username Username of registering admin.
 * @param req.body.email  Email of registering admin.
 * @param req.body.password Password chosen by registering admin.
 * @param req.body.confirmPassword Secondary password to validate password.
 * @returns HTTP response - text.
 */
export async function registerAdminHandler(
  req: Request<{}, {}, RegisterAdminInput>,
  res: Response
) {
  const body = req.body;

  try {
    const admin = await createAdminService(body);
    await sendEmail({
      to: admin.email,
      subject: "Account Verification",
      text: "Verify Account",
      url: `${config.get("host")}/api/admin/verify/${admin._id}/${
        admin.verificationCode
      }`,
    });
    res.status(201).send("Admin was created");
  } catch (err: any) {
    if (err?.code === 11000) {
      return res.status(409).send("account already exists");
    }
    log.error(err);
    return res.status(500).send(err);
  }
}

/**
 * Verify newly registerd admin. Verification is performed via endpoint sent to admins mail
 * @param req.params.id Admin ID
 * @param req.params.verificationCode Verification code sent with the email.
 * @returns HTTPS response - text.
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
  if (!admin) return res.status(404).send("Couldn't verify user");

  //   check to see if admin is already verified
  if (admin.verified) return res.status(409).send("admin is already verified");

  // check to see if the verification code matched
  if (admin.verificationCode === verificationCode) {
    admin.verified = true;
    await admin.save();
    return res
      .status(200)
      .send(
        `admin successfully verified. <a href="${config.get(
          "origin"
        )}/auth/login">Proceed to login page</a>`
      );
  }

  // Handle error
  return res.status(500).send("Couldn't verify admin");
}

/**
 * Validates if an admin can reset their passwords if lost.
 * Emails are sent to admin's mail IF admin info is found in the database
 * @param req.body.email Email from admin
 * @returns HTTP response - text
 */
export async function forgotPasswordAdminHandler(
  req: Request<{}, {}, ForgotPasswordAdminInput>,
  res: Response
) {
  const email = req.body.email;

  const admin = await findAdminByEmailService(email);

  if (!admin) {
    return res.status(200).send("A message has been sent to your mail");
  }

  if (!admin?.verified) {
    return res.status(200).send("User is not verified");
  }

  const passwordResetCode = nanoid();
  admin.passwordResetCode = passwordResetCode;

  await admin.save();

  //   Send email to Admin
  await sendEmail({
    to: admin.email,
    subject: "Reset Password",
    text: "Reset your password",
    url: `${config.get("host")}/api/admin/resetpassword/${
      admin._id
    }/${passwordResetCode}`,
  });

  return res.status(201).send("A message has been sent to your mail");
}

/**
 * Resets admin password with new password
 * @param req - id, passwordResetCode = req.params & password, confirmPassword from req.body
 * @returns HTTP response - text.
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
  const { password } = req.body;

  try {
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

    return res
      .status(200)
      .send(
        `Password updated successfully. Proceed to <a href="${config.get(
          "origin"
        )}/auth/login">Login Page</a>`
      );
  } catch (err: any) {
    res.status(500).send("Internal server error");
  }
}

/**
 * Gets details of currently logged in admin.
 * @returns Admin detals object.
 */
export async function getCurrentAdminHandler(_: Request, res: Response) {
  try {
    res.status(200).send(lodash.omit(res.locals.admin, ["passwordResetCode"]));
  } catch (err: any) {
    res.status(500).send("Internal server error");
  }
}
