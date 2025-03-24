import { notFound } from "next/navigation";
import BackButton from "@/components/recipes/back-button";
import { RecipeForm } from "@/components/admin/recipe-form";
import { getPopularCuisines } from "@/database/queries";
import { getRecipeBySlug } from "@/database/queries";
import { Suspense } from "react";
import { CircularProgress } from "@/components/ui/circular-progress";

interface EditRecipePageProps {
  params: Promise<{ id: string }>;
}

async function RecipeFormSection({ id }: { id: string }) {
  const countries = await getPopularCuisines();
  const recipe = await getRecipeBySlug(id);

  if (!recipe) {
    notFound();
  }

  return <RecipeForm countries={countries} recipe={recipe} />;
}

export default async function EditRecipePage({ params }: EditRecipePageProps) {
  const { id } = await params;

  return (
    <div className="container py-10 px-20">
      <div className="mb-8">
        <BackButton title="Back to Recipes" />
        <h1 className="text-3xl font-bold">Edit Recipe</h1>
        <p className="text-muted-foreground mt-2">
          Update the details of Recipe
        </p>
      </div>

      <Suspense fallback={<CircularProgress />}>
        <RecipeFormSection id={id} />
      </Suspense>
    </div>
  );
}
