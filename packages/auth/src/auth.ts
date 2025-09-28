import { db } from "@renovabit/db/index";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
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
