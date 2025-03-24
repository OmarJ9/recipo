import BackButton from "@/components/recipes/back-button";
import UserTable from "@/components/admin/users-table";

export default async function UsersPage() {
  return (
    <div className="container max-w-6xl mx-auto py-12 px-4 md:px-8">
      <div className="mb-10">
        <BackButton title="Back to Admin" />
        <h1 className="text-3xl font-bold tracking-tight">All Users</h1>
        <p className="text-muted-foreground mt-2">
          Manage all users in the collection
        </p>
      </div>

      <UserTable />
    </div>
  );
}
