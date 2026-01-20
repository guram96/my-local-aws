import Link from "next/link";
import { ConsoleFooter } from "../../../../components/console-footer";
import { ConsoleHeader } from "../../../../components/console-header";
import { ServiceSidebar } from "../../../../components/service-sidebar";
import { columns, SecurityGroup } from "../../../../components/security-groups-table/columns";
import { DataTable } from "../../../../components/security-groups-table/data-table";
import { ec2SidebarConfig } from "../../../../lib/sidebar-configs";

// Dummy security group data
const dummySecurityGroups: SecurityGroup[] = [
  {
    id: "sg-07714b5642cdf0cd",
    name: "",
    groupName: "default",
    vpcId: "vpc-0f84b66c4b3ffa75b",
    description: "default VPC security group",
    owner: "376772435929",
    inboundRules: 1,
    outboundRules: 1,
  },
  {
    id: "sg-0a1b2c3d4e5f6g7h8",
    name: "web-servers-sg",
    groupName: "web-server-security-group",
    vpcId: "vpc-0f84b66c4b3ffa75b",
    description: "Security group for web servers - allows HTTP and HTTPS traffic",
    owner: "376772435929",
    inboundRules: 3,
    outboundRules: 1,
  },
  {
    id: "sg-9h8g7f6e5d4c3b2a1",
    name: "database-sg",
    groupName: "database-security-group",
    vpcId: "vpc-0f84b66c4b3ffa75b",
    description: "Security group for RDS databases - allows MySQL/PostgreSQL access",
    owner: "376772435929",
    inboundRules: 2,
    outboundRules: 1,
  },
  {
    id: "sg-1a2b3c4d5e6f7g8h9",
    name: "ssh-access-sg",
    groupName: "ssh-access",
    vpcId: "vpc-0f84b66c4b3ffa75b",
    description: "Allows SSH access from specific IP ranges",
    owner: "376772435929",
    inboundRules: 1,
    outboundRules: 1,
  },
  {
    id: "sg-7g8h9i0j1k2l3m4n5",
    name: "load-balancer-sg",
    groupName: "application-load-balancer",
    vpcId: "vpc-0f84b66c4b3ffa75b",
    description: "Security group for application load balancer",
    owner: "376772435929",
    inboundRules: 2,
    outboundRules: 1,
  },
  {
    id: "sg-5n4m3l2k1j0i9h8g7",
    name: "api-gateway-sg",
    groupName: "api-gateway-security",
    vpcId: "vpc-0f84b66c4b3ffa75b",
    description: "Security group for API Gateway endpoints",
    owner: "376772435929",
    inboundRules: 4,
    outboundRules: 2,
  },
  {
    id: "sg-2b3c4d5e6f7g8h9i0",
    name: "internal-services-sg",
    groupName: "internal-services",
    vpcId: "vpc-0f84b66c4b3ffa75b",
    description: "Security group for internal microservices communication",
    owner: "376772435929",
    inboundRules: 5,
    outboundRules: 1,
  },
];

export default function SecurityGroupsPage() {
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
                <span>Security Groups</span>
              </div>
              <h1 className="text-3xl font-semibold">Security Groups</h1>
            </div>
          </div>

          {/* Data Table */}
          <DataTable columns={columns} data={dummySecurityGroups} />
        </div>
      </div>
      <ConsoleFooter />
    </div>
  );
}
