import { TypeOf, object, array, string } from "zod";

const proverbFields = object({
  proverb: string({ required_error: "Proverb is required" }),
  country: string({ required_error: "Proverb country is required" }),
  native: string({ required_error: "Native field is requied" }),
  interpretation: string({
    required_error: "Proverb interpretation is required",
  }).optional(),
  translations: array(
    object({
      dialect: string({ required_error: "Dielect is required" }),
      proverb: string({ required_error: "Proverb is required" }),
    })
  ).optional(),
});

export const createNewProverbSchema = object({
  body: proverbFields,
});

export const createProverbsSchema = object({
  body: object({
    proverbs: array(proverbFields),
  }),
});

/**
 * Proverb's params - proverbId
 */
export const proverbIdQuerySchema = object({
  query: object({
    proverbId: string({ required_error: "Proverb ID is required" }),
  }),
});

export const proverbFilterQuerySchema = object({
  query: object({
    filter: string({
      required_error: "No filter params was passed. Please provide one",
    }),
  }),
});

export type CreateNewProverbInput = TypeOf<
  typeof createNewProverbSchema
>["body"];
export type CreateProverbsInput = TypeOf<typeof createProverbsSchema>["body"];
export type ProverbIdQueryInput = TypeOf<typeof proverbIdQuerySchema>["query"];
export type ProverbFilterQueryInput = TypeOf<
  typeof proverbFilterQuerySchema
>["query"];
