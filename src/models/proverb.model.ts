import { getModelForClass, prop, Ref, post } from "@typegoose/typegoose";
import { Admin } from "./admin.model";
@post<Proverb>("save", async function () {
  console.log(this.proverb);
  console.log(this.author);
})
export class Proverb {
  @prop({ required: true, trim: true, lowercase: true })
  proverb!: string;

  @prop()
  interpretation?: string;

  @prop({ type: () => [Object], default: [] })
  translations?: string[];

  @prop({ ref: () => Admin })
  author!: Ref<Admin>;
}

const ProverbModel = getModelForClass(Proverb);
export default ProverbModel;
