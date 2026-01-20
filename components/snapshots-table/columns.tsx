"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type Snapshot = {
  id: string;
  name: string;
  status: "completed" | "pending" | "error";
  started: string;
  progress: string;
  volumeId: string;
  volumeSize: number;
  fullSnapshotSize: number;
  description: string;
  storageTier: "standard" | "archive";
  encrypted: boolean;
  ownerId: string;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "text-green-600";
    case "pending":
      return "text-yellow-600";
    case "error":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
};

const getStatusIcon = () => {
  return "●";
};

export const columns: ColumnDef<Snapshot>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <Link
        href={`/console/ec2/snapshots/${row.original.id}`}
        className="text-blue-600 hover:underline"
      >
        {row.getValue("name") || "-"}
      </Link>
    ),
  },
  {
    accessorKey: "id",
    header: "Snapshot ID",
    cell: ({ row }) => (
      <Link
        href={`/console/ec2/snapshots/${row.original.id}`}
        className="text-blue-600 hover:underline font-mono text-xs"
      >
        {row.getValue("id")}
      </Link>
    ),
  },
  {
    accessorKey: "fullSnapshotSize",
    header: "Full snapshot size",
    cell: ({ row }) => (
      <span>{row.getValue("fullSnapshotSize")} GiB</span>
    ),
  },
  {
    accessorKey: "volumeSize",
    header: "Volume size",
    cell: ({ row }) => (
      <span>{row.getValue("volumeSize")} GiB</span>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.getValue("description") as string;
      return description ? (
        <span className="text-sm">{description}</span>
      ) : (
        <span className="text-gray-500">-</span>
      );
    },
  },
  {
    accessorKey: "storageTier",
    header: "Storage tier",
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("storageTier")}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Snapshot status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <span className={`flex items-center gap-2 ${getStatusColor(status)}`}>
          <span className="text-lg leading-none">{getStatusIcon()}</span>
          <span className="capitalize">{status}</span>
        </span>
      );
    },
  },
  {
    accessorKey: "started",
    header: "Started",
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("started")}</span>
    ),
  },
  {
    accessorKey: "progress",
    header: "Progress",
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("progress")}</span>
    ),
  },
  {
    accessorKey: "volumeId",
    header: "Volume",
    cell: ({ row }) => {
      const volumeId = row.getValue("volumeId") as string;
      return volumeId ? (
        <Link
          href={`/console/ec2/volumes/${volumeId}`}
          className="text-blue-600 hover:underline font-mono text-xs"
        >
          {volumeId}
        </Link>
      ) : (
        <span className="text-gray-500">-</span>
      );
    },
  },
  {
    accessorKey: "encrypted",
    header: "Encrypted",
    cell: ({ row }) => (
      <span>{row.getValue("encrypted") ? "Yes" : "No"}</span>
    ),
  },
  {
    accessorKey: "ownerId",
    header: "Owner ID",
    cell: ({ row }) => (
      <span className="font-mono text-xs">{row.getValue("ownerId")}</span>
    ),
  },
];
