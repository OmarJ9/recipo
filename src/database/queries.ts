import { db } from "./drizzle";
import * as schema from "./schema";
import { desc, eq, count, ilike } from "drizzle-orm";
import { cache } from "react";
import type {
  Country,
  RecipeQueryOptions,
  RecipeWithCountry,
  ReviewWithUserName,
} from "@/types/recipe";

export const getPopularCuisines = cache(async (): Promise<Country[]> => {
  try {
    return db.select().from(schema.country).orderBy(schema.country.name);
  } catch {
    throw new Error("Failed to fetch popular cuisines");
  }
});

export const getCountryById = cache(
  async (id: string): Promise<Country | null> => {
    try {
      const result = await db
        .select()
        .from(schema.country)
        .where(eq(schema.country.id, id));
      return result[0] || null;
    } catch {
      throw new Error("Failed to fetch country by id");
    }
  }
);

export const getAllRecipes = cache(
  async ({
    limit = 12,
    offset = 0,
    countrySlug,
  }: RecipeQueryOptions = {}): Promise<RecipeWithCountry[]> => {
    try {
      const query = db
        .select({
          id: schema.recipe.id,
          title: schema.recipe.title,
          slug: schema.recipe.slug,
          description: schema.recipe.description,
          image: schema.recipe.image,
          time: schema.recipe.time,
          difficulty: schema.recipe.difficulty,
          countryId: schema.recipe.countryId,
          servings: schema.recipe.servings,
          calories: schema.recipe.calories,
          videoUrl: schema.recipe.videoUrl,
          ingredients: schema.recipe.ingredients,
          instructions: schema.recipe.instructions,
          isFeatured: schema.recipe.isFeatured,
          createdAt: schema.recipe.createdAt,
          updatedAt: schema.recipe.updatedAt,
          countryName: schema.country.name,
        })
        .from(schema.recipe)
        .innerJoin(
          schema.country,
          eq(schema.recipe.countryId, schema.country.id)
        )
        .orderBy(desc(schema.recipe.createdAt))
        .limit(limit)
        .offset(offset);

      if (countrySlug) {
        query.where(eq(schema.country.slug, countrySlug));
      }

      return query;
    } catch {
      throw new Error("Failed to fetch recipes");
    }
  }
);

export const getFeaturedRecipes = cache(
  async (): Promise<RecipeWithCountry[]> => {
    try {
      const recipes = await db
        .select({
          id: schema.recipe.id,
          title: schema.recipe.title,
          slug: schema.recipe.slug,
          description: schema.recipe.description,
          image: schema.recipe.image,
          time: schema.recipe.time,
          difficulty: schema.recipe.difficulty,
          countryId: schema.recipe.countryId,
          servings: schema.recipe.servings,
          calories: schema.recipe.calories,
          videoUrl: schema.recipe.videoUrl,
          ingredients: schema.recipe.ingredients,
          instructions: schema.recipe.instructions,
          isFeatured: schema.recipe.isFeatured,
          createdAt: schema.recipe.createdAt,
          updatedAt: schema.recipe.updatedAt,
          countryName: schema.country.name,
        })
        .from(schema.recipe)
        .innerJoin(
          schema.country,
          eq(schema.recipe.countryId, schema.country.id)
        )
        .where(eq(schema.recipe.isFeatured, true))
        .orderBy(desc(schema.recipe.createdAt));

      return recipes;
    } catch {
      throw new Error("Failed to fetch featured recipes");
    }
  }
);

export const getRecipeBySlug = cache(
  async (slug: string): Promise<RecipeWithCountry | null> => {
    try {
      const results = await db
        .select({
          id: schema.recipe.id,
          title: schema.recipe.title,
          slug: schema.recipe.slug,
          description: schema.recipe.description,
          image: schema.recipe.image,
          time: schema.recipe.time,
          difficulty: schema.recipe.difficulty,
          countryId: schema.recipe.countryId,
          servings: schema.recipe.servings,
          calories: schema.recipe.calories,
          videoUrl: schema.recipe.videoUrl,
          ingredients: schema.recipe.ingredients,
          instructions: schema.recipe.instructions,
          isFeatured: schema.recipe.isFeatured,
          createdAt: schema.recipe.createdAt,
          updatedAt: schema.recipe.updatedAt,
          countryName: schema.country.name,
        })
        .from(schema.recipe)
        .innerJoin(
          schema.country,
          eq(schema.recipe.countryId, schema.country.id)
        )
        .where(eq(schema.recipe.slug, slug))
        .limit(1);

      if (results.length === 0) return null;

      return results[0];
    } catch {
      throw new Error("Failed to fetch recipe by slug");
    }
  }
);

