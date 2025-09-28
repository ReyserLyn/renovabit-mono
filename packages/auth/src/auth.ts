import { db } from "@renovabit/db/index";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: [
    process.env.NEXT_PUBLIC_URL ?? "",
    "localhost:3000",
    "localhost:4000",
  ],
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    autoSignIn: true,
    minPasswordLength: 8,
    maxPasswordLength: 20,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  user: {
    additionalFields: {
      lastname: {
        type: "string",
        required: true,
      },
      phone: {
        type: "string",
        required: true,
      },
    },
  },

  telemetry: {
    enabled: false,
  },

  /* 
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
      },
      },
  */

  plugins: [nextCookies()],
});

export { toNextJsHandler } from "better-auth/next-js";
