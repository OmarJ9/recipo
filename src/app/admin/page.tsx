import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminDashboard() {
  return (
    <div className="container py-10 px-16">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Recipes</CardTitle>
            <CardDescription>Manage all recipes</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Add or update recipes and their information
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/admin/recipes" className="w-full">
              <Button className="w-full">Manage Recipes</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Countries</CardTitle>
            <CardDescription>Manage country entries</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Add or update countries and their information
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/admin/countries" className="w-full">
              <Button className="w-full">Manage Countries</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>User management</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              View and manage user accounts and permissions
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/admin/users" className="w-full">
              <Button className="w-full">Manage Users</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
