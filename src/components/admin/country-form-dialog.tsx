"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { type Country } from "@/types/recipe";
import { CountryInsert, CountryInsertSchema } from "@/lib/zod-schema";
import { createCountry, updateCountry } from "@/actions/country";

interface CountryFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  country?: Country;
}

export function CountryFormDialog({
  open,
  onOpenChange,
  country,
}: CountryFormDialogProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CountryInsert>({
    resolver: zodResolver(CountryInsertSchema),
    defaultValues: {
      id: country?.id || "",
      name: country?.name || "",
      slug: country?.slug || "",
      flagImage: country?.flagImage || "",
    },
  });

  const handleClose = () => {
    form.reset();
    onOpenChange(false);
  };

  async function onSubmit(data: CountryInsert) {
    try {
      setIsLoading(true);

      const result = country
        ? await updateCountry(data)
        : await createCountry(data);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success(
        result.success || (country ? "Country updated" : "Country created")
      );
      handleClose();
      router.refresh();
    } catch (error) {
      console.error("Error saving country:", error);
      toast.error(typeof error === "string" ? error : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{country ? "Edit Country" : "Add Country"}</DialogTitle>
          <DialogDescription>
            {country
              ? "Update country details"
              : "Add a new country to the system"}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter country name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="flagImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Flag Image URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/flag.png"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading
                  ? "Saving..."
                  : country
                  ? "Update Country"
                  : "Add Country"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
