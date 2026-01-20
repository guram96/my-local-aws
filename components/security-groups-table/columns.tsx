"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type SecurityGroup = {
  id: string;
  name: string;
  groupName: string;
  vpcId: string;
  description: string;
  owner: string;
  inboundRules: number;
  outboundRules: number;
};

export const columns: ColumnDef<SecurityGroup>[] = [
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
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      return name ? (
        <Link
          href={`/console/ec2/security-groups/${row.original.id}`}
          className="text-blue-600 hover:underline"
        >
          {name}
        </Link>
      ) : (
        <span className="text-gray-500">-</span>
      );
    },
  },
  {
    accessorKey: "id",
    header: "Security group ID",
    cell: ({ row }) => (
      <Link
        href={`/console/ec2/security-groups/${row.original.id}`}
        className="text-blue-600 hover:underline font-mono text-xs"
      >
        {row.getValue("id")}
      </Link>
    ),
  },
  {
    accessorKey: "groupName",
    header: "Security group name",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("groupName")}</span>
    ),
  },
  {
    accessorKey: "vpcId",
    header: "VPC ID",
    cell: ({ row }) => (
      <Link
        href={`/console/vpc/vpcs/${row.original.vpcId}`}
        className="text-blue-600 hover:underline font-mono text-xs"
      >
        {row.getValue("vpcId")}
      </Link>
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
    accessorKey: "owner",
    header: "Owner",
    cell: ({ row }) => (
      <span className="font-mono text-xs">{row.getValue("owner")}</span>
    ),
  },
  {
    accessorKey: "inboundRules",
    header: "Inbound rules",
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("inboundRules")}</span>
    ),
  },
  {
    accessorKey: "outboundRules",
    header: "Outbound rules",
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("outboundRules")}</span>
    ),
  },
];
