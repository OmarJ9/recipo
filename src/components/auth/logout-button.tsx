"use client";
import { signOut } from "@/actions/auth";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";

function SignOutButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="cursor-pointer"
      variant="destructive"
    >
      {pending ? "Signing out..." : "Sign out"}
    </Button>
  );
}

export function LogoutButton() {
  return (
    <form action={signOut}>
      <SignOutButton />
    </form>
  );
}
