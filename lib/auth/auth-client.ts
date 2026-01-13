"use client";

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // For Next.js apps on the same domain, baseURL is optional
  // Only specify if you need a different origin
  baseURL:
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_BETTER_AUTH_URL || undefined,
});
