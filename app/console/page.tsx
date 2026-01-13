"use client";

import { ConsoleHeader } from "@/components/console-header";

export default function ConsolePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ConsoleHeader />
      <div className="pt-[88px] p-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">AWS Console</h1>
        <p className="text-gray-600">Welcome to your AWS console.</p>
      </div>
    </div>
  );
}
