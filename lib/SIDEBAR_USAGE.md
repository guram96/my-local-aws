# Reusable Service Sidebar

The `ServiceSidebar` component is a generic, reusable sidebar that can be used for any AWS service console page.

## Usage

### 1. Import the necessary components

```tsx
import { ServiceSidebar } from "@/components/service-sidebar";
import { ec2SidebarConfig } from "@/lib/sidebar-configs";
```

### 2. Use the sidebar in your page

```tsx
<ServiceSidebar config={ec2SidebarConfig} />
```

### 3. Add the proper padding to your content

The sidebar is 256px (w-64) wide when expanded, so add `pl-64` to your main content:

```tsx
<div className="pt-[88px] pl-64 pb-12">
  {/* Your content */}
</div>
```

## Creating a New Service Sidebar

### Step 1: Define your sidebar configuration

Add a new configuration to `/lib/sidebar-configs.ts`:

```tsx
export const myServiceSidebarConfig: ServiceSidebarConfig = {
  serviceName: "Full Service Name",
  serviceAbbreviation: "SHORT", // Shown in sidebar header
  backHref: "/console", // Where the back button goes
  defaultExpandedSections: ["Section Name"], // Sections expanded by default
  items: [
    { label: "Dashboard", href: "/console/myservice" },
    { label: "External Link", href: "/link", isExternal: true },
    { 
      label: "Expandable Section",
      children: [
        { label: "Item 1", href: "/console/myservice/item1" },
        { label: "New Feature", href: "/console/myservice/new", isNew: true },
      ]
    },
  ],
};

// Add to the map
export const sidebarConfigs: Record<string, ServiceSidebarConfig> = {
  // ... existing configs
  myservice: myServiceSidebarConfig,
};
```

### Step 2: Use it in your page

```tsx
import { ServiceSidebar } from "@/components/service-sidebar";
import { myServiceSidebarConfig } from "@/lib/sidebar-configs";

export default function MyServicePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ConsoleHeader showSecondBar={true} />
      <ServiceSidebar config={myServiceSidebarConfig} />
      <div className="pt-[88px] pl-64 pb-12">
        {/* Your content */}
      </div>
      <ConsoleFooter />
    </div>
  );
}
```

## Configuration Options

### ServiceSidebarConfig

- `serviceName`: Full name of the service
- `serviceAbbreviation`: Short name shown in sidebar header
- `backHref`: URL for the back button (default: "/console")
- `defaultExpandedSections`: Array of section labels to expand by default
- `items`: Array of sidebar items (see below)

### SidebarItem

- `label`: Display text
- `href`: Link URL (optional for sections with children)
- `isNew`: Show "New" badge
- `isExternal`: Show external link icon
- `children`: Array of child items for expandable sections

## Features

- ✅ Collapsible sidebar with toggle button
- ✅ Expandable/collapsible sections
- ✅ Active route highlighting
- ✅ "New" badges for new features
- ✅ External link indicators
- ✅ Smooth animations and transitions
- ✅ Fixed positioning that works with header
- ✅ Fully responsive and accessible

## Examples

See existing configurations in `/lib/sidebar-configs.ts`:
- EC2 (with multiple expandable sections)
- S3 (simple list)
- Lambda (simple list)
- RDS (with nested sections)
- ECS (simple list)

Check the implementation in:
- `/app/console/ec2/page.tsx` - EC2 example
- `/app/console/s3/page.tsx` - S3 example
