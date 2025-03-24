import BackButton from "@/components/recipes/back-button";
import { RecipeForm } from "@/components/admin/recipe-form";
import { getPopularCuisines } from "@/database/queries";
import { Suspense } from "react";
import { CircularProgress } from "@/components/ui/circular-progress";

async function RecipeFormSection() {
  const countries = await getPopularCuisines();

  return <RecipeForm countries={countries} />;
}

export default async function NewRecipePage() {
  return (
    <div className="container py-10 px-20">
      <div className="mb-8">
        <BackButton title="Back to Recipes" />
        <h1 className="text-3xl font-bold">Create New Recipe</h1>
        <p className="text-muted-foreground mt-2">
          Fill in the details to add a new recipe to the collection
        </p>
      </div>

      <Suspense fallback={<CircularProgress />}>
        <RecipeFormSection />
      </Suspense>
    </div>
  );
}
