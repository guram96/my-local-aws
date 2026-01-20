"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type Volume = {
  id: string;
  name: string;
  state: "available" | "in-use" | "creating" | "deleting" | "error";
  size: number;
  volumeType: string;
  iops: number | string;
  throughput: number | string;
  snapshotId: string;
  availabilityZone: string;
  created: string;
  encrypted: boolean;
  attachedTo?: string;
};

const getStateColor = (state: string) => {
  switch (state) {
    case "available":
      return "text-green-600";
    case "in-use":
      return "text-blue-600";
    case "creating":
      return "text-yellow-600";
    case "deleting":
      return "text-orange-600";
    case "error":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
};

const getStateIcon = () => {
  return "●";
};

export const columns: ColumnDef<Volume>[] = [
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
        href={`/console/ec2/volumes/${row.original.id}`}
        className="text-blue-600 hover:underline"
      >
        {row.getValue("name") || "-"}
      </Link>
    ),
  },
  {
    accessorKey: "id",
    header: "Volume ID",
    cell: ({ row }) => (
      <Link
        href={`/console/ec2/volumes/${row.original.id}`}
        className="text-blue-600 hover:underline font-mono text-xs"
      >
        {row.getValue("id")}
      </Link>
    ),
  },
  {
    accessorKey: "volumeType",
    header: "Type",
    cell: ({ row }) => (
      <span className="font-mono text-xs">{row.getValue("volumeType")}</span>
    ),
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ row }) => (
      <span>{row.getValue("size")} GiB</span>
    ),
  },
  {
    accessorKey: "iops",
    header: "IOPS",
    cell: ({ row }) => (
      <span>{row.getValue("iops")}</span>
    ),
  },
  {
    accessorKey: "throughput",
    header: "Throughput",
    cell: ({ row }) => {
      const throughput = row.getValue("throughput");
      return <span>{throughput === "-" ? "-" : `${throughput} MiB/s`}</span>;
    },
  },
  {
    accessorKey: "snapshotId",
    header: "Snapshot ID",
    cell: ({ row }) => {
      const snapshotId = row.getValue("snapshotId") as string;
      return snapshotId === "-" ? (
        <span className="text-gray-500">-</span>
      ) : (
        <Link
          href={`/console/ec2/snapshots/${snapshotId}`}
          className="text-blue-600 hover:underline font-mono text-xs"
        >
          {snapshotId}
        </Link>
      );
    },
  },
  {
    accessorKey: "state",
    header: "State",
    cell: ({ row }) => {
      const state = row.getValue("state") as string;
      return (
        <span className={`flex items-center gap-2 ${getStateColor(state)}`}>
          <span className="text-lg leading-none">{getStateIcon()}</span>
          <span className="capitalize">{state}</span>
        </span>
      );
    },
  },
  {
    accessorKey: "availabilityZone",
    header: "Availability Zone",
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("created")}</span>
    ),
  },
  {
    accessorKey: "encrypted",
    header: "Encrypted",
    cell: ({ row }) => (
      <span>{row.getValue("encrypted") ? "Yes" : "No"}</span>
    ),
  },
  {
    accessorKey: "attachedTo",
    header: "Attached instances",
    cell: ({ row }) => {
      const attachedTo = row.getValue("attachedTo") as string | undefined;
      return attachedTo ? (
        <Link
          href={`/console/ec2/instances/${attachedTo}`}
          className="text-blue-600 hover:underline font-mono text-xs"
        >
          {attachedTo}
        </Link>
      ) : (
        <span className="text-gray-500">-</span>
      );
    },
  },
];
