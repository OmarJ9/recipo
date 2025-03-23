"use client";

import RecipeCard from "@/components/recipes/recipe-card";
import { RecipeWithCountry } from "@/types/recipe";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, FilterX } from "lucide-react";
import { useRecipeFiltering } from "@/hooks/use-recipe-filter";

interface RecipesListProps {
  initialRecipes: RecipeWithCountry[];
  isFavoritePage?: boolean;
}

export default function RecipesList({
  initialRecipes,
  isFavoritePage,
}: RecipesListProps) {
  const {
    search,
    setSearch,
    countryFilter,
    setCountryFilter,
    difficultyFilter,
    setDifficultyFilter,
    countries,
    difficultyLevels,
    filteredRecipes,
    debouncedSearch,
    resetFilters,
    hasActiveFilters,
  } = useRecipeFiltering(initialRecipes);

  const handleSearchChange = (query: string) => {
    setSearch(query);
    debouncedSearch(query);
  };

  return (
    <div className="space-y-6">
      {/* Search and filter bar */}
      {!isFavoritePage && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                className="pl-10 pr-4"
                placeholder="Search recipes by name..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>

            <Select value={countryFilter} onValueChange={setCountryFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={difficultyFilter}
              onValueChange={setDifficultyFilter}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                {difficultyLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={resetFilters}
                className="md:self-start flex gap-2 items-center"
              >
                <FilterX className="h-4 w-4" />
                Clear filters
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Results count */}
      {filteredRecipes.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-600">
            No recipes found
          </h3>
          <p className="text-gray-500 mt-1">
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500">
            Showing {filteredRecipes.length}{" "}
            {filteredRecipes.length === 1 ? "recipe" : "recipes"}
          </p>

          {/* Recipe grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                isLiked={isFavoritePage ?? false}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function RecipesListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 9 }).map((_, index) => (
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
  );
}
