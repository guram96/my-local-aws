import Link from "next/link";
import { ConsoleFooter } from "../../../components/console-footer";
import { ConsoleHeader } from "../../../components/console-header";
import { ServiceSidebar } from "../../../components/service-sidebar";
import { ec2SidebarConfig } from "../../../lib/sidebar-configs";

export default function EC2Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ConsoleHeader showSecondBar={true} />
      <ServiceSidebar config={ec2SidebarConfig} />
      <div className="pt-[88px] pl-64 pb-12">
        {/* Main content area */}
        <div className="p-8">
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-2">Compute</p>
            <h1 className="text-3xl font-semibold mb-2">
              Amazon Elastic Compute Cloud (EC2)
            </h1>
            <p className="text-xl text-gray-700">
              Create, manage, and monitor virtual servers in the cloud.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <p className="text-sm text-gray-700">
              Amazon Elastic Compute Cloud (Amazon EC2) offers the broadest and
              deepest compute platform, with over 600 instance types and a
              choice of the latest processors, storage, networking, operating
              systems, and purchase models to help you best match the needs of
              your workload.
            </p>
          </div>

          {/* Launch instance card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">
              Launch a virtual server
            </h2>
            <div className="space-y-2">
              <Link
                href="/console/ec2/launch-instance"
                className="inline-block px-4 py-2 bg-[#ff9900] text-white rounded hover:bg-[#ec7211] transition-colors"
              >
                Launch instance
              </Link>
              <div className="space-y-1">
                <Link
                  href="/console/ec2/instances"
                  className="block text-sm text-blue-600 hover:underline"
                >
                  View dashboard
                </Link>
                <Link
                  href="#"
                  className="block text-sm text-blue-600 hover:underline"
                >
                  Get started walkthroughs
                </Link>
              </div>
            </div>
          </div>

          {/* Benefits and features */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">
              Benefits and features
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">
                  EC2 offers ultimate scalability and control
                </h3>
                <p className="text-sm text-gray-700 mb-2">
                  Fully resizable compute capacity to support virtually any
                  workload. This service is best if you want:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-4">
                  <li>
                    Highest level of control of the entire technology stack,
                    allowing full integration with all AWS services
                  </li>
                  <li>Widest variety of server size options</li>
                  <li>
                    Widest availability of operating systems to choose from
                    including Linux, Windows, and macOS
                  </li>
                  <li>Global scalability</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConsoleFooter />
    </div>
  );
}
