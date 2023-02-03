import {
  prop,
  getModelForClass,
  modelOptions,
  post,
} from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: { timestamps: true },
})
@post<Submit>("save", function () {
  // post on twitter
})
export class Submit {
  @prop({ required: true, lowercase: true, trim: true })
  name!: string;

  @prop()
  twitterHandle?: string;

  @prop({ default: false })
  postOnTwitter!: boolean;

  @prop({ required: true, trim: true })
  proverb!: string;

  @prop({ required: true })
  country!: string;

  @prop()
  interpretation!: string;
}

const SubmitModel = getModelForClass(Submit);

export default SubmitModel;
