"use client";

import * as React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { KanbanBoard } from "@/components/kanban-board";
import { JobsTable } from "@/components/jobs-table";
import { Plus, Kanban, Table } from "@phosphor-icons/react";

/**
 * Mock data for development
 * TODO: Replace with real data from tRPC
 */
const MOCK_JOBS = [
  {
    id: "1",
    company: "Google",
    position: "Senior Software Engineer",
    status: "INTERVIEWING" as const,
    salary: "$150k - $200k",
    note: "Phone screen scheduled for next week",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    company: "Meta",
    position: "Frontend Developer",
    status: "APPLIED" as const,
    salary: "$140k - $180k",
    note: null,
    createdAt: new Date("2024-01-20"),
  },
  {
    id: "3",
    company: "Amazon",
    position: "Full Stack Engineer",
    status: "FOR_INTERVIEW" as const,
    salary: "$130k - $170k",
    note: "Recruiter reached out",
    createdAt: new Date("2024-01-18"),
  },
  {
    id: "4",
    company: "Netflix",
    position: "Software Engineer",
    status: "OFFER" as const,
    salary: "$160k - $210k",
    note: "Offer received! Negotiating",
    createdAt: new Date("2024-01-10"),
  },
  {
    id: "5",
    company: "Apple",
    position: "iOS Developer",
    status: "REJECTED" as const,
    salary: "$145k - $185k",
    note: "Not a good fit",
    createdAt: new Date("2024-01-05"),
  },
];

/**
 * Main dashboard page component
 * Displays job applications in both Kanban and Table views
 */
export default function DashboardPage() {
  const [jobs, setJobs] = React.useState(MOCK_JOBS);
  const [view, setView] = React.useState<"kanban" | "table">("kanban");

  /**
   * Handles status change for a job
   * TODO: Implement with tRPC mutation
   */
  const handleStatusChange = (jobId: string, newStatus: string) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, status: newStatus as any } : job
      )
    );
  };

  /**
   * Handles job click to view details
   * TODO: Open job details dialog
   */
  const handleJobClick = (job: any) => {
    console.log("Job clicked:", job);
    // TODO: Open job details dialog
  };

  /**
   * Handles adding a new job
   * TODO: Open add job dialog
   */
  const handleAddJob = () => {
    console.log("Add job clicked");
    // TODO: Open add job dialog
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Jobs</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Header with actions */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Job Applications</h1>
              <p className="text-muted-foreground">
                Track and manage your job search journey
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center rounded-lg border bg-background p-1">
                <Button
                  variant={view === "kanban" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setView("kanban")}
                  className="gap-2"
                >
                  <Kanban className="h-4 w-4" />
                  Board
                </Button>
                <Button
                  variant={view === "table" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setView("table")}
                  className="gap-2"
                >
                  <Table className="h-4 w-4" />
                  List
                </Button>
              </div>
              <Button onClick={handleAddJob} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Job
              </Button>
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-lg border bg-card p-4">
              <div className="text-2xl font-bold">{jobs.length}</div>
              <div className="text-sm text-muted-foreground">Total Applications</div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="text-2xl font-bold">
                {jobs.filter((j) => j.status === "INTERVIEWING").length}
              </div>
              <div className="text-sm text-muted-foreground">Interviewing</div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="text-2xl font-bold">
                {jobs.filter((j) => j.status === "OFFER").length}
              </div>
              <div className="text-sm text-muted-foreground">Offers</div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="text-2xl font-bold">
                {jobs.filter((j) => j.status === "HIRED").length}
              </div>
              <div className="text-sm text-muted-foreground">Hired</div>
            </div>
          </div>

          {/* Main content area */}
          <div className="flex-1 rounded-xl border bg-muted/50 p-4">
            {view === "kanban" ? (
              <KanbanBoard
                jobs={jobs}
                onStatusChange={handleStatusChange}
                onJobClick={handleJobClick}
                onAddJob={handleAddJob}
              />
            ) : (
              <JobsTable
                jobs={jobs}
                onStatusChange={handleStatusChange}
                onJobClick={handleJobClick}
              />
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
