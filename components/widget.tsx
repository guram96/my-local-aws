"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { ReactNode } from "react";

export interface WidgetProps {
  id: string;
  title: string;
  children?: ReactNode;
  onRemove?: (id: string) => void;
  infoLink?: string;
}

export function Widget({ id, title, children, onRemove, infoLink }: WidgetProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b widget-drag-handle cursor-move">
        <div className="flex items-center gap-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {infoLink && (
            <a
              href={infoLink}
              className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              Info
            </a>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="hover:bg-gray-100 rounded p-1 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="h-4 w-4 text-gray-500" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Move</DropdownMenuItem>
            <DropdownMenuItem>Resize</DropdownMenuItem>
            <DropdownMenuItem>Customize</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onRemove?.(id)}
              className="text-red-600"
            >
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="flex-1 pt-4">
        {children || (
          <div className="text-sm text-gray-500">Widget content will go here</div>
        )}
      </CardContent>
    </Card>
  );
}
