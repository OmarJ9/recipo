import { NextResponse } from "next/server";
import { getRecipesBySearch } from "@/database/queries";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { error: "Search query is required" },
      { status: 400 }
    );
  }

  try {
    const recipes = await getRecipesBySearch(query);
    return NextResponse.json(recipes);
  } catch (error) {
    console.error("Failed to fetch recipes by search:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipes by search" },
      { status: 500 }
    );
  }
}
