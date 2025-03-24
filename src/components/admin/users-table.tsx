"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "../ui/table";
import { DeleteButton } from "./delete-button";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { UserWithRole } from "better-auth/plugins";
import { CircularProgress } from "@/components/ui/circular-progress";
import { Badge } from "@/components/ui/badge";
import { RoleButton } from "./role-button";

export default function UserTable() {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refetch, setRefetch] = useState(false);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await authClient.admin.listUsers({
          query: { limit: 100, sortBy: "role" },
        });
        setUsers(response.data?.users || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [refetch]);

  if (loading) {
    return <CircularProgress />;
  }

  if (users.length === 0) {
    return <div>No users found</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="rounded-md border shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow className="hover:bg-muted/60">
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="font-semibold">Email</TableHead>
            <TableHead className="font-semibold">Role</TableHead>
            <TableHead className="font-semibold">Created At</TableHead>

            <TableHead className="font-semibold text-right w-24">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              className="border-t hover:bg-muted/20 transition-colors"
            >
              <TableCell>{user.name || "Unknown"}</TableCell>
              <TableCell className="w-fit">{user.email}</TableCell>
              <TableCell>
                <Badge
                  variant={user.role === "admin" ? "default" : "secondary"}
                >
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>{user.createdAt.toLocaleString()}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <RoleButton
                    userId={user.id}
                    currentRole={user.role || ""}
                    onSuccess={() => {
                      setRefetch(!refetch);
                    }}
                  />
                  <DeleteButton entityType="user" entityId={user.id} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
