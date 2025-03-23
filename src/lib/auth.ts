import { betterAuth } from "better-auth";
import { db } from "@/database/drizzle";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { admin, emailOTP } from "better-auth/plugins";
import * as schema from "@/database/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  plugins: [
    nextCookies(),
    emailOTP({
      async sendVerificationOTP({ otp }) {
        console.log("OTP", otp);
      },
    }),
    admin(),
  ],
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
        input: false, // don't allow user to set role
      },
    },
  },
});
