import RecipesHeader from "@/components/recipes/recipes-header";
import RecipesList, {
  RecipesListSkeleton,
} from "@/components/recipes/recipes-list";
import RecipesPagination from "@/components/recipes/recipes-pagination";
import { getAllRecipes, getRecipesCount } from "@/database/queries";
import { Suspense } from "react";

const RECIPES_PER_PAGE = 12;

async function RecipesListSection({
  page,
  countrySlug,
}: {
  page: number;
  countrySlug?: string;
}) {
  const recipes = await getAllRecipes({
    limit: RECIPES_PER_PAGE,
    offset: (page - 1) * RECIPES_PER_PAGE,
    countrySlug,
  });

  if (recipes.length === 0) {
    return <div className="text-center text-gray-500">No recipes found.</div>;
  }

  return <RecipesList initialRecipes={recipes} />;
}

async function PaginationSection({
  currentPage,
  countrySlug,
}: {
  currentPage: number;
  countrySlug?: string;
}) {
  const totalRecipes = await getRecipesCount(countrySlug);

  const totalPages = Math.ceil(totalRecipes / RECIPES_PER_PAGE);

  return (
    totalPages > 1 && (
      <RecipesPagination
        currentPage={currentPage}
        totalPages={totalPages}
        baseUrl="/recipes"
      />
    )
  );
}

export default async function RecipesPage({
  searchParams,
}: {
  searchParams?: Promise<{
    page?: string;
    countrySlug?: string;
  }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;
  const countrySlug = params?.countrySlug;

  return (
    <div className="min-h-screen bg-gray-50 px-12 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <RecipesHeader countrySlug={countrySlug} />
        </div>

        <Suspense fallback={<RecipesListSkeleton />}>
          <RecipesListSection page={currentPage} countrySlug={countrySlug} />
        </Suspense>

        <Suspense fallback={<div className="mt-12 h-9" />}>
          <PaginationSection
            currentPage={currentPage}
            countrySlug={countrySlug}
          />
        </Suspense>
      </div>
    </div>
  );
}
