import Link from "next/link";
import { ConsoleFooter } from "../../../../components/console-footer";
import { ConsoleHeader } from "../../../../components/console-header";
import { ServiceSidebar } from "../../../../components/service-sidebar";
import { columns, Snapshot } from "../../../../components/snapshots-table/columns";
import { DataTable } from "../../../../components/snapshots-table/data-table";
import { ec2SidebarConfig } from "../../../../lib/sidebar-configs";

// Dummy snapshot data
const dummySnapshots: Snapshot[] = [
  {
    id: "snap-0a1b2c3d4e5f6g7h8",
    name: "web-server-backup-jan-15",
    status: "completed",
    started: "January 15, 2026, 22:30:00 (UTC-05:00)",
    progress: "100%",
    volumeId: "vol-0a1b2c3d4e5f6g7h8",
    volumeSize: 30,
    fullSnapshotSize: 12,
    description: "Daily backup of web server root volume",
    storageTier: "standard",
    encrypted: true,
    ownerId: "123456789012",
  },
  {
    id: "snap-9h8g7f6e5d4c3b2a1",
    name: "app-data-weekly-backup",
    status: "completed",
    started: "January 13, 2026, 03:00:00 (UTC-05:00)",
    progress: "100%",
    volumeId: "vol-9h8g7f6e5d4c3b2a1",
    volumeSize: 100,
    fullSnapshotSize: 45,
    description: "Weekly backup of application data",
    storageTier: "standard",
    encrypted: true,
    ownerId: "123456789012",
  },
  {
    id: "snap-1a2b3c4d5e6f7g8h9",
    name: "database-backup-pre-upgrade",
    status: "completed",
    started: "January 10, 2026, 18:45:00 (UTC-05:00)",
    progress: "100%",
    volumeId: "vol-7g8h9i0j1k2l3m4n5",
    volumeSize: 1000,
    fullSnapshotSize: 680,
    description: "Backup before database upgrade",
    storageTier: "standard",
    encrypted: true,
    ownerId: "123456789012",
  },
  {
    id: "snap-7g8h9i0j1k2l3m4n5",
    name: "monthly-archive-dec",
    status: "completed",
    started: "December 31, 2025, 23:59:00 (UTC-05:00)",
    progress: "100%",
    volumeId: "vol-2b3c4d5e6f7g8h9i0",
    volumeSize: 50,
    fullSnapshotSize: 28,
    description: "Monthly archive snapshot",
    storageTier: "archive",
    encrypted: false,
    ownerId: "123456789012",
  },
  {
    id: "snap-5n4m3l2k1j0i9h8g7",
    name: "cache-snapshot",
    status: "completed",
    started: "January 18, 2026, 12:00:00 (UTC-05:00)",
    progress: "100%",
    volumeId: "vol-5n4m3l2k1j0i9h8g7",
    volumeSize: 200,
    fullSnapshotSize: 87,
    description: "Cache volume snapshot for recovery",
    storageTier: "standard",
    encrypted: true,
    ownerId: "123456789012",
  },
  {
    id: "snap-2b3c4d5e6f7g8h9i0",
    name: "",
    status: "pending",
    started: "January 20, 2026, 10:15:00 (UTC-05:00)",
    progress: "67%",
    volumeId: "vol-3c4d5e6f7g8h9i0j1",
    volumeSize: 2000,
    fullSnapshotSize: 0,
    description: "",
    storageTier: "standard",
    encrypted: true,
    ownerId: "123456789012",
  },
];

export default function SnapshotsPage() {
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
                <span>Snapshots</span>
              </div>
              <h1 className="text-3xl font-semibold">Snapshots</h1>
            </div>
          </div>

          {/* Data Table */}
          <DataTable columns={columns} data={dummySnapshots} />
        </div>
      </div>
      <ConsoleFooter />
    </div>
  );
}
