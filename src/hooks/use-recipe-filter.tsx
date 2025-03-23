import { useState } from "react";
import { RecipeWithCountry } from "@/types/recipe";

export function useRecipeFiltering(initialRecipes: RecipeWithCountry[]) {
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [recipes, setRecipes] = useState<RecipeWithCountry[]>(
    initialRecipes || []
  );

  // Get unique countries from recipes
  const countries = Array.from(
    new Set(initialRecipes?.map((recipe) => recipe.countryName) || [])
  ).sort();

  // Difficulty levels
  const difficultyLevels = ["easy", "medium", "hard"];

  // Handle search input change
  const handleSearch = async (query: string) => {
    setSearch(query);

    if (query === "") {
      setRecipes(initialRecipes || []);
      return;
    }

    try {
      const res = await fetch(`/api/recipes/search?query=${query}`);
      const data = await res.json();
      setRecipes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setRecipes([]);
    }
  };

  // Debounced search handler
  const debouncedSearch = (query: string) => {
    const delay = setTimeout(() => handleSearch(query), 300);
    return () => clearTimeout(delay);
  };

  // Filter recipes client-side
  const filteredRecipes = recipes.filter((recipe) => {
    // Filter by country if selected
    if (countryFilter && recipe.countryName !== countryFilter) return false;

    // Filter by difficulty if selected
    if (difficultyFilter && recipe.difficulty !== difficultyFilter)
      return false;

    return true;
  });

  // Reset all filters
  const resetFilters = () => {
    setCountryFilter("");
    setDifficultyFilter("");
    setSearch("");
    setRecipes(initialRecipes || []);
  };

  // Check if any filters are active
  const hasActiveFilters = countryFilter || difficultyFilter || search;

  return {
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
  };
}
