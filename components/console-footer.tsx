"use client";

import { MessageSquare, Smartphone, Terminal } from "lucide-react";
import Link from "next/link";

export function ConsoleFooter() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-[#232f3e] border-t border-[#1a232e]">
      <div className="flex items-center justify-between h-12 px-4">
        {/* Left Section - Utility Links */}
        <div className="flex items-center gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-white hover:text-[#ff9900] transition-colors text-sm"
          >
            <Terminal className="h-4 w-4" />
            <span>CloudShell</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 text-white hover:text-[#ff9900] transition-colors text-sm"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Feedback</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 text-white hover:text-[#ff9900] transition-colors text-sm"
          >
            <Smartphone className="h-4 w-4" />
            <span>Console Mobile App</span>
          </Link>
        </div>

        {/* Right Section - Legal & Copyright */}
        <div className="flex items-center gap-4">
          <span className="text-white text-sm">
            © 2026, Amazon Web Services, Inc. or its affiliates.
          </span>
          <Link
            href="#"
            className="text-white hover:text-[#ff9900] transition-colors text-sm"
          >
            Privacy
          </Link>
          <Link
            href="#"
            className="text-white hover:text-[#ff9900] transition-colors text-sm"
          >
            Terms
          </Link>
          <Link
            href="#"
            className="text-white hover:text-[#ff9900] transition-colors text-sm"
          >
            Cookie preferences
          </Link>
        </div>
      </div>
    </footer>
  );
}
