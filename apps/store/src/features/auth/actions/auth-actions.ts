"use server";

import { createAuthActions } from "@renovabit/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const authActions = createAuthActions();

export const signUp = async (
  email: string,
  password: string,
  name: string,
  lastname: string,
  phone: string
) => authActions.signUp(email, password, name, lastname, phone);

export const signIn = async (email: string, password: string) =>
  authActions.signIn(email, password);

export const signInSocial = async (provider: "google", callback: string) => {
  const url = await authActions.signInSocial(provider, callback);
  if (url) {
    redirect(url);
  }
};

export const signOut = async () => await authActions.signOut(await headers());
