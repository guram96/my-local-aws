import { ServiceSidebarConfig } from "@/components/service-sidebar";

export const ec2SidebarConfig: ServiceSidebarConfig = {
  serviceName: "Amazon Elastic Compute Cloud",
  serviceAbbreviation: "EC2",
  backHref: "/console",
  defaultExpandedSections: ["Instances"],
  items: [
    { label: "Dashboard", href: "/console/ec2" },
    { label: "EC2 Global View", href: "/console/ec2/global-view", isExternal: true },
    { label: "Events", href: "/console/ec2/events" },
    {
      label: "Instances",
      children: [
        { label: "Instances", href: "/console/ec2/instances" },
        { label: "Instance Types", href: "/console/ec2/instance-types" },
        { label: "Launch Templates", href: "/console/ec2/launch-templates" },
        { label: "Spot Requests", href: "/console/ec2/spot-requests" },
        { label: "Savings Plans", href: "/console/ec2/savings-plans" },
        { label: "Reserved Instances", href: "/console/ec2/reserved-instances" },
        { label: "Dedicated Hosts", href: "/console/ec2/dedicated-hosts" },
        { label: "Capacity Reservations", href: "/console/ec2/capacity-reservations" },
        { label: "Capacity Manager", href: "/console/ec2/capacity-manager", isNew: true },
      ],
    },
    {
      label: "Images",
      children: [
        { label: "AMIs", href: "/console/ec2/amis" },
        { label: "AMI Catalog", href: "/console/ec2/ami-catalog" },
      ],
    },
    {
      label: "Elastic Block Store",
      children: [
        { label: "Volumes", href: "/console/ec2/volumes" },
        { label: "Snapshots", href: "/console/ec2/snapshots" },
        { label: "Lifecycle Manager", href: "/console/ec2/lifecycle-manager" },
      ],
    },
    {
      label: "Network & Security",
      children: [
        { label: "Security Groups", href: "/console/ec2/security-groups" },
        { label: "Elastic IPs", href: "/console/ec2/elastic-ips" },
        { label: "Placement Groups", href: "/console/ec2/placement-groups" },
        { label: "Key Pairs", href: "/console/ec2/key-pairs" },
        { label: "Network Interfaces", href: "/console/ec2/network-interfaces" },
      ],
    },
    {
      label: "Load Balancing",
      children: [
        { label: "Load Balancers", href: "/console/ec2/load-balancers" },
        { label: "Target Groups", href: "/console/ec2/target-groups" },
        { label: "Trust Stores", href: "/console/ec2/trust-stores" },
      ],
    },
  ],
};

export const s3SidebarConfig: ServiceSidebarConfig = {
  serviceName: "Amazon Simple Storage Service",
  serviceAbbreviation: "S3",
  backHref: "/console",
  defaultExpandedSections: [],
  items: [
    { label: "Buckets", href: "/console/s3/buckets" },
    { label: "Access Points", href: "/console/s3/access-points" },
    { label: "Multi-Region Access Points", href: "/console/s3/multi-region-access-points" },
    { label: "Object Lambda Access Points", href: "/console/s3/object-lambda" },
    { label: "Batch Operations", href: "/console/s3/batch-operations" },
    { label: "Storage Lens", href: "/console/s3/storage-lens" },
    { label: "Block Public Access", href: "/console/s3/block-public-access" },
  ],
};

export const lambdaSidebarConfig: ServiceSidebarConfig = {
  serviceName: "AWS Lambda",
  serviceAbbreviation: "Lambda",
  backHref: "/console",
  defaultExpandedSections: [],
  items: [
    { label: "Functions", href: "/console/lambda/functions" },
    { label: "Applications", href: "/console/lambda/applications" },
    { label: "Layers", href: "/console/lambda/layers" },
    { label: "Reserved concurrency", href: "/console/lambda/reserved-concurrency" },
    { label: "Code signing configurations", href: "/console/lambda/code-signing" },
  ],
};

export const rdsSidebarConfig: ServiceSidebarConfig = {
  serviceName: "Amazon Relational Database Service",
  serviceAbbreviation: "RDS",
  backHref: "/console",
  defaultExpandedSections: ["Databases"],
  items: [
    { label: "Dashboard", href: "/console/rds" },
    {
      label: "Databases",
      children: [
        { label: "Databases", href: "/console/rds/databases" },
        { label: "Query Editor", href: "/console/rds/query-editor" },
        { label: "Performance Insights", href: "/console/rds/performance-insights" },
        { label: "Snapshots", href: "/console/rds/snapshots" },
        { label: "Automated backups", href: "/console/rds/automated-backups" },
        { label: "Reserved instances", href: "/console/rds/reserved-instances" },
        { label: "Proxies", href: "/console/rds/proxies" },
      ],
    },
    {
      label: "Subnet groups",
      children: [
        { label: "DB subnet groups", href: "/console/rds/subnet-groups/db" },
        { label: "Elasticache subnet groups", href: "/console/rds/subnet-groups/elasticache" },
      ],
    },
    { label: "Parameter groups", href: "/console/rds/parameter-groups" },
    { label: "Option groups", href: "/console/rds/option-groups" },
    { label: "Events", href: "/console/rds/events" },
    { label: "Event subscriptions", href: "/console/rds/event-subscriptions" },
    { label: "Recommendations", href: "/console/rds/recommendations" },
  ],
};

export const ecsSidebarConfig: ServiceSidebarConfig = {
  serviceName: "Amazon Elastic Container Service",
  serviceAbbreviation: "ECS",
  backHref: "/console",
  defaultExpandedSections: [],
  items: [
    { label: "Clusters", href: "/console/ecs/clusters" },
    { label: "Task Definitions", href: "/console/ecs/task-definitions" },
    { label: "Scheduled Tasks", href: "/console/ecs/scheduled-tasks" },
    { label: "Capacity Providers", href: "/console/ecs/capacity-providers" },
    { label: "Account Settings", href: "/console/ecs/account-settings" },
  ],
};

// Export a map for easy lookup
export const sidebarConfigs: Record<string, ServiceSidebarConfig> = {
  ec2: ec2SidebarConfig,
  s3: s3SidebarConfig,
  lambda: lambdaSidebarConfig,
  rds: rdsSidebarConfig,
  ecs: ecsSidebarConfig,
};