export const getRecipesByCountry = cache(
  async (countrySlug: string): Promise<RecipeWithCountry[]> => {
    try {
      const recipes = await db
        .select({
          id: schema.recipe.id,
          title: schema.recipe.title,
          slug: schema.recipe.slug,
          description: schema.recipe.description,
          image: schema.recipe.image,
          time: schema.recipe.time,
          difficulty: schema.recipe.difficulty,
          countryId: schema.recipe.countryId,
          servings: schema.recipe.servings,
          calories: schema.recipe.calories,
          videoUrl: schema.recipe.videoUrl,
          ingredients: schema.recipe.ingredients,
          instructions: schema.recipe.instructions,
          isFeatured: schema.recipe.isFeatured,
          createdAt: schema.recipe.createdAt,
          updatedAt: schema.recipe.updatedAt,
          countryName: schema.country.name,
        })
        .from(schema.recipe)
        .innerJoin(
          schema.country,
          eq(schema.recipe.countryId, schema.country.id)
        )
        .where(eq(schema.country.slug, countrySlug))
        .orderBy(desc(schema.recipe.createdAt));

      return recipes;
    } catch {
      throw new Error("Failed to fetch recipes by country");
    }
  }
);

export const getRecipesBySearch = cache(
  async (search: string): Promise<RecipeWithCountry[]> => {
    try {
      const recipes = await db
        .select({
          id: schema.recipe.id,
          title: schema.recipe.title,
          slug: schema.recipe.slug,
          description: schema.recipe.description,
          image: schema.recipe.image,
          time: schema.recipe.time,
          difficulty: schema.recipe.difficulty,
          countryId: schema.recipe.countryId,
          servings: schema.recipe.servings,
          calories: schema.recipe.calories,
          videoUrl: schema.recipe.videoUrl,
          ingredients: schema.recipe.ingredients,
          instructions: schema.recipe.instructions,
          isFeatured: schema.recipe.isFeatured,
          createdAt: schema.recipe.createdAt,
          updatedAt: schema.recipe.updatedAt,
          countryName: schema.country.name,
        })
        .from(schema.recipe)
        .innerJoin(
          schema.country,
          eq(schema.recipe.countryId, schema.country.id)
        )
        .where(ilike(schema.recipe.title, `%${search}%`));

      return recipes;
    } catch {
      throw new Error("Failed to fetch recipes by search");
    }
  }
);

export const getRecipesCount = async (
  countrySlug?: string
): Promise<number> => {
  try {
    const query = db.select({ count: count() }).from(schema.recipe);

    if (countrySlug) {
      query
        .innerJoin(
          schema.country,
          eq(schema.recipe.countryId, schema.country.id)
        )
        .where(eq(schema.country.slug, countrySlug));
    }
    const result = await query;
    return result[0].count || 0;
  } catch {
    throw new Error("Failed to fetch recipes count");
  }
};

export const getUserLikedRecipes = cache(
  async (userId: string): Promise<string[] | null> => {
    try {
      const likes = await db
        .select({ recipeId: schema.likes.recipeId })
        .from(schema.likes)
        .where(eq(schema.likes.userId, userId));

      return likes.map((like) => like.recipeId);
    } catch {
      throw new Error("Failed to fetch user liked recipes");
    }
  }
);

export const getFavoriteRecipes = cache(
  async (userId: string): Promise<RecipeWithCountry[]> => {
    try {
      const recipes = await db
        .select({
          id: schema.recipe.id,
          title: schema.recipe.title,
          slug: schema.recipe.slug,
          description: schema.recipe.description,
          image: schema.recipe.image,
          time: schema.recipe.time,
          difficulty: schema.recipe.difficulty,
          countryId: schema.recipe.countryId,
          servings: schema.recipe.servings,
          calories: schema.recipe.calories,
          videoUrl: schema.recipe.videoUrl,
          ingredients: schema.recipe.ingredients,
          instructions: schema.recipe.instructions,
          isFeatured: schema.recipe.isFeatured,
          createdAt: schema.recipe.createdAt,
          updatedAt: schema.recipe.updatedAt,
          countryName: schema.country.name,
        })
        .from(schema.recipe)
        .innerJoin(schema.likes, eq(schema.recipe.id, schema.likes.recipeId))
        .innerJoin(
          schema.country,
          eq(schema.recipe.countryId, schema.country.id)
        )
        .where(eq(schema.likes.userId, userId));

      return recipes;
    } catch {
      throw new Error("Failed to fetch favorite recipes");
    }
  }
);

export const getReviewsByRecipeId = cache(
  async (recipeId: string): Promise<ReviewWithUserName[]> => {
    try {
      const reviews = await db
        .select({
          id: schema.reviews.id,
          userId: schema.reviews.userId,
          userName: schema.user.name,
          recipeId: schema.reviews.recipeId,
          rating: schema.reviews.rating,

          comment: schema.reviews.comment,
          createdAt: schema.reviews.createdAt,
        })
        .from(schema.reviews)
        .innerJoin(schema.user, eq(schema.reviews.userId, schema.user.id))
        .where(eq(schema.reviews.recipeId, recipeId));

      return reviews;
    } catch {
      throw new Error("Failed to fetch reviews by recipe id");
    }
  }
);
