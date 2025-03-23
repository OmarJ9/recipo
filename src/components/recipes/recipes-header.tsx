"use client";
import { useRouter } from "next/navigation";
import BackButton from "./back-button";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export default function RecipesHeader({
  countrySlug,
}: {
  countrySlug?: string;
}) {
  const router = useRouter();

  const handleViewAllRecipes = () => {
    router.push("/recipes");
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-4">
      <div>
        <BackButton title="Home" href="/" />
        <h1 className="text-3xl font-bold">
          {countrySlug
            ? `All ${
                countrySlug.charAt(0).toUpperCase() + countrySlug.slice(1)
              } Recipes`
            : "All Recipes"}
        </h1>
      </div>

      {countrySlug && (
        <Button
          onClick={handleViewAllRecipes}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Globe className="h-4 w-4" />
          View All Recipes
        </Button>
      )}
    </div>
  );
}
