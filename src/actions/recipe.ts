"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/database/drizzle";
import * as schema from "@/database/schema";
import { v4 as uuidv4 } from "uuid";
import { eq, and } from "drizzle-orm";
import { RecipeInsert, RecipeInsertSchema } from "@/lib/zod-schema";
import { slugify } from "@/lib/utils";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function createRecipe(input: RecipeInsert) {
  const validatedData = RecipeInsertSchema.parse(input);

  // Generate a slug from the title
  const slug = slugify(validatedData.title);

  const id = uuidv4();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session && session?.user?.role !== "admin") {
    throw new Error("Unauthorized");
  }

  await db.insert(schema.recipe).values({
    id,
    title: validatedData.title,
    slug,
    description: validatedData.description,
    image:
      validatedData.image ||
      "https://images.unsplash.com/photo-1428895009712-de9e58a18409?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2hlZnxlbnwwfHwwfHx8MA%3D%3D",
    time: validatedData.time,
    difficulty: validatedData.difficulty,
    countryId: validatedData.countryId,
    servings: validatedData.servings,
    calories: validatedData.calories || null,
    videoUrl: validatedData.videoUrl || null,
    ingredients: validatedData.ingredients,
    instructions: validatedData.instructions,
    isFeatured: validatedData.isFeatured,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  revalidatePath("/admin/recipes");
  revalidatePath("/recipes");

  return { success: true, id };
}

export async function updateRecipe(input: RecipeInsert) {
  const validatedData = RecipeInsertSchema.parse(input);

  // Generate an updated slug from the title
  const slug = slugify(validatedData.title);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session && session?.user?.role !== "admin") {
    throw new Error("Unauthorized");
  }

  // Get existing recipe to ensure it exists
  const existingRecipe = await db
    .select()
    .from(schema.recipe)
    .where(eq(schema.recipe.id, validatedData.id))
    .limit(1)
    .then((rows) => rows[0] || null);

  if (!existingRecipe) {
    throw new Error("Recipe not found");
  }

  await db
    .update(schema.recipe)
    .set({
      title: validatedData.title,
      slug,
      description: validatedData.description,
      image: validatedData.image || null,
      time: validatedData.time,
      difficulty: validatedData.difficulty,
      countryId: validatedData.countryId,
      servings: validatedData.servings,
      calories: validatedData.calories || null,
      videoUrl: validatedData.videoUrl || null,
      ingredients: validatedData.ingredients,
      instructions: validatedData.instructions,
      isFeatured: validatedData.isFeatured,
      updatedAt: new Date(),
    })
    .where(eq(schema.recipe.id, validatedData.id));

  revalidatePath("/admin/recipes");
  revalidatePath("/recipes");

  return { success: true, id: validatedData.id };
}

export async function deleteRecipe(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session && session?.user?.role !== "admin") {
    throw new Error("Unauthorized");
  }

  await db.delete(schema.recipe).where(eq(schema.recipe.id, id));

  revalidatePath("/admin/recipes");
  revalidatePath("/recipes");

  return { success: true };
}

export async function likeRecipe(recipeId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session) {
    throw new Error("Unauthorized");
  }

  const existingLike = await db
    .select()
    .from(schema.likes)
    .where(
      and(
        eq(schema.likes.userId, session.user.id),
        eq(schema.likes.recipeId, recipeId)
      )
    )
    .limit(1)
    .then((rows) => rows[0] || null);

  if (existingLike) {
    await db.delete(schema.likes).where(eq(schema.likes.id, existingLike.id));
  } else {
    await db.insert(schema.likes).values({
      userId: session.user.id,
      recipeId,
    });
  }

  revalidatePath("/");

  return { success: true };
}
