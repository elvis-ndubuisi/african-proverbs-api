import {
  getModelForClass,
  prop,
  Ref,
  post,
  modelOptions,
  Severity,
} from "@typegoose/typegoose";
import { Admin } from "./admin.model";

export const privateFields = ["__v", "author", "_id", "createdAt", "updatedAt"];

@post<Proverb>("save", async function () {
  console.log(this.proverb);
  console.log(this.author);
})
@modelOptions({
  schemaOptions: { timestamps: true },
  options: { allowMixed: Severity.ALLOW },
})
export class Proverb {
  @prop({ required: true, unique: true, lowercase: true })
  proverb!: string;

  @prop({ required: true, trim: true, lowercase: true })
  native!: string;

  @prop({ lowercase: true, required: true })
  country!: string;

  @prop({ lowercase: true })
  interpretation?: string;

  @prop({ type: () => [Object], default: [] })
  translations?: string[];

  @prop({ ref: () => Admin })
  author!: Ref<Admin>;
}

const ProverbModel = getModelForClass(Proverb);
export default ProverbModel;
