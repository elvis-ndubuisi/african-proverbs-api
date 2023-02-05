import {
  prop,
  getModelForClass,
  modelOptions,
  post,
  Severity,
} from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: { timestamps: true },
  options: { allowMixed: Severity.ALLOW },
})
@post<Submit>("save", function () {
  // post on twitter
  // console.log(this);
})
export class Submit {
  @prop({ required: true, lowercase: true, trim: true })
  name!: string;

  @prop()
  twitterHandle?: string;

  @prop({ default: false })
  postOnTwitter?: boolean;

  @prop({ required: true, trim: true, unique: true, lowercase: true })
  proverb!: string;

  @prop({ required: true, lowercase: true })
  country!: string;

  @prop({ required: true, lowercase: true })
  native!: string;

  @prop({ lowercase: true })
  interpretation?: string;

  @prop({ type: () => [Object] })
  translations?: { dialect: string; proverb: string }[];
}

const SubmitModel = getModelForClass(Submit);

export default SubmitModel;
