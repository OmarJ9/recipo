import { z } from "zod";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";
import * as schema from "@/database/schema";

export const RecipeInsertSchema = createInsertSchema(schema.recipe, {
  id: z.string(),
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  image: z.string().optional(),
  time: z.string().min(1, { message: "Cooking time is required" }),
  difficulty: z.enum(["easy", "medium", "hard"], {
    required_error: "Please select a difficulty level",
  }),
  countryId: z.string(),
  servings: z.number().min(1, { message: "Servings must be at least 1" }),
  calories: z.number().optional(),
  videoUrl: z.string().optional(),
  ingredients: z.array(z.string()).min(1, {
    message: "At least one ingredient is required",
  }),
  instructions: z
    .array(z.string())
    .min(1, { message: "At least one instruction is required" }),
  isFeatured: z.boolean().default(false),
});

export const CountryInsertSchema = createInsertSchema(schema.country, {
  id: z.string(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  flagImage: z.string().url("Please enter a valid URL"),
});

export const ReviewSelectSchema = createSelectSchema(schema.reviews);
export const ReviewInsertSchema = createInsertSchema(schema.reviews);

export const CountrySelectSchema = createSelectSchema(schema.country);
export const RecipeSelectSchema = createSelectSchema(schema.recipe);

export type RecipeInsert = z.infer<typeof RecipeInsertSchema>;
export type CountryInsert = z.infer<typeof CountryInsertSchema>;
export type CountrySelect = z.infer<typeof CountrySelectSchema>;
