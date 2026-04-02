import { z } from "zod";

export const addEventValidationSchema = z.object({
  id: z.string().optional(),
  eventName: z
    .string({ message: "Event is required!" })
    .trim()
    .min(3, { message: "Minimum of 3 characters is required!" }),

  desc: z.string().trim().max(50, { message: "Max limit exceeded" }).optional(),

  eventType: z
    .enum(["meeting", "fun", "family", "others"], {
      message: "Please select a valid field",
    })
    .optional(),

  eventDate: z.string().optional(),
  noOfAttendees: z.string().optional(),
  startTime: z.string({ message: "Start Time is required!" }).optional(),
  endTime: z.string({ message: "End Time is required!" }).optional(),
  location: z.string({ message: "Location is required!" }),
  dateAdded: z.string().optional(),
});

export type addEventValidationSchemaType = z.infer<
  typeof addEventValidationSchema
>;
