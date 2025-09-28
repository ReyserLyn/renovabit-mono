import { auth } from "../auth";

export const createAuthActions = () => ({
  signUp: async (
    email: string,
    password: string,
    name: string,
    lastname: string,
    phone: string
  ) =>
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
        lastname,
        phone,
      },
    }),

  signIn: async (email: string, password: string) =>
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    }),

  signInSocial: async (provider: "google", callback: string) => {
    const { url } = await auth.api.signInSocial({
      body: {
        provider,
        callbackURL: callback,
        errorCallbackURL: callback,
      },
    });

    return url;
  },

  signOut: async (headers?: Headers) =>
    await auth.api.signOut({ headers: headers || new Headers() }),
});
