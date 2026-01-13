import { betterAuth } from "better-auth";
import Database from "better-sqlite3";

export const auth = betterAuth({
  database: new Database("./database.sqlite"),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  // Add trusted origins to prevent CORS issues
  trustedOrigins: [
    process.env.BETTER_AUTH_URL || "http://localhost:3000",
    "http://localhost:3000",
    ...(process.env.NEXT_PUBLIC_BETTER_AUTH_URL
      ? [process.env.NEXT_PUBLIC_BETTER_AUTH_URL]
      : []),
  ],
  emailAndPassword: {
    enabled: true,
  },
});
