import Image from "next/image";
import { Globe, ChefHat, Clock, Utensils, Flame } from "lucide-react";
import { RecipeWithCountry } from "@/types/recipe";

interface RecipeHeaderProps {
  recipe: RecipeWithCountry;
}

export default function RecipeHeader({ recipe }: RecipeHeaderProps) {
  return (
    <div className="flex flex-col space-y-6">
      <div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
        <Image
          src={recipe.image || ""}
          alt={recipe.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8 text-white space-y-2">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-amber-400" />
            <span className="text-sm font-medium">{recipe.countryName}</span>
          </div>
          <h1 className="text-4xl font-bold">{recipe.title}</h1>
          <p className="text-lg text-gray-200 max-w-2xl">
            {recipe.description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="flex items-center gap-2 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <Clock className="h-5 w-5 text-amber-500" />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Cooking Time
            </p>
            <p className="font-medium">{recipe.time}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <ChefHat className="h-5 w-5 text-amber-500" />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Difficulty
            </p>
            <p className="font-medium capitalize">{recipe.difficulty}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <Utensils className="h-5 w-5 text-amber-500" />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Servings</p>
            <p className="font-medium">{recipe.servings} people</p>
          </div>
        </div>

        <div className="flex items-center gap-2 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <Flame className="h-5 w-5 text-amber-500" />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Calories</p>
            <p className="font-medium">{recipe.calories || "N/A"} kcal</p>
          </div>
        </div>
      </div>
    </div>
  );
}
