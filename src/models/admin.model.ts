import {
  pre,
  prop,
  getModelForClass,
  modelOptions,
  Severity,
  index,
  DocumentType,
} from "@typegoose/typegoose";
import argon2 from "argon2";
import { nanoid } from "nanoid";
import log from "../utils/logger.util";

export const privateFields = [
  "password",
  "__v",
  "verificationCode",
  "passwordRestCode",
  "verified",
];

@pre<Admin>("save", async function () {
  if (!this.isModified("password")) return;

  const hash = await argon2.hash(this.password);

  this.password = hash;

  return;
})
@index({ email: 1 })
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { allowMixed: Severity.ALLOW },
})
/* Admin schema properties */
export class Admin {
  @prop({ required: true, trim: true })
  username!: string;

  @prop({ required: true, lowercase: true, trim: true, unique: true })
  email!: string;

  @prop({ default: "contributor" })
  role!: string;

  @prop({ required: true })
  password!: string;

  @prop()
  passwordResetCode!: string | null;

  @prop({ default: false })
  verified!: boolean;

  @prop({ required: true, default: () => nanoid() })
  verificationCode!: string;

  async validatePassword(this: DocumentType<Admin>, candidatepassword: string) {
    try {
      return await argon2.verify(this.password, candidatepassword);
    } catch (err) {
      log.debug("Couldn't validate password");
      return false;
    }
  }
}

const AdminModel = getModelForClass(Admin);

export default AdminModel;
