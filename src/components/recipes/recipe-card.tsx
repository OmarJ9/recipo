"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, ChefHat, Globe, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { RecipeWithCountry } from "@/types/recipe";
import { useOptimistic, startTransition } from "react";
import { likeRecipe } from "@/actions/recipe";
import { Button } from "../ui/button";

export default function RecipeCard({
  recipe,
  isLiked,
}: {
  recipe: RecipeWithCountry;
  isLiked: boolean;
}) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800/30";
      case "medium":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800/30";
      case "hard":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800/30";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700";
    }
  };

  const [optimisticLike, setOptimisticLike] = useOptimistic(isLiked);

  async function handleLike(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    startTransition(() => {
      setOptimisticLike((prev) => !prev);
    });

    await likeRecipe(recipe.id);
  }

  return (
    <div className="group bg-white dark:bg-gray-800/80 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700/50 hover:border-amber-200 dark:hover:border-amber-700/70 hover:-translate-y-1 duration-300 flex flex-col h-[380px]">
      <Link href={`/recipes/${recipe.slug}`} className="flex flex-col h-full">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={recipe.image || ""}
            alt={recipe.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/5 to-black/40 group-hover:from-black/30 group-hover:to-black/50 transition-all duration-300"></div>

          {/* Country badge */}
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full">
            <Globe className="h-3 w-3 text-amber-400" />
            <span className="text-xs font-medium text-white">
              {recipe.countryName}
            </span>
          </div>

          {/* Like button */}
          <Button
            onClick={handleLike}
            className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/70 p-0"
            size="icon"
            variant="ghost"
          >
            <Heart
              className={`h-3.5 w-3.5 ${
                optimisticLike ? "text-red-500 fill-red-500" : "text-white"
              }`}
            />
          </Button>
        </div>

        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-base font-semibold mb-1.5 group-hover:text-amber-600 transition-colors line-clamp-1">
            {recipe.title}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2 flex-1">
            {recipe.description}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Clock className="h-3 w-3 mr-1 text-amber-500" />
              <span>{recipe.time}</span>
            </div>

            <Badge
              variant="outline"
              className={`flex items-center gap-1 text-xs py-0.5 px-2 ${getDifficultyColor(
                recipe.difficulty
              )}`}
            >
              <ChefHat className="h-2.5 w-2.5" />
              {recipe.difficulty}
            </Badge>
          </div>
        </div>
      </Link>
    </div>
  );
}
