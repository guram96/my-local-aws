"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth-client";

export default function ConsolePage() {
  const handleLogout = async () => {
    try {
      // Sign out using Better Auth (this will clear auth-related cookies server-side)
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            // Clear all cookies manually (for non-httpOnly cookies)
            document.cookie.split(";").forEach((cookie) => {
              const eqPos = cookie.indexOf("=");
              const name =
                eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
              // Clear cookie by setting it to expire in the past
              document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
              document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
              // Also try clearing with the full domain
              if (window.location.hostname.includes(".")) {
                const domainParts = window.location.hostname.split(".");
                if (domainParts.length > 1) {
                  const rootDomain = "." + domainParts.slice(-2).join(".");
                  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${rootDomain}`;
                }
              }
            });
            // Small delay to ensure server has processed the signOut
            setTimeout(() => {
              // Force a hard redirect to sign-in page
              window.location.href = "/";
            }, 100);
          },
        },
      });
    } catch (error) {
      // Even if signOut fails, redirect to sign-in page
      console.error("Logout error:", error);
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-semibold text-gray-900">AWS Console</h1>
        <Button
          onClick={handleLogout}
          variant="outline"
          className="bg-white hover:bg-gray-50"
        >
          Log out
        </Button>
      </div>
      <p className="text-gray-600">Welcome to your AWS console.</p>
    </div>
  );
}
