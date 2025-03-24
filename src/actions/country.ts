"use server";
import { eq } from "drizzle-orm";
import { db } from "@/database/drizzle";
import { CountryInsert, CountryInsertSchema } from "@/lib/zod-schema";
import * as schema from "@/database/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function createCountry(input: CountryInsert): Promise<{
  success?: string;
  error?: string;
}> {
  try {
    const validatedData = CountryInsertSchema.safeParse(input);

    if (!validatedData.success) {
      return {
        error: validatedData.error.message,
      };
    }

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.session && session?.user?.role !== "admin") {
      return {
        error: "Unauthorized. You must be an admin to perform this action.",
      };
    }

    await db.insert(schema.country).values({
      id: uuidv4(),
      name: validatedData.data.name,
      slug: slugify(validatedData.data.name),
      flagImage: validatedData.data.flagImage,
    });

    revalidatePath("/admin/countries");
    return { success: "Country created successfully" };
  } catch (error) {
    console.error("Create country error:", error);
    return { error: "Failed to create country" };
  }
}

export async function updateCountry(input: CountryInsert): Promise<{
  success?: string;
  error?: string;
}> {
  try {
    const validatedData = CountryInsertSchema.safeParse(input);

    if (!validatedData.success) {
      return {
        error: validatedData.error.message,
      };
    }

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.session && session?.user?.role !== "admin") {
      return {
        error: "Unauthorized. You must be an admin to perform this action.",
      };
    }

    await db
      .update(schema.country)
      .set({
        name: validatedData.data.name,
        slug: slugify(validatedData.data.name),
        flagImage: validatedData.data.flagImage,
      })
      .where(eq(schema.country.id, validatedData.data.id));

    revalidatePath("/admin/countries");
    return { success: "Country updated successfully" };
  } catch (error) {
    console.error("Update country error:", error);
    return { error: "Failed to update country" };
  }
}

export async function deleteCountry(id: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.session && session?.user?.role !== "admin") {
      return {
        error: "Unauthorized. You must be an admin to perform this action.",
      };
    }

    await db.delete(schema.country).where(eq(schema.country.id, id));
    revalidatePath("/admin/countries");
    return { success: "Country deleted successfully" };
  } catch (error) {
    console.error("Delete country error:", error);
    return { error: "Failed to delete country" };
  }
}
