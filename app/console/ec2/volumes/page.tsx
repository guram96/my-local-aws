import Link from "next/link";
import { ConsoleFooter } from "../../../../components/console-footer";
import { ConsoleHeader } from "../../../../components/console-header";
import { ServiceSidebar } from "../../../../components/service-sidebar";
import { columns, Volume } from "../../../../components/volumes-table/columns";
import { DataTable } from "../../../../components/volumes-table/data-table";
import { ec2SidebarConfig } from "../../../../lib/sidebar-configs";

// Dummy volume data
const dummyVolumes: Volume[] = [
  {
    id: "vol-0a1b2c3d4e5f6g7h8",
    name: "web-server-root",
    state: "in-use",
    size: 30,
    volumeType: "gp3",
    iops: 3000,
    throughput: 125,
    snapshotId: "-",
    availabilityZone: "us-east-1a",
    created: "January 15, 2026, 10:30:00 (UTC-05:00)",
    encrypted: true,
    attachedTo: "i-0a1b2c3d4e5f6g7h8",
  },
  {
    id: "vol-9h8g7f6e5d4c3b2a1",
    name: "app-data-volume",
    state: "in-use",
    size: 100,
    volumeType: "gp3",
    iops: 3000,
    throughput: 125,
    snapshotId: "snap-0123456789abcdef",
    availabilityZone: "us-east-1b",
    created: "January 12, 2026, 14:20:00 (UTC-05:00)",
    encrypted: true,
    attachedTo: "i-9h8g7f6e5d4c3b2a1",
  },
  {
    id: "vol-1a2b3c4d5e6f7g8h9",
    name: "backup-volume",
    state: "available",
    size: 500,
    volumeType: "gp2",
    iops: 1500,
    throughput: "-",
    snapshotId: "snap-9876543210fedcba",
    availabilityZone: "us-east-1a",
    created: "January 10, 2026, 08:15:00 (UTC-05:00)",
    encrypted: false,
  },
  {
    id: "vol-7g8h9i0j1k2l3m4n5",
    name: "high-performance-db",
    state: "in-use",
    size: 1000,
    volumeType: "io2",
    iops: 10000,
    throughput: "-",
    snapshotId: "-",
    availabilityZone: "us-east-1c",
    created: "January 8, 2026, 16:45:00 (UTC-05:00)",
    encrypted: true,
    attachedTo: "i-7g8h9i0j1k2l3m4n5",
  },
  {
    id: "vol-5n4m3l2k1j0i9h8g7",
    name: "cache-storage",
    state: "in-use",
    size: 200,
    volumeType: "gp3",
    iops: 6000,
    throughput: 250,
    snapshotId: "-",
    availabilityZone: "us-east-1b",
    created: "January 5, 2026, 11:00:00 (UTC-05:00)",
    encrypted: true,
    attachedTo: "i-5n4m3l2k1j0i9h8g7",
  },
  {
    id: "vol-2b3c4d5e6f7g8h9i0",
    name: "temp-storage",
    state: "available",
    size: 50,
    volumeType: "gp3",
    iops: 3000,
    throughput: 125,
    snapshotId: "-",
    availabilityZone: "us-east-1a",
    created: "January 3, 2026, 09:30:00 (UTC-05:00)",
    encrypted: false,
  },
  {
    id: "vol-3c4d5e6f7g8h9i0j1",
    name: "log-archive",
    state: "available",
    size: 2000,
    volumeType: "st1",
    iops: "-",
    throughput: 500,
    snapshotId: "-",
    availabilityZone: "us-east-1c",
    created: "December 28, 2025, 13:15:00 (UTC-05:00)",
    encrypted: true,
  },
];

export default function VolumesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ConsoleHeader showSecondBar={true} />
      <ServiceSidebar config={ec2SidebarConfig} />
      <div className="pt-[88px] pl-64 pb-12">
        {/* Main content area */}
        <div className="p-8">
          {/* Page header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <Link
                  href="/console/ec2"
                  className="text-blue-600 hover:underline"
                >
                  EC2
                </Link>
                <span>&gt;</span>
                <span>Volumes</span>
              </div>
              <h1 className="text-3xl font-semibold">Volumes</h1>
            </div>
          </div>

          {/* Data Table */}
          <DataTable columns={columns} data={dummyVolumes} />
        </div>
      </div>
      <ConsoleFooter />
    </div>
  );
}
