import Link from "next/link";
import { ConsoleFooter } from "../../../../components/console-footer";
import { ConsoleHeader } from "../../../../components/console-header";
import { columns, Instance } from "../../../../components/instances-table/columns";
import { DataTable } from "../../../../components/instances-table/data-table";
import { ServiceSidebar } from "../../../../components/service-sidebar";
import { ec2SidebarConfig } from "../../../../lib/sidebar-configs";

// Dummy instance data
const dummyInstances: Instance[] = [
  {
    id: "i-0a1b2c3d4e5f6g7h8",
    name: "web-server-prod-1",
    state: "running",
    instanceType: "t2.micro",
    availabilityZone: "us-east-1a",
    publicIpv4: "54.123.45.67",
    privateIpv4: "172.31.12.34",
    statusCheck: "2/2 checks passed",
    alarmStatus: "No alarms",
    elasticIp: "-",
  },
  {
    id: "i-9h8g7f6e5d4c3b2a1",
    name: "app-server-dev",
    state: "running",
    instanceType: "t3.small",
    availabilityZone: "us-east-1b",
    publicIpv4: "52.98.76.54",
    privateIpv4: "172.31.45.67",
    statusCheck: "2/2 checks passed",
    alarmStatus: "No alarms",
    elasticIp: "-",
  },
  {
    id: "i-1a2b3c4d5e6f7g8h9",
    name: "database-server",
    state: "stopped",
    instanceType: "t3.medium",
    availabilityZone: "us-east-1a",
    publicIpv4: "-",
    privateIpv4: "172.31.78.90",
    statusCheck: "-",
    alarmStatus: "No alarms",
    elasticIp: "-",
  },
  {
    id: "i-7g8h9i0j1k2l3m4n5",
    name: "api-gateway",
    state: "running",
    instanceType: "t2.small",
    availabilityZone: "us-east-1c",
    publicIpv4: "18.234.56.78",
    privateIpv4: "172.31.23.45",
    statusCheck: "2/2 checks passed",
    alarmStatus: "1 alarm",
    elasticIp: "3.45.67.89",
  },
  {
    id: "i-5n4m3l2k1j0i9h8g7",
    name: "cache-server",
    state: "running",
    instanceType: "t3.large",
    availabilityZone: "us-east-1b",
    publicIpv4: "34.56.78.90",
    privateIpv4: "172.31.67.89",
    statusCheck: "2/2 checks passed",
    alarmStatus: "No alarms",
    elasticIp: "-",
  },
];

export default function InstancesPage() {
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
                <span>Instances</span>
              </div>
              <h1 className="text-3xl font-semibold">Instances</h1>
            </div>
          </div>

          {/* Data Table */}
          <DataTable columns={columns} data={dummyInstances} />
        </div>
      </div>
      <ConsoleFooter />
    </div>
  );
}
