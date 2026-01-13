"use client";

import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import GridLayout, { Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import { Widget, WidgetProps } from "./widget";

export interface DashboardWidget extends WidgetProps {
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
}

interface DashboardProps {
  widgets: DashboardWidget[];
  onLayoutChange?: (layout: Layout[]) => void;
  onWidgetRemove?: (id: string) => void;
  onResetLayout?: () => void;
  onAddWidget?: () => void;
}

const LAYOUT_STORAGE_KEY = "dashboard-layout";

export function Dashboard({
  widgets,
  onLayoutChange,
  onWidgetRemove,
  onResetLayout,
  onAddWidget,
}: DashboardProps) {
  const [layout, setLayout] = useState<Layout[]>([]);
  const [mounted, setMounted] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);

  const initializeLayout = useCallback(() => {
    const initialLayout: Layout[] = widgets.map((widget) => ({
      i: widget.id,
      x: widget.x,
      y: widget.y,
      w: widget.w,
      h: widget.h,
      minW: widget.minW || 2,
      minH: widget.minH || 2,
      maxW: widget.maxW,
      maxH: widget.maxH,
    }));
    setLayout(initialLayout);
  }, [widgets]);

  // Calculate container width
  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateWidth = () => {
        setContainerWidth(window.innerWidth - 64);
      };
      updateWidth();
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }
  }, []);

  // Initialize layout from widgets or localStorage
  useEffect(() => {
    if (widgets.length === 0) return;

    setMounted(true);
    const savedLayout = localStorage.getItem(LAYOUT_STORAGE_KEY);

    if (savedLayout) {
      try {
        const parsed = JSON.parse(savedLayout);
        // Merge saved layout with current widgets
        const mergedLayout = widgets.map((widget) => {
          const saved = parsed.find((l: Layout) => l.i === widget.id);
          return (
            saved || {
              i: widget.id,
              x: widget.x,
              y: widget.y,
              w: widget.w,
              h: widget.h,
              minW: widget.minW || 2,
              minH: widget.minH || 2,
              maxW: widget.maxW,
              maxH: widget.maxH,
            }
          );
        });
        setLayout(mergedLayout);
      } catch (error) {
        console.error("Failed to parse saved layout:", error);
        initializeLayout();
      }
    } else {
      initializeLayout();
    }
  }, [widgets, initializeLayout]);

  const handleLayoutChange = (newLayout: Layout[]) => {
    setLayout(newLayout);
    localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(newLayout));
    onLayoutChange?.(newLayout);
  };

  const handleReset = () => {
    localStorage.removeItem(LAYOUT_STORAGE_KEY);
    initializeLayout();
    onResetLayout?.();
  };

  if (!mounted) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Console Home</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleReset}>
              Reset to default layout
            </Button>
            <Button onClick={onAddWidget}>+ Add widgets</Button>
          </div>
        </div>
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Console Home</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            Reset to default layout
          </Button>
          <Button onClick={onAddWidget}>+ Add widgets</Button>
        </div>
      </div>

      <GridLayout
        className="layout"
        layout={layout}
        onLayoutChange={handleLayoutChange}
        cols={12}
        rowHeight={60}
        width={containerWidth}
        isDraggable={true}
        isResizable={true}
        draggableHandle=".widget-drag-handle"
        compactType="vertical"
        preventCollision={false}
        margin={[16, 16]}
      >
        {widgets.map((widget) => (
          <div key={widget.id}>
            <Widget
              id={widget.id}
              title={widget.title}
              infoLink={widget.infoLink}
              onRemove={onWidgetRemove}
            >
              {widget.children}
            </Widget>
          </div>
        ))}
      </GridLayout>
    </div>
  );
}
