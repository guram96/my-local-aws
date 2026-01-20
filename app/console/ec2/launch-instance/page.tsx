"use client";

import { ConsoleFooter } from "@/components/console-footer";
import { ConsoleHeader } from "@/components/console-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronRight, Code, Info, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { checkQemuAction } from "../../../../lib/actions/check-qemu";
import { runQemuAction } from "../../../../lib/actions/run-qemu";

export default function LaunchInstancePage() {
  const [selectedOS, setSelectedOS] = useState("amazon-linux");
  const [instanceName, setInstanceName] = useState("");

  const osTabs = [
    { id: "amazon-linux", label: "Amazon Linux", icon: "🟠" },
    { id: "macos", label: "macOS", icon: "🍎" },
    { id: "ubuntu", label: "Ubuntu", icon: "🟠" },
    { id: "windows", label: "Windows", icon: "🪟" },
    { id: "redhat", label: "Red Hat", icon: "🔴" },
    { id: "suse", label: "SUSE Linux", icon: "🟢" },
    { id: "debian", label: "Debian", icon: "🔴" },
  ];

  const handleLaunchInstance = async () => {
    const result = await runQemuAction();
    if (result.success) {
      console.log("Amazon Linux 2023 QEMU VM started");
    } else {
      console.error("Failed to start Amazon Linux 2023 QEMU VM:", result.error);
    }
  };

  const checkQemu = async () => {
    const result = await checkQemuAction();
    console.log(result);
    if (result.success) {
      console.log("QEMU is running");
    } else {
      console.error("QEMU is not running:", result.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ConsoleHeader />
      <div className="pt-[128px] pb-12">
        <div className="max-w-[1600px] mx-auto px-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <nav className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/console" className="hover:text-gray-900">
                EC2
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/console" className="hover:text-gray-900">
                Instances
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-gray-900 font-medium">
                Launch an instance
              </span>
            </nav>
          </div>

          {/* Title and Intro */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl font-semibold text-gray-900">
                Launch an instance
              </h1>
              <Link
                href="#"
                className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
              >
                <Info className="h-4 w-4" />
                Info
              </Link>
            </div>
            <p className="text-gray-600 text-sm">
              Amazon EC2 allows you to create virtual machines, or instances,
              that run on the AWS Cloud. Quickly get started by following the
              simple steps below.
            </p>
          </div>

          <div className="flex gap-6">
            {/* Left Panel - Configuration */}
            <div className="flex-1 space-y-6">
              {/* Name and tags */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-base font-semibold text-gray-900">
                      Name and tags
                    </h2>
                    <Link
                      href="#"
                      className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                    >
                      <Info className="h-4 w-4" />
                      Info
                    </Link>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="instance-name"
                        className="block text-sm font-medium text-gray-700 mb-1.5"
                      >
                        Name
                      </label>
                      <Input
                        id="instance-name"
                        placeholder="e.g. My Web Server"
                        value={instanceName}
                        onChange={(e) => setInstanceName(e.target.value)}
                        className="max-w-md"
                      />
                    </div>
                    <Link
                      href="#"
                      className="text-blue-600 hover:text-blue-700 text-sm inline-block"
                    >
                      Add additional tags
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Application and OS Images */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-base font-semibold text-gray-900">
                      Application and OS Images (Amazon Machine Image)
                    </h2>
                    <Link
                      href="#"
                      className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                    >
                      <Info className="h-4 w-4" />
                      Info
                    </Link>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    An AMI is a template that contains the software
                    configuration (operating system, application server, and
                    applications) required to launch your instance. You can
                    select an AMI provided by AWS, our user community, or you
                    can select one of your own. Use the search field below to
                    refine the list of AMIs displayed, or choose Browse more
                    AMIs to search through a larger catalog.
                  </p>

                  {/* Search Bar */}
                  <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search our full catalog including 1000s of application and OS images"
                      className="pl-9"
                    />
                  </div>

                  {/* Quick Start Tabs */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      Quick Start
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                      {osTabs.map((os) => (
                        <button
                          key={os.id}
                          onClick={() => setSelectedOS(os.id)}
                          className={`px-4 py-3 rounded border-2 transition-all cursor-pointer ${
                            selectedOS === os.id
                              ? "border-blue-600 bg-blue-50 shadow-sm"
                              : "border-gray-200 hover:border-gray-300 bg-white hover:shadow-sm"
                          }`}
                        >
                          <div className="flex flex-col items-center gap-2 min-w-[100px]">
                            <div className="w-12 h-12 rounded bg-gray-100 flex items-center justify-center text-2xl">
                              {os.icon}
                            </div>
                            <span className="text-xs font-medium text-gray-700">
                              {os.label}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Browse more AMIs */}
                  <div className="flex items-center gap-2 mb-6">
                    <Search className="h-4 w-4 text-gray-400" />
                    <Link
                      href="#"
                      className="text-blue-600 hover:text-blue-700 text-sm"
                    >
                      Browse more AMIs
                    </Link>
                    <span className="text-sm text-gray-500">
                      Including AMIs from AWS, Marketplace and the Community
                    </span>
                  </div>

                  {/* AMI Details */}
                  <div className="border-t pt-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-4">
                      Amazon Machine Image (AMI)
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="font-medium text-gray-900 mb-2">
                          Amazon Linux 2023 kernel-6.1 AMI
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">AMI ID:</span>{" "}
                            <span className="font-mono">
                              ami-0387413ed05eb20af
                            </span>{" "}
                            (64-bit (x86), uefi-preferred)
                          </div>
                          <div>
                            <span className="font-medium">AMI ID:</span>{" "}
                            <span className="font-mono">
                              ami-07ca4705e507a7a89
                            </span>{" "}
                            (64-bit (Arm), uefi)
                          </div>
                          <div>
                            <span className="font-medium">Virtualization:</span>{" "}
                            hvm
                          </div>
                          <div>
                            <span className="font-medium">ENA enabled:</span>{" "}
                            true
                          </div>
                          <div>
                            <span className="font-medium">
                              Root device type:
                            </span>{" "}
                            ebs
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded border border-gray-200">
                        <div className="text-sm font-medium text-gray-900 mb-2">
                          Description
                        </div>
                        <p className="text-sm text-gray-600">
                          Amazon Linux 2023 (kernel-6.1) is a modern,
                          general-purpose Linux-based operating system with 5
                          years of long-term support. It is optimized for AWS
                          cloud infrastructure and services.
                        </p>
                      </div>

                      <div className="text-sm text-gray-600">
                        <div className="font-medium text-gray-900 mb-1">
                          Amazon Linux 2023 AMI 2023.10.20260105.0 x86_64 HVM
                          kernel-6.1
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Panel - Summary */}
            <div className="w-80 flex-shrink-0">
              <Card className="sticky top-[140px]">
                <CardContent className="pt-6">
                  <h3 className="text-base font-semibold text-gray-900 mb-6">
                    Summary
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-1">
                        Number of instances
                      </div>
                      <Input
                        type="number"
                        defaultValue="1"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-1">
                        Software Image (AMI)
                      </div>
                      <div className="text-sm text-gray-600">
                        Amazon Linux 2023 AMI 2023.10....
                        <Link
                          href="#"
                          className="text-blue-600 hover:text-blue-700 ml-1"
                        >
                          read more
                        </Link>
                      </div>
                      <div className="text-xs text-gray-500 font-mono mt-1">
                        ami-0387413ed05eb20af
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-1">
                        Virtual server type (instance type)
                      </div>
                      <div className="text-sm text-gray-600">t3.micro</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-1">
                        Firewall (security group)
                      </div>
                      <div className="text-sm text-gray-600">
                        New security group
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-1">
                        Storage (volumes)
                      </div>
                      <div className="text-sm text-gray-600">
                        1 volume(s) - 8 GiB
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4 mt-8 pb-8">
            <Link
              href="/console"
              className="text-blue-600 hover:text-blue-700 text-sm"
              onClick={checkQemu}
            >
              Cancel
            </Link>
            <Button
              className="bg-[#ff9900] hover:bg-[#e68900] text-white"
              onClick={handleLaunchInstance}
            >
              Launch instance
            </Button>
            <Link
              href="#"
              className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
            >
              <Code className="h-4 w-4" />
              Preview code
            </Link>
          </div>
        </div>
      </div>
      <ConsoleFooter />
    </div>
  );
}
