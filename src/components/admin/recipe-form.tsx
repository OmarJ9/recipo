"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { type Country, type Recipe } from "@/types/recipe";
import { createRecipe, updateRecipe } from "@/actions/recipe";
import { RecipeInsertSchema, type RecipeInsert } from "@/lib/zod-schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface RecipeFormProps {
  countries: Country[];
  recipe?: Recipe;
}

export function RecipeForm({ countries, recipe }: RecipeFormProps) {
  const router = useRouter();
  const [ingredients, setIngredients] = useState<string[]>(
    (recipe?.ingredients as string[]) || [""]
  );
  const [instructions, setInstructions] = useState<string[]>(
    (recipe?.instructions as string[]) || [""]
  );

  // Default values for the form
  const defaultValues: Partial<RecipeInsert> = {
    id: recipe?.id || "",
    title: recipe?.title || "",
    description: recipe?.description || "",
    image: recipe?.image || "",
    time: recipe?.time || "",
    difficulty: recipe?.difficulty || "medium",
    countryId: recipe?.countryId || "",
    servings: recipe?.servings || 1,
    calories: recipe?.calories || undefined,
    videoUrl: recipe?.videoUrl || "",
    ingredients: (recipe?.ingredients as string[]) || [],
    instructions: (recipe?.instructions as string[]) || [],
    isFeatured: recipe?.isFeatured || false,
    slug: recipe?.slug || "",
  };

  const form = useForm<RecipeInsert>({
    resolver: zodResolver(RecipeInsertSchema),
    defaultValues,
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(data: RecipeInsert) {
    try {
      if (recipe) {
        // Update existing recipe
        await updateRecipe({
          ...data,
        });
        toast.success("Recipe updated successfully");
      } else {
        // Create new recipe
        await createRecipe(data);
        toast.success("Recipe created successfully");
      }

      router.back();
    } catch (error) {
      console.error("Error saving recipe:", error);
      toast.error("Failed to save recipe");
    }
  }

  function addIngredient() {
    setIngredients([...ingredients, ""]);
  }

  function updateIngredient(index: number, value: string) {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
    form.setValue("ingredients", updatedIngredients.filter(Boolean));
  }

  function removeIngredient(index: number) {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
    form.setValue("ingredients", updatedIngredients.filter(Boolean));
  }

  function addInstruction() {
    setInstructions([...instructions, ""]);
  }

  function updateInstruction(index: number, value: string) {
    const updatedInstructions = [...instructions];
    updatedInstructions[index] = value;
    setInstructions(updatedInstructions);
    form.setValue("instructions", updatedInstructions.filter(Boolean));
  }

  function removeInstruction(index: number) {
    const updatedInstructions = instructions.filter((_, i) => i !== index);
    setInstructions(updatedInstructions);
    form.setValue("instructions", updatedInstructions.filter(Boolean));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Recipe Details</CardTitle>
            <CardDescription>
              Enter the basic information about your recipe
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-12 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="col-span-10">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Delicious recipe name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="countryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.id} value={country.id}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-12 ">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief description of the recipe"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Media</CardTitle>
              <CardDescription>
                Add photos and videos for your recipe
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/image.jpg"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>URL to the recipe image</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="videoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>YouTube Video URL (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the full URL of the YouTube video
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cook Details</CardTitle>
              <CardDescription>
                Information about cooking and nutritional values
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Cooking Time</FormLabel>
                      <FormControl>
                        <Input placeholder="30 minutes" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="difficulty"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Difficulty</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="servings"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Servings</FormLabel>
                      <FormControl>
                        <Input type="number" min={1} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="calories"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Calories (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          placeholder="Calories per serving"
                          {...field}
                          value={field.value || ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(
                              value === "" ? undefined : parseInt(value, 10)
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Featured Recipe</FormLabel>
                      <FormDescription>
                        Show this recipe on the homepage
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Ingredients</CardTitle>
            <CardDescription>
              List all ingredients needed for this recipe
            </CardDescription>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addIngredient}
              className="w-full md:w-auto mt-2"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Ingredient
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={ingredient}
                  onChange={(e) => updateIngredient(index, e.target.value)}
                  placeholder={`Ingredient ${index + 1}`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeIngredient(index)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {form.formState.errors.ingredients && (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.ingredients.message}
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
            <CardDescription>Step-by-step cooking instructions</CardDescription>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addInstruction}
              className="w-full md:w-auto mt-2"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Step
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {instructions.map((instruction, index) => (
              <div key={index} className="flex items-center gap-2">
                <Textarea
                  value={instruction}
                  onChange={(e) => updateInstruction(index, e.target.value)}
                  placeholder={`Step ${index + 1}`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeInstruction(index)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {form.formState.errors.instructions && (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.instructions.message}
              </p>
            )}
          </CardContent>
        </Card>

        <Button type="submit" disabled={isLoading} className="ml-auto">
          {recipe ? "Update Recipe" : "Create Recipe"}
        </Button>
      </form>
    </Form>
  );
}
