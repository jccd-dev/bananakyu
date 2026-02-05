"use client";

import * as React from "react";
import {
  SquaresFourIcon,
  BriefcaseIcon,
  FileTextIcon,
  GearIcon,
} from "@phosphor-icons/react";
import { NavUser } from "@/components/nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

/**
 * Main application sidebar component
 * Provides navigation for the Bananakyu job tracker
 */
export function AppSidebar() {
  const menuItems = [
    {
      title: "Dashboard",
      icon: SquaresFourIcon,
      url: "/dashboard",
    },
    {
      title: "Jobs",
      icon: BriefcaseIcon,
      url: "/dashboard/jobs",
    },
    {
      title: "Documents",
      icon: FileTextIcon,
      url: "/dashboard/documents",
    },
    {
      title: "Settings",
      icon: GearIcon,
      url: "/dashboard/settings",
    },
  ];

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://via.placeholder.com/150",
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-sidebar-border border-b px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-lg">
            🍌
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold">BananaKyu</span>
            <span className="text-muted-foreground text-xs">Job Tracker</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-sidebar-border border-t p-4">
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
