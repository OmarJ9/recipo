"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import RecipeCard from "@/components/recipes/recipe-card";
import { motion } from "framer-motion";
import { RecipeWithCountry } from "@/types/recipe";
import { Skeleton } from "@/components/ui/skeleton";

interface FeaturedRecipesProps {
  recipes: RecipeWithCountry[];
  userLikedRecipes: string[] | null;
}

export function FeaturedRecipes({
  recipes,
  userLikedRecipes,
}: FeaturedRecipesProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          Featured Recipes
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="h-full"
            >
              <RecipeCard
                recipe={recipe}
                isLiked={userLikedRecipes?.includes(recipe.id) ?? false}
              />
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button variant="outline" size="lg" asChild>
            <Link href="/recipes">View All Recipes</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function FeaturedRecipesSkeleton() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Featured Recipes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col rounded-2xl overflow-hidden border border-gray-100"
            >
              <Skeleton className="h-52 w-full" />
              <div className="p-5">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mb-4" />
                <div className="flex justify-between mt-4">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Skeleton className="h-10 w-[150px] mx-auto" />
        </div>
      </div>
    </section>
  );
}
