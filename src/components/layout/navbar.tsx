"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChefHat } from "lucide-react";
import { LogoutButton } from "../auth/logout-button";
import { Button } from "../ui/button";

export function Navbar({
  isLoggedIn,
  isAdmin,
}: {
  isLoggedIn: boolean;
  isAdmin: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Define routes based on authentication status
  const baseRoutes = [
    { href: "/", label: "Home" },
    { href: "/recipes", label: "Recipes" },
  ];

  // Add favorites route only if user is logged in
  const routes = isLoggedIn
    ? [...baseRoutes, { href: "/recipes/favorites", label: "Favorites" }]
    : baseRoutes;

  const isActive = (path: string) => {
    return pathname === path;
  };
  const isLoginPath = pathname === "/login";

  return (
    <header className="sticky px-16 top-0 z-50 w-full border-b bg-amber-50 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <ChefHat className="h-6 w-6 text-amber-600" />
          <span>Recipo</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`text-sm font-medium transition-colors hover:text-amber-600 ${
                isActive(route.href) ? "text-amber-600" : "text-foreground/80"
              }`}
            >
              {route.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              href="/admin"
              className="text-sm font-medium transition-colors hover:text-amber-600"
            >
              <Button variant="default" className=" cursor-pointer">
                Admin Panel
              </Button>
            </Link>
          )}
          {isLoggedIn ? (
            <LogoutButton />
          ) : (
            !isLoginPath && (
              <Link
                href="/login"
                className="bg-amber-600 text-white hover:bg-amber-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Login
              </Link>
            )
          )}
        </nav>

        {/* Mobile navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <button className="flex h-10 w-10 items-center justify-center rounded-md">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[80%] sm:w-[350px]">
            <div className="flex flex-col space-y-6 pt-6">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-base font-medium transition-colors hover:text-amber-600 ${
                    isActive(route.href)
                      ? "text-amber-600"
                      : "text-foreground/80"
                  }`}
                >
                  {route.label}
                </Link>
              ))}
              {isLoggedIn ? (
                <LogoutButton />
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="bg-amber-600 text-white hover:bg-amber-700 px-4 py-2 rounded-md text-sm font-medium transition-colors w-full text-center"
                >
                  Login
                </Link>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
