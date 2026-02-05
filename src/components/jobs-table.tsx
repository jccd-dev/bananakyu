"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsThree, ArrowsDownUp } from "@phosphor-icons/react";

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

type SortField = "company" | "position" | "status" | "createdAt";
type SortDirection = "asc" | "desc";

interface JobsTableProps {
  jobs: Job[];
  onStatusChange?: (jobId: string, newStatus: JobStatus) => void;
  onJobClick?: (job: Job) => void;
}

/**
 * Table view component for job applications
 * Provides a compact, sortable list of all jobs
 */
export function JobsTable({ jobs, onStatusChange, onJobClick }: JobsTableProps) {
  const [sortField, setSortField] = React.useState<SortField>("createdAt");
  const [sortDirection, setSortDirection] = React.useState<SortDirection>("desc");

  /**
   * Toggles sort direction or changes sort field
   */
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  /**
   * Sorts jobs based on current sort field and direction
   */
  const sortedJobs = React.useMemo(() => {
    return [...jobs].sort((a, b) => {
      let aValue: string | Date = a[sortField];
      let bValue: string | Date = b[sortField];

      // Handle null/undefined values
      if (!aValue) return 1;
      if (!bValue) return -1;

      // Convert to comparable values
      if (sortField === "createdAt") {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      } else {
        aValue = String(aValue).toLowerCase();
        bValue = String(bValue).toLowerCase();
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [jobs, sortField, sortDirection]);

  /**
   * Formats date to a readable string
   */
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort("company")}
                className="flex items-center gap-1"
              >
                Company
                <ArrowsDownUp className="h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort("position")}
                className="flex items-center gap-1"
              >
                Position
                <ArrowsDownUp className="h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort("status")}
                className="flex items-center gap-1"
              >
                Status
                <ArrowsDownUp className="h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead>Salary</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort("createdAt")}
                className="flex items-center gap-1"
              >
                Date Added
                <ArrowsDownUp className="h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                No jobs found. Start adding your applications!
              </TableCell>
            </TableRow>
          ) : (
            sortedJobs.map((job) => (
              <TableRow
                key={job.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => onJobClick?.(job)}
              >
                <TableCell className="font-medium">{job.company}</TableCell>
                <TableCell>{job.position}</TableCell>
                <TableCell>
                  <Badge
                    className={STATUS_CONFIG[job.status].color}
                    variant="secondary"
                  >
                    {STATUS_CONFIG[job.status].label}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {job.salary || "-"}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(job.createdAt)}
                </TableCell>
                <TableCell>
                  {onStatusChange && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
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
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
