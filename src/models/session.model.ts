import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { Admin } from "./admin.model";

export class Session {
  @prop({ ref: () => Admin })
  admin!: Ref<Admin>;

  @prop({ default: true })
  valid!: boolean;
}

const SessionModel = getModelForClass(Session, {
  schemaOptions: { timestamps: true },
});

export default SessionModel;
