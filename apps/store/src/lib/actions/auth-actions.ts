"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../auth";

export const signUp = async (
  email: string,
  password: string,
  name: string,
  callbackURL?: string
) => {
  const h = await headers();
  const fallbackURL = h.get("referer") ?? "/";
  const result = await auth.api.signUpEmail({
    body: {
      email,
      password,
      name,
      callbackURL: callbackURL ?? fallbackURL,
    },
  });

  return result;
};

export const signIn = async (
  email: string,
  password: string,
  callbackURL?: string
) => {
  const h = await headers();
  const fallbackURL = h.get("referer") ?? "/";
  const result = await auth.api.signInEmail({
    body: {
      email,
      password,
      callbackURL: callbackURL ?? fallbackURL,
    },
  });

  return result;
};

export const signInSocial = async (
  provider: "github" | "google",
  callbackURL?: string
) => {
  const h = await headers();
  const fallbackURL = h.get("referer") ?? "/";
  const { url } = await auth.api.signInSocial({
    body: {
      provider,
      callbackURL: callbackURL ?? fallbackURL,
    },
  });

  if (url) {
    redirect(url);
  }
};

export const signOut = async () => {
  const result = await auth.api.signOut({ headers: await headers() });
  return result;
};
