import Link from "next/link";
import { ConsoleFooter } from "../../../components/console-footer";
import { ConsoleHeader } from "../../../components/console-header";
import { ServiceSidebar } from "../../../components/service-sidebar";
import { s3SidebarConfig } from "../../../lib/sidebar-configs";

export default function S3Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ConsoleHeader showSecondBar={true} />
      <ServiceSidebar config={s3SidebarConfig} />
      <div className="pt-[88px] pl-64 pb-12">
        {/* Main content area */}
        <div className="p-8">
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-2">Storage</p>
            <h1 className="text-3xl font-semibold mb-2">
              Amazon Simple Storage Service (S3)
            </h1>
            <p className="text-xl text-gray-700">
              Scalable storage in the cloud
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <p className="text-sm text-gray-700">
              Amazon Simple Storage Service (Amazon S3) is an object storage
              service offering industry-leading scalability, data availability,
              security, and performance.
            </p>
          </div>

          {/* Create bucket card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Get started</h2>
            <div className="space-y-2">
              <Link
                href="/console/s3/create-bucket"
                className="inline-block px-4 py-2 bg-[#ff9900] text-white rounded hover:bg-[#ec7211] transition-colors"
              >
                Create bucket
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ConsoleFooter />
    </div>
  );
}
