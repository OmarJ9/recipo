import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "../ui/table";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import { RecipeWithCountry } from "@/types/recipe";
import Link from "next/link";
import { DeleteButton } from "./delete-button";

export default function RecipeTable({
  recipes,
}: {
  recipes: RecipeWithCountry[];
}) {
  return (
    <div className="rounded-md border shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow className="hover:bg-muted/60">
            <TableHead className="font-semibold">Title</TableHead>
            <TableHead className="font-semibold">Country</TableHead>
            <TableHead className="font-semibold">Cooking Time</TableHead>
            <TableHead className="font-semibold">Servings</TableHead>
            <TableHead className="font-semibold">Difficulty</TableHead>
            <TableHead className="font-semibold text-right w-24">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recipes.map((recipe) => (
            <TableRow
              key={recipe.id}
              className="border-t hover:bg-muted/20 transition-colors"
            >
              <TableCell className="font-medium">{recipe.title}</TableCell>
              <TableCell>{recipe.countryName}</TableCell>
              <TableCell>{recipe.time}</TableCell>
              <TableCell>{recipe.servings}</TableCell>
              <TableCell>{recipe.difficulty}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Link href={`/admin/recipes/edit/${recipe.slug}`}>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 hover:bg-muted"
                      aria-label="Edit recipe"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Link>
                  <DeleteButton entityType="recipe" entityId={recipe.id} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
