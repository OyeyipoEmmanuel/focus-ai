import { z } from "zod";

export const journalValidationSchema = z.object({
  id: z.string().optional(),
  content: z
    .string({ message: "Journal entry is required!" })
    .trim()
    .min(1, { message: "Journal entry is required!" }),
  journalDate: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type journalValidationSchemaType = z.infer<
  typeof journalValidationSchema
>;
