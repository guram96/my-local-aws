"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth/auth-client";
import {
  ChevronDown,
  Container,
  Grid3x3,
  Search,
  Server,
  Terminal,
} from "lucide-react";
import { useEffect, useState } from "react";
import ReactTerminal from "react-terminal-component";
import { NotificationsPopup } from "@/components/notifications-popup";
import { SupportPopup } from "@/components/support-popup";
import { SettingsPopup } from "@/components/settings-popup";

export function ConsoleHeader() {
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [region, setRegion] = useState("Europe (Frankfurt)");

  useEffect(() => {
    authClient.getSession().then((session) => {
      if (session?.data?.user) {
        setUser(session.data.user);
      }
    });
  }, []);

  const accountId = "7113-8710-5200";
  const username = user?.email?.split("@")[0] || "guro.soselia";

  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            document.cookie.split(";").forEach((cookie) => {
              const eqPos = cookie.indexOf("=");
              const name =
                eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
              document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
              document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
              if (window.location.hostname.includes(".")) {
                const domainParts = window.location.hostname.split(".");
                if (domainParts.length > 1) {
                  const rootDomain = "." + domainParts.slice(-2).join(".");
                  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${rootDomain}`;
                }
              }
            });
            setTimeout(() => {
              window.location.href = "/";
            }, 100);
          },
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
      window.location.href = "/";
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar */}
      <div className="bg-[#232f3e] border-b border-[#1a232e]">
        <div className="flex items-center h-12 px-4 gap-4">
          {/* Left Section */}
          <div className="flex items-center gap-4 flex-1">
            {/* AWS Logo */}
            <div className="text-white font-semibold text-lg tracking-tight">
              aws
            </div>

            {/* Services Icon */}
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 h-8 w-8"
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>

            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search"
                className="pl-9 pr-24 bg-[#1a232e] border-[#3a4553] text-white placeholder:text-gray-400 focus-visible:ring-[#ff9900]/20 focus-visible:border-[#ff9900] h-8"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 bg-[#3a4553] rounded text-xs text-gray-300">
                <span>⌥S</span>
                <Search className="h-3 w-3" />
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Icons */}
            <Drawer direction="bottom">
              <DrawerTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 h-8 w-8"
                >
                  <Terminal className="h-4 w-4" />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="max-h-[80vh]">
                <DrawerTitle className="sr-only">Terminal</DrawerTitle>
                <div className="p-4">
                  <ReactTerminal />
                </div>
              </DrawerContent>
            </Drawer>
            <NotificationsPopup />
            <SupportPopup />
            <SettingsPopup />

            {/* Region Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10 h-8 px-3 gap-1"
                >
                  <span className="text-sm">{region}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Select Region</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setRegion("Europe (Frankfurt)")}
                >
                  Europe (Frankfurt)
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setRegion("US East (N. Virginia)")}
                >
                  US East (N. Virginia)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRegion("US West (Oregon)")}>
                  US West (Oregon)
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setRegion("Asia Pacific (Tokyo)")}
                >
                  Asia Pacific (Tokyo)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Account Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10 h-8 px-3 gap-1"
                >
                  <div className="flex flex-col items-start">
                    <span className="text-xs leading-tight">
                      Account ID: {accountId}
                    </span>
                    <span className="text-xs leading-tight">{username}</span>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel>Account Information</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="px-2 py-1.5">
                  <div className="text-xs text-muted-foreground">
                    Account ID
                  </div>
                  <div className="text-sm font-medium">{accountId}</div>
                </div>
                <div className="px-2 py-1.5">
                  <div className="text-xs text-muted-foreground">Username</div>
                  <div className="text-sm font-medium">{username}</div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Switch Role</DropdownMenuItem>
                <DropdownMenuItem>My Account</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Second Bar */}
      <div className="bg-[#1a232e] border-b border-[#0f1419]">
        <div className="flex items-center h-10 px-4 gap-4">
          {/* EC2 Link */}
          <a
            href="#"
            className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-white/5 transition-colors group"
          >
            <div className="w-5 h-5 rounded bg-[#ff9900] flex items-center justify-center">
              <Server className="h-3 w-3 text-white" />
            </div>
            <span className="text-sm text-white group-hover:text-[#ff9900] transition-colors">
              EC2
            </span>
          </a>

          {/* Elastic Container Service Link */}
          <a
            href="#"
            className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-white/5 transition-colors group"
          >
            <div className="w-5 h-5 rounded bg-[#ff9900] flex items-center justify-center">
              <Container className="h-3 w-3 text-white" />
            </div>
            <span className="text-sm text-white group-hover:text-[#ff9900] transition-colors">
              Elastic Container Service
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
