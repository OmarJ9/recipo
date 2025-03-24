"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CountryFormDialog } from "@/components/admin/country-form-dialog";
import { type Country } from "@/types/recipe";

export function AddCountryButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Add Country</Button>
      <CountryFormDialog open={open} onOpenChange={setOpen} />
    </>
  );
}

export function EditCountryButton({ country }: { country: Country }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        Edit
      </Button>
      <CountryFormDialog open={open} onOpenChange={setOpen} country={country} />
    </>
  );
}
