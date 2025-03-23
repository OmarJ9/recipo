import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getFavoriteRecipes } from "@/database/queries";
import { Suspense } from "react";
import BackButton from "@/components/recipes/back-button";
import RecipeList, {
  RecipesListSkeleton,
} from "@/components/recipes/recipes-list";
async function FavoriteRecipesSection() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (!user) {
    redirect("/");
  }

  const recipes = await getFavoriteRecipes(user.id);

  if (recipes.length === 0) {
    return (
      <div className="text-center text-gray-500">No favorite recipes yet.</div>
    );
  }

  return <RecipeList initialRecipes={recipes} isFavoritePage={true} />;
}

export default async function Favorites() {
  return (
    <div className="min-h-screen bg-gray-50 px-12 py-12">
      <BackButton title="Home" />
      <h1 className="text-2xl font-bold mb-8">Favorites Recipes</h1>
      <Suspense fallback={<RecipesListSkeleton />}>
        <FavoriteRecipesSection />
      </Suspense>
    </div>
  );
}
