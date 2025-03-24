"use server";

import { ReviewInsertSchema } from "@/lib/zod-schema";
import { db } from "@/database/drizzle";
import * as schema from "@/database/schema";

export async function addReview(formData: FormData) {
  try {
    const validatedFields = ReviewInsertSchema.safeParse({
      rating: Number(formData.get("rating")),
      comment: formData.get("comment"),
      recipeId: formData.get("recipeId"),
      userId: formData.get("userId"),
    });

    const recipeSlug = formData.get("recipeSlug");
    console.log("recipeSlug", recipeSlug);

    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const { rating, comment, recipeId, userId } = validatedFields.data;

    if (rating < 1 || rating > 5) {
      return { error: "Rating must be between 1 and 5" };
    }

    const review = await db.insert(schema.reviews).values({
      rating,
      comment,
      recipeId,
      userId,
    });

    if (!review) {
      console.log("Failed to add review");
      return { error: "Failed to add review" };
    }

    return { success: "Review added" };
  } catch (error) {
    console.error("Failed to add review", error);
    return { error: "Failed to add review" };
  }
}
