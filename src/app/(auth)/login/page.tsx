import { ChefHat } from "lucide-react";
import Link from "next/link";

import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="bg-gradient-to-b from-amber-50 to-white flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white flex size-8 items-center justify-center rounded-md shadow-sm">
            <ChefHat className="size-5" />
          </div>
          <span className="text-xl font-bold">Recipo</span>
        </Link>
        <LoginForm />
      </div>
    </div>
  );
}
