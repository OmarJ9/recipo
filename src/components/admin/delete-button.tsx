"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Trash2, AlertTriangle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { toast } from "sonner";
import { deleteCountry } from "@/actions/country";
import { deleteRecipe } from "@/actions/recipe";
import { authClient } from "@/lib/auth-client";
interface DeleteButtonProps {
  entityType: string;
  entityId: string;
}

export function DeleteButton({ entityType, entityId }: DeleteButtonProps) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteUser = async () => {
    const session = await authClient.getSession();
    if (!session) {
      throw new Error("User not found");
    }

    if (session.data?.user.role !== "admin") {
      throw new Error("You are not authorized to delete this user");
    }

    if (session.data?.user.id === entityId) {
      throw new Error("You cannot delete yourself");
    }

    await authClient.admin.removeUser({
      userId: entityId,
    });
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      if (entityType === "country") {
        await deleteCountry(entityId);
      } else if (entityType === "recipe") {
        await deleteRecipe(entityId);
      } else if (entityType === "user") {
        await deleteUser();
      } else {
        throw new Error("Something went wrong!");
      }

      toast.success(`${entityType} deleted successfully`);
    } catch (error) {
      toast.error(
        `Failed to delete ${entityType}! ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsDeleting(false);
      setOpen(false);
    }
  };

  return (
    <>
      <Button
        variant="destructive"
        size="icon"
        className="size-8 text-white"
        aria-label={`Delete ${entityType}`}
        onClick={() => setOpen(true)}
      >
        <Trash2 className="size-4" />
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this {entityType}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the{" "}
              {entityType}.
            </AlertDialogDescription>
            {entityType === "country" && (
              <AlertDialogDescription className="flex items-center gap-2">
                <AlertTriangle className="size-4 text-destructive" />
                This will also delete all associated recipes.
              </AlertDialogDescription>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                handleDelete();
              }}
              disabled={isDeleting}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
