import { object, string, boolean, TypeOf, array } from "zod";

export const submitProverbSchema = object({
  body: object({
    name: string({ required_error: "Name is required" }),
    twitterHandle: string(),
    postOnTwitter: boolean(),
    proverb: string({ required_error: "You have to submit a proverb" }),
    country: string({ required_error: "Country is required" }),
    interpretation: string({ required_error: "An interpretation is required" }),
    //   translations: array({}).max(4, "Too much translations"),
  }),
});

export type SubmitProverbInput = TypeOf<typeof submitProverbSchema>["body"];
