"use client";

import { ConsoleHeader } from "@/components/console-header";
import { ConsoleFooter } from "@/components/console-footer";
import { Dashboard, DashboardWidget } from "@/components/dashboard";
import { useState } from "react";

export default function ConsolePage() {
  const [widgets, setWidgets] = useState<DashboardWidget[]>([
    {
      id: "applications",
      title: "Applications (1)",
      x: 0,
      y: 0,
      w: 6,
      h: 4,
      minW: 4,
      minH: 3,
      infoLink: "#",
    },
    {
      id: "recently-visited",
      title: "Recently visited",
      x: 6,
      y: 0,
      w: 3,
      h: 4,
      minW: 2,
      minH: 3,
      infoLink: "#",
    },
    {
      id: "welcome",
      title: "Welcome to AWS",
      x: 9,
      y: 0,
      w: 3,
      h: 4,
      minW: 2,
      minH: 3,
      infoLink: "#",
    },
    {
      id: "aws-health",
      title: "AWS Health",
      x: 0,
      y: 4,
      w: 4,
      h: 3,
      minW: 3,
      minH: 2,
      infoLink: "#",
    },
    {
      id: "managed-instances",
      title: "Managed instances",
      x: 4,
      y: 4,
      w: 4,
      h: 3,
      minW: 3,
      minH: 2,
      infoLink: "#",
    },
    {
      id: "ops-summary",
      title: "Ops summary",
      x: 8,
      y: 4,
      w: 4,
      h: 3,
      minW: 3,
      minH: 2,
      infoLink: "#",
    },
    {
      id: "solutions",
      title: "Solutions (13)",
      x: 0,
      y: 7,
      w: 6,
      h: 4,
      minW: 4,
      minH: 3,
      infoLink: "#",
    },
    {
      id: "cost-usage",
      title: "Cost and usage",
      x: 6,
      y: 7,
      w: 6,
      h: 4,
      minW: 4,
      minH: 3,
      infoLink: "#",
    },
    {
      id: "explore-aws",
      title: "Explore AWS",
      x: 0,
      y: 11,
      w: 3,
      h: 3,
      minW: 2,
      minH: 2,
      infoLink: "#",
    },
    {
      id: "announcements",
      title: "Latest announcements",
      x: 3,
      y: 11,
      w: 4,
      h: 3,
      minW: 3,
      minH: 2,
      infoLink: "#",
    },
    {
      id: "blog-posts",
      title: "Recent AWS blog posts",
      x: 7,
      y: 11,
      w: 5,
      h: 3,
      minW: 3,
      minH: 2,
      infoLink: "#",
    },
  ]);

  const handleLayoutChange = (layout: any[]) => {
    // Update widget positions based on layout changes
    setWidgets((prev) =>
      prev.map((widget) => {
        const layoutItem = layout.find((item) => item.i === widget.id);
        if (layoutItem) {
          return {
            ...widget,
            x: layoutItem.x,
            y: layoutItem.y,
            w: layoutItem.w,
            h: layoutItem.h,
          };
        }
        return widget;
      })
    );
  };

  const handleWidgetRemove = (id: string) => {
    setWidgets((prev) => prev.filter((widget) => widget.id !== id));
  };

  const handleResetLayout = () => {
    // Reset to default positions
    setWidgets([
      {
        id: "applications",
        title: "Applications (1)",
        x: 0,
        y: 0,
        w: 6,
        h: 4,
        minW: 4,
        minH: 3,
        infoLink: "#",
      },
      {
        id: "recently-visited",
        title: "Recently visited",
        x: 6,
        y: 0,
        w: 3,
        h: 4,
        minW: 2,
        minH: 3,
        infoLink: "#",
      },
      {
        id: "welcome",
        title: "Welcome to AWS",
        x: 9,
        y: 0,
        w: 3,
        h: 4,
        minW: 2,
        minH: 3,
        infoLink: "#",
      },
      {
        id: "aws-health",
        title: "AWS Health",
        x: 0,
        y: 4,
        w: 4,
        h: 3,
        minW: 3,
        minH: 2,
        infoLink: "#",
      },
      {
        id: "managed-instances",
        title: "Managed instances",
        x: 4,
        y: 4,
        w: 4,
        h: 3,
        minW: 3,
        minH: 2,
        infoLink: "#",
      },
      {
        id: "ops-summary",
        title: "Ops summary",
        x: 8,
        y: 4,
        w: 4,
        h: 3,
        minW: 3,
        minH: 2,
        infoLink: "#",
      },
      {
        id: "solutions",
        title: "Solutions (13)",
        x: 0,
        y: 7,
        w: 6,
        h: 4,
        minW: 4,
        minH: 3,
        infoLink: "#",
      },
      {
        id: "cost-usage",
        title: "Cost and usage",
        x: 6,
        y: 7,
        w: 6,
        h: 4,
        minW: 4,
        minH: 3,
        infoLink: "#",
      },
      {
        id: "explore-aws",
        title: "Explore AWS",
        x: 0,
        y: 11,
        w: 3,
        h: 3,
        minW: 2,
        minH: 2,
        infoLink: "#",
      },
      {
        id: "announcements",
        title: "Latest announcements",
        x: 3,
        y: 11,
        w: 4,
        h: 3,
        minW: 3,
        minH: 2,
        infoLink: "#",
      },
      {
        id: "blog-posts",
        title: "Recent AWS blog posts",
        x: 7,
        y: 11,
        w: 5,
        h: 3,
        minW: 3,
        minH: 2,
        infoLink: "#",
      },
    ]);
  };

  const handleAddWidget = () => {
    // Placeholder for adding widgets
    console.log("Add widget clicked");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ConsoleHeader />
      <div className="pt-[88px] pb-12">
        <Dashboard
          widgets={widgets}
          onLayoutChange={handleLayoutChange}
          onWidgetRemove={handleWidgetRemove}
          onResetLayout={handleResetLayout}
          onAddWidget={handleAddWidget}
        />
      </div>
      <ConsoleFooter />
    </div>
  );
}
