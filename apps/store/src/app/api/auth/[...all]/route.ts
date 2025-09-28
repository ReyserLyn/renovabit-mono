import { auth, toNextJsHandler } from "@renovabit/auth/auth";

export const { GET, POST } = toNextJsHandler(auth.handler);
