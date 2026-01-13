"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/hooks/use-theme";
import { Settings } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type VisualMode = "browser-default" | "light" | "dark";

export function SettingsPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("browser-default");
  const { theme, setTheme, mounted } = useTheme();
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
        <Settings className="h-4 w-4" />
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
            className="absolute right-0 top-full mt-2 z-50 w-[320px] bg-[#212A34] rounded-lg shadow-2xl border border-[#3a4553] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-[#3a4553]">
              <h2 className="text-base font-semibold text-white">
                Current user settings
              </h2>
            </div>

            {/* Content */}
            <div className="p-4 space-y-6">
              {/* Language Section */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white block">
                  Language
                </label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-full bg-[#1a232e] border-[#3a4553] text-white hover:bg-[#232f3e] h-9">
                    <SelectValue placeholder="Browser default" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#212A34] border-[#3a4553] text-white">
                    <SelectItem
                      value="browser-default"
                      className="focus:bg-white/10 focus:text-white"
                    >
                      Browser default
                    </SelectItem>
                    <SelectItem
                      value="en"
                      className="focus:bg-white/10 focus:text-white"
                    >
                      English
                    </SelectItem>
                    <SelectItem
                      value="es"
                      className="focus:bg-white/10 focus:text-white"
                    >
                      Español
                    </SelectItem>
                    <SelectItem
                      value="fr"
                      className="focus:bg-white/10 focus:text-white"
                    >
                      Français
                    </SelectItem>
                    <SelectItem
                      value="de"
                      className="focus:bg-white/10 focus:text-white"
                    >
                      Deutsch
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Visual Mode Section */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-white block">
                  Visual mode - beta
                </label>
                <div className="space-y-2">
                  {(
                    [
                      { value: "browser-default", label: "Browser default" },
                      { value: "light", label: "Light" },
                      { value: "dark", label: "Dark" },
                    ] as const
                  ).map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <div className="relative flex items-center">
                        <input
                          type="radio"
                          name="visual-mode"
                          value={option.value}
                          checked={mounted && theme === option.value}
                          onChange={() => setTheme(option.value as VisualMode)}
                          className="sr-only"
                        />
                        <div
                          className={cn(
                            "w-4 h-4 rounded-full border-2 transition-all",
                            mounted && theme === option.value
                              ? "border-blue-500 bg-blue-500"
                              : "border-gray-500 bg-transparent group-hover:border-gray-400"
                          )}
                        >
                          {mounted && theme === option.value && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-white" />
                            </div>
                          )}
                        </div>
                      </div>
                      <span
                        className={cn(
                          "text-sm transition-colors",
                          mounted && theme === option.value
                            ? "text-white"
                            : "text-gray-400 group-hover:text-gray-300"
                        )}
                      >
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-[#3a4553]">
              <a
                href="#"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  // Navigate to all user settings
                }}
              >
                See all user settings
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
