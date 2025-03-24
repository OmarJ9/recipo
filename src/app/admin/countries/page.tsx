import { getPopularCuisines } from "@/database/queries";
import { Suspense } from "react";
import BackButton from "@/components/recipes/back-button";
import { CircularProgress } from "@/components/ui/circular-progress";
import CountryTable from "@/components/admin/country-table";
import { AddCountryButton } from "@/components/admin/country-actions";

async function CountryTableSection() {
  const countries = await getPopularCuisines();
  return <CountryTable countries={countries} />;
}

export default async function CountriesPage() {
  return (
    <div className="container max-w-6xl mx-auto py-12 px-4 md:px-8">
      <div className="mb-10">
        <BackButton title="Back to Admin" />
        <h1 className="text-3xl font-bold tracking-tight">All Countries</h1>
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground mt-2">
            Manage all countries in the collection
          </p>
          <AddCountryButton />
        </div>
      </div>
      <Suspense fallback={<CircularProgress />}>
        <CountryTableSection />
      </Suspense>
    </div>
  );
}
