import { HeroSection } from "@/components/home/hero-section";
import {
  PopularCuisines,
  PopularCuisinesSkeleton,
} from "@/components/home/popular-cuisines";
import {
  FeaturedRecipes,
  FeaturedRecipesSkeleton,
} from "@/components/home/featured-recipes";
import { Newsletter } from "@/components/home/newsletter";

import {
  getFeaturedRecipes,
  getPopularCuisines,
  getUserLikedRecipes,
} from "@/database/queries";
import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

async function PopularCuisinesSection() {
  const popularCuisines = await getPopularCuisines();
  return <PopularCuisines popularCuisines={popularCuisines} />;
}

async function FeaturedRecipesSection() {
  const featuredRecipes = await getFeaturedRecipes();
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  const userLikedRecipes = user ? await getUserLikedRecipes(user.id) : null;

  return (
    <FeaturedRecipes
      recipes={featuredRecipes}
      userLikedRecipes={userLikedRecipes}
    />
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />
      <div className="px-4 md:px-16">
        <Suspense fallback={<PopularCuisinesSkeleton />}>
          <PopularCuisinesSection />
        </Suspense>

        <Suspense fallback={<FeaturedRecipesSkeleton />}>
          <FeaturedRecipesSection />
        </Suspense>
      </div>
      <Newsletter />
    </div>
  );
}
