"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function sendOTP(formData: FormData) {
  try {
    const email = formData.get("email");

    if (!email) {
      return { error: "Invalid email" };
    }

    const response = await auth.api.sendVerificationOTP({
      body: {
        email: email as string,
        type: "sign-in",
      },
    });

    if (!response.success) {
      return { error: "Failed to send OTP" };
    }

    return { success: "OTP sent" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to send OTP" };
  }
}

export async function signInOTP(formData: FormData) {
  try {
    const email = formData.get("email");
    const otp = formData.get("otp");

    if (!email || !otp) {
      return { error: "Invalid email or OTP" };
    }

    const response = await auth.api.signInEmailOTP({
      body: {
        email: email as string,
        otp: otp as string,
      },
    });

    if (!response.user || !response.token) {
      return { error: "Failed to sign in" };
    }

    return { success: "Signed in" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to sign in" };
  }
}

export async function signOut() {
  await auth.api.signOut({
    headers: await headers(),
  });

  revalidatePath("/");

  redirect("/login");
}
