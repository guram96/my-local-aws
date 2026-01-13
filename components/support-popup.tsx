"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ExternalLink, HelpCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface SupportMenuItem {
  id: string;
  label: string;
  href?: string;
  isHighlighted?: boolean;
  isSeparator?: boolean;
}

const supportMenuItems: SupportMenuItem[] = [
  {
    id: "support-center",
    label: "Support Center",
    href: "#",
  },
  {
    id: "repost",
    label: "re:Post",
    href: "#",
  },
  {
    id: "separator-1",
    isSeparator: true,
    label: "",
  },
  {
    id: "documentation",
    label: "Documentation",
    href: "#",
  },
  {
    id: "training",
    label: "Training",
    href: "#",
  },
  {
    id: "getting-started",
    label: "Getting Started Resource Center",
    href: "#",
  },
  {
    id: "send-feedback",
    label: "Send feedback",
    href: "#",
    isHighlighted: true,
  },
];

export function SupportPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "text-white hover:bg-white/10 h-8 w-8",
          isOpen && "bg-blue-600/20 border border-blue-500/50"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <HelpCircle className="h-4 w-4" />
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Popup */}
          <div
            ref={popupRef}
            className="absolute right-0 top-full mt-2 z-50 w-[280px] bg-[#212A34] rounded-lg shadow-2xl border border-[#3a4553] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-[#3a4553]">
              <a
                href="#"
                className="flex items-center gap-2 text-base font-semibold text-white hover:text-blue-400 transition-colors group"
                onClick={(e) => {
                  e.stopPropagation();
                  // Navigate to support page
                }}
              >
                <span>Support</span>
                <ExternalLink className="h-4 w-4 opacity-70 group-hover:opacity-100" />
              </a>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {supportMenuItems.map((item) => {
                if (item.isSeparator) {
                  return (
                    <div
                      key={item.id}
                      className="h-px bg-[#3a4553] my-1 mx-4"
                    />
                  );
                }

                return (
                  <a
                    key={item.id}
                    href={item.href}
                    className={cn(
                      "block px-4 py-2.5 text-sm transition-colors",
                      item.isHighlighted
                        ? "text-blue-400 hover:text-blue-300 hover:bg-white/5"
                        : "text-white hover:text-gray-200 hover:bg-white/5"
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle navigation
                    }}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
