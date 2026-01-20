"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type Instance = {
  id: string;
  name: string;
  state: "running" | "stopped" | "pending" | "stopping";
  instanceType: string;
  availabilityZone: string;
  publicIpv4: string;
  privateIpv4: string;
  statusCheck: string;
  alarmStatus: string;
  elasticIp: string;
};

const getStateColor = (state: string) => {
  switch (state) {
    case "running":
      return "text-green-600";
    case "stopped":
      return "text-red-600";
    case "pending":
      return "text-yellow-600";
    case "stopping":
      return "text-orange-600";
    default:
      return "text-gray-600";
  }
};

const getStateIcon = () => {
  return "●";
};

export const columns: ColumnDef<Instance>[] = [
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
        href={`/console/ec2/instances/${row.original.id}`}
        className="text-blue-600 hover:underline"
      >
        {row.getValue("name")}
      </Link>
    ),
  },
  {
    accessorKey: "id",
    header: "Instance ID",
    cell: ({ row }) => (
      <Link
        href={`/console/ec2/instances/${row.original.id}`}
        className="text-blue-600 hover:underline font-mono text-xs"
      >
        {row.getValue("id")}
      </Link>
    ),
  },
  {
    accessorKey: "state",
    header: "Instance state",
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
    accessorKey: "instanceType",
    header: "Instance type",
    cell: ({ row }) => (
      <span className="font-mono text-xs">{row.getValue("instanceType")}</span>
    ),
  },
  {
    accessorKey: "statusCheck",
    header: "Status check",
  },
  {
    accessorKey: "alarmStatus",
    header: "Alarm status",
  },
  {
    accessorKey: "availabilityZone",
    header: "Availability Zone",
  },
  {
    accessorKey: "publicIpv4Dns",
    header: "Public IPv4 DNS",
    cell: () => <span className="text-gray-500">-</span>,
  },
  {
    accessorKey: "publicIpv4",
    header: "Public IPv4 address",
    cell: ({ row }) => (
      <span className="font-mono text-xs">{row.getValue("publicIpv4")}</span>
    ),
  },
  {
    accessorKey: "elasticIp",
    header: "Elastic IP",
  },
];
