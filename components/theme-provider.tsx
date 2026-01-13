"use client";

import { useTheme } from "@/lib/hooks/use-theme";
import { useEffect } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { mounted } = useTheme();

  // Prevent flash of unstyled content
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "browser-default";
    const root = document.documentElement;

    if (theme === "browser-default") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (prefersDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    } else if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);

  return <>{children}</>;
}
