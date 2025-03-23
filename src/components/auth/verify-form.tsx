"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { signInOTP } from "@/actions/auth";
import { useFormStatus } from "react-dom";

function VerifyButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Verifying..." : "Verify"}
    </Button>
  );
}

export function VerifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleVerify = async (formData: FormData) => {
    formData.append("email", email);
    formData.append("otp", otp);

    const result = await signInOTP(formData);

    if (result.error) {
      setError(result.error);
      return;
    }

    router.push("/");
  };

  const handleResendCode = async () => {
    setError("");
    await new Promise((resolve) => setTimeout(resolve, 500));
    alert("A new verification code has been sent to your email");
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Verify your email</CardTitle>
        <CardDescription>
          {email ? (
            <>
              Enter the 6-digit code sent to{" "}
              <span className="font-medium">{email}</span>
            </>
          ) : (
            <>Enter the 6-digit code sent to your email</>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleVerify}>
          <div className="flex flex-col gap-6">
            <div className="mx-auto ">
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSeparator />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {error && (
              <p className="text-destructive text-center text-sm">{error}</p>
            )}

            <VerifyButton />

            <div className="text-center text-sm">
              Didn&apos;t receive a code?{" "}
              <button
                type="button"
                onClick={handleResendCode}
                className="cursor-pointer text-primary underline underline-offset-4 hover:text-primary/90"
              >
                Resend code
              </button>
            </div>

            <div className="text-center text-sm">
              <Link
                href="/login"
                className="text-primary underline underline-offset-4 hover:text-primary/90"
              >
                Use a different email
              </Link>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
