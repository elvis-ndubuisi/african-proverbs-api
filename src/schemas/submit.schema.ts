import { object, string, boolean, TypeOf, array } from "zod";

export const submitProverbSchema = object({
  body: object({
    name: string({ required_error: "Name is required" }),
    twitterHandle: string().min(3, "Invalid handle").optional(),
    postOnTwitter: boolean().optional(),
    proverb: string({ required_error: "You have to submit a proverb" }),
    country: string({ required_error: "Country is required" }),
    native: string({ required_error: "Native is requierd" }),
    interpretation: string({
      required_error: "An interpretation is required",
    }).optional(),
    translations: array(
      object({
        dialect: string({
          required_error: "Dialect field or value isn't provided",
        }),
        proverb: string({
          required_error: "Proverb field or value isn't provided",
        }),
      })
    )
      .max(4, "Maximum translation value exceeded")
      .optional(),
  }),
});

export const submitProverbIdSchema = object({
  params: object({
    submitId: string({ required_error: "No submitId provided" }),
  }),
});

export type SubmitProverbInput = TypeOf<typeof submitProverbSchema>["body"];
export type SubmitProverbIdInput = TypeOf<
  typeof submitProverbIdSchema
>["params"];
