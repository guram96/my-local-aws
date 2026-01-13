"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Bell, Cloud, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type NotificationTab = "most-recent" | "user-configured" | "aws-managed";

interface Notification {
  id: string;
  type: "aws-health" | "user" | "aws-managed";
  title: string;
  description: string;
  timestamp: string;
  icon?: React.ReactNode;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "aws-health",
    title: "AWS Health Event",
    description:
      "Amazon EC2 Maintenance: Instance scheduled for reboot [AWS Account ID: 711387105200]",
    timestamp: "2 months ago",
    icon: <Cloud className="h-4 w-4" />,
  },
];

export function NotificationsPopup() {
  const [activeTab, setActiveTab] = useState<NotificationTab>("most-recent");
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

  const tabs = [
    {
      id: "most-recent" as NotificationTab,
      label: "Most recent",
      icon: null,
    },
    {
      id: "user-configured" as NotificationTab,
      label: "User configured",
      icon: <User className="h-4 w-4" />,
    },
    {
      id: "aws-managed" as NotificationTab,
      label: "AWS managed",
      icon: <Cloud className="h-4 w-4" />,
    },
  ];

  const filteredNotifications = mockNotifications.filter((notification) => {
    if (activeTab === "most-recent") return true;
    if (activeTab === "user-configured") return notification.type === "user";
    if (activeTab === "aws-managed")
      return (
        notification.type === "aws-managed" ||
        notification.type === "aws-health"
      );
    return true;
  });

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
        <Bell className="h-4 w-4" />
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
            className="absolute right-0 top-full mt-2 z-50 w-[500px] max-h-[550px] bg-[#212A34] rounded-lg shadow-2xl border border-[#3a4553] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#3a4553]">
              <h2 className="text-lg font-semibold text-white">
                Notifications
              </h2>
              <a
                href="#"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  // Navigate to notification center
                }}
              >
                Notification center
              </a>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-0 px-6 border-b border-[#3a4553]">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors",
                    activeTab === tab.id
                      ? "text-white"
                      : "text-gray-400 hover:text-gray-300"
                  )}
                >
                  {tab.icon && tab.icon}
                  <span>{tab.label}</span>
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
                  )}
                </button>
              ))}
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto">
              {filteredNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-6">
                  <Bell className="h-12 w-12 text-gray-600 mb-4" />
                  <p className="text-gray-400 text-sm">
                    No notifications found
                  </p>
                </div>
              ) : (
                <div className="py-2">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="px-6 py-4 hover:bg-white/5 transition-colors cursor-pointer border-b border-[#3a4553]/50 last:border-b-0"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 text-gray-400">
                          {notification.icon || <Cloud className="h-4 w-4" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-1">
                            <h3 className="text-sm font-medium text-white">
                              {notification.title}
                            </h3>
                            <span className="text-xs text-gray-400 whitespace-nowrap">
                              {notification.timestamp}
                            </span>
                          </div>
                          <p className="text-sm text-gray-300 leading-relaxed">
                            {notification.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
