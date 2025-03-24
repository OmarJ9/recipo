import { useState } from "react";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export function RoleButton({
  userId,
  currentRole,
  onSuccess,
}: {
  userId: string;
  currentRole: string;
  onSuccess?: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(currentRole);

  const makeAdmin = async () => {
    setLoading(true);
    try {
      const session = await authClient.getSession();
      if (!session) {
        throw new Error("User not found");
      } else if (session.data?.user.role !== "admin") {
        throw new Error("You are not authorized to switch roles");
      } else if (session.data?.user.id === userId) {
        throw new Error("You cannot switch roles for yourself");
      }
      await authClient.admin.setRole({
        userId,
        role: role === "admin" ? "user" : "admin",
      });
      setRole(role === "admin" ? "user" : "admin");
      setLoading(false);
      toast.success("Role switched successfully");
      onSuccess?.();
    } catch (error) {
      toast.error(
        `Failed to switch role! ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={() => {
        makeAdmin();
      }}
      className="w-30"
      size="sm"
    >
      {loading
        ? "Switching..."
        : role === "admin"
        ? "Remove Admin"
        : "Make Admin"}
    </Button>
  );
}
