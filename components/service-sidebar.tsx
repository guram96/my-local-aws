"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export interface SidebarItem {
  label: string;
  href?: string;
  isNew?: boolean;
  isExternal?: boolean;
  children?: SidebarItem[];
}

export interface ServiceSidebarConfig {
  serviceName: string;
  serviceAbbreviation: string;
  backHref?: string;
  items: SidebarItem[];
  defaultExpandedSections?: string[];
}

interface ServiceSidebarProps {
  config: ServiceSidebarConfig;
}

export function ServiceSidebar({ config }: ServiceSidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    config.defaultExpandedSections?.reduce(
      (acc, section) => ({ ...acc, [section]: true }),
      {}
    ) || {}
  );

  const toggleSection = (label: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const isActive = (href?: string) => {
    if (!href) return false;
    return pathname === href;
  };

  return (
    <div
      className={`fixed left-0 top-[88px] bottom-0 bg-white border-r border-gray-200 transition-all duration-300 ${
        isCollapsed ? "w-12" : "w-64"
      } overflow-hidden z-40`}
    >
      {/* Sidebar Header */}
      <div className="h-12 border-b border-gray-200 flex items-center justify-between px-4">
        {!isCollapsed && (
          <>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 -ml-1"
                asChild
              >
                <Link href={config.backHref || "/console"}>
                  <ChevronLeft className="h-4 w-4" />
                </Link>
              </Button>
              <h2 className="font-semibold text-sm">{config.serviceAbbreviation}</h2>
            </div>
          </>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Sidebar Content */}
      {!isCollapsed && (
        <div className="overflow-y-auto h-[calc(100vh-148px)]">
          <nav className="py-2">
            {config.items.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  // Section with children
                  <div>
                    <button
                      onClick={() => toggleSection(item.label)}
                      className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <span className="font-medium">{item.label}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          expandedSections[item.label] ? "rotate-0" : "-rotate-90"
                        }`}
                      />
                    </button>
                    {expandedSections[item.label] && (
                      <div className="pl-4">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href || "#"}
                            className={`flex items-center justify-between px-4 py-2 text-sm transition-colors ${
                              isActive(child.href)
                                ? "bg-blue-50 text-blue-700 border-l-2 border-blue-700"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              {child.label}
                              {child.isNew && (
                                <Badge
                                  variant="secondary"
                                  className="text-[10px] px-1.5 py-0 h-4 bg-blue-100 text-blue-700 font-medium"
                                >
                                  New
                                </Badge>
                              )}
                            </span>
                            {child.isExternal && (
                              <ExternalLink className="h-3 w-3 text-gray-400" />
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  // Single item without children
                  <Link
                    href={item.href || "#"}
                    className={`flex items-center justify-between px-4 py-2 text-sm transition-colors ${
                      isActive(item.href)
                        ? "bg-blue-50 text-blue-700 border-l-2 border-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.isExternal && (
                      <ExternalLink className="h-3 w-3 text-gray-400" />
                    )}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
