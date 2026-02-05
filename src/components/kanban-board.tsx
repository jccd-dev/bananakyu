"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DotsThree, Plus } from "@phosphor-icons/react";

/**
 * Status configuration for the job pipeline
 * Maps each status to a display label and color
 */
const STATUS_CONFIG = {
  APPLYING: { label: "To Apply", color: "bg-muted" },
  APPLIED: { label: "Applied", color: "bg-blue-500/10 text-blue-700" },
  FOR_INTERVIEW: { label: "For Interview", color: "bg-purple-500/10 text-purple-700" },
  INTERVIEWING: { label: "Interviewing", color: "bg-primary/10 text-primary" },
  OFFER: { label: "Offer", color: "bg-secondary/10 text-secondary-foreground" },
  NEGOTIATING: { label: "Negotiating", color: "bg-yellow-500/10 text-yellow-700" },
  HIRED: { label: "Hired", color: "bg-green-500/10 text-green-700" },
  ON_HOLD: { label: "On Hold", color: "bg-gray-500/10 text-gray-700" },
  REJECTED: { label: "Rejected", color: "bg-red-500/10 text-red-700" },
  NO_RESPONSE: { label: "No Response", color: "bg-orange-500/10 text-orange-700" },
  WITHDRAW: { label: "Withdrawn", color: "bg-gray-500/10 text-gray-700" },
} as const;

type JobStatus = keyof typeof STATUS_CONFIG;

interface Job {
  id: string;
  company: string;
  position: string;
  status: JobStatus;
  url?: string | null;
  salary?: string | null;
  note?: string | null;
  createdAt: Date;
}

interface KanbanBoardProps {
  jobs: Job[];
  onStatusChange?: (jobId: string, newStatus: JobStatus) => void;
  onJobClick?: (job: Job) => void;
  onAddJob?: (status: JobStatus) => void;
}

/**
 * Kanban board component for visualizing job applications
 * Displays jobs in columns based on their status
 */
export function KanbanBoard({ jobs, onStatusChange, onJobClick, onAddJob }: KanbanBoardProps) {
  const columns = Object.keys(STATUS_CONFIG) as JobStatus[];

  /**
   * Groups jobs by their status
   */
  const jobsByStatus = React.useMemo(() => {
    const grouped: Record<JobStatus, Job[]> = {
      APPLYING: [],
      APPLIED: [],
      FOR_INTERVIEW: [],
      INTERVIEWING: [],
      OFFER: [],
      NEGOTIATING: [],
      HIRED: [],
      ON_HOLD: [],
      REJECTED: [],
      NO_RESPONSE: [],
      WITHDRAW: [],
    };

    jobs.forEach((job) => {
      grouped[job.status].push(job);
    });

    return grouped;
  }, [jobs]);

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {columns.map((status) => (
        <KanbanColumn
          key={status}
          status={status}
          jobs={jobsByStatus[status]}
          onStatusChange={onStatusChange}
          onJobClick={onJobClick}
          onAddJob={onAddJob}
        />
      ))}
    </div>
  );
}

interface KanbanColumnProps {
  status: JobStatus;
  jobs: Job[];
  onStatusChange?: (jobId: string, newStatus: JobStatus) => void;
  onJobClick?: (job: Job) => void;
  onAddJob?: (status: JobStatus) => void;
}

/**
 * Individual column in the kanban board
 * Displays all jobs with a specific status
 */
function KanbanColumn({ status, jobs, onStatusChange, onJobClick, onAddJob }: KanbanColumnProps) {
  const config = STATUS_CONFIG[status];

  return (
    <div className="flex min-w-[280px] flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">{config.label}</h3>
          <Badge variant="secondary" className="rounded-full">
            {jobs.length}
          </Badge>
        </div>
        {onAddJob && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onAddJob(status)}
            className="h-8 w-8 p-0"
          >
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onStatusChange={onStatusChange}
            onClick={onJobClick}
          />
        ))}
        {jobs.length === 0 && (
          <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 text-center text-sm text-muted-foreground">
            No jobs yet
          </div>
        )}
      </div>
    </div>
  );
}

interface JobCardProps {
  job: Job;
  onStatusChange?: (jobId: string, newStatus: JobStatus) => void;
  onClick?: (job: Job) => void;
}

/**
 * Individual job card displayed in the kanban board
 * Shows job details and allows status changes
 */
function JobCard({ job, onStatusChange, onClick }: JobCardProps) {
  const config = STATUS_CONFIG[job.status];

  return (
    <Card
      className="cursor-pointer transition-all hover:shadow-md"
      onClick={() => onClick?.(job)}
    >
      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-sm font-semibold">{job.company}</CardTitle>
          {onStatusChange && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <DotsThree className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {(Object.keys(STATUS_CONFIG) as JobStatus[]).map((status) => (
                  <DropdownMenuItem
                    key={status}
                    onClick={(e) => {
                      e.stopPropagation();
                      onStatusChange(job.id, status);
                    }}
                  >
                    Move to {STATUS_CONFIG[status].label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground">{job.position}</p>
        {job.salary && (
          <p className="mt-2 text-xs font-medium text-foreground">{job.salary}</p>
        )}
        <Badge className={`mt-2 ${config.color}`} variant="secondary">
          {config.label}
        </Badge>
      </CardContent>
    </Card>
  );
}
