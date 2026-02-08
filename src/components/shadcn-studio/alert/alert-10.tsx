"use client";

import { useState } from "react";

import {
  CheckCircleIcon,
  InfoIcon,
  WarningCircleIcon,
  XCircleIcon,
  XIcon,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

/**
 * Props interface for the DismissibleAlert component
 * Defines the shape of data needed to render a customizable alert
 */
interface DismissibleAlertProps {
  /** The main heading text of the alert */
  title: string;
  /** The detailed message or description */
  description: string;
  /** Visual variant that determines the color scheme and default icon */
  variant?: "warning" | "info" | "success" | "error";
  /** Custom icon component to override the default variant icon */
  icon?: Icon;
  /** Whether the alert can be dismissed by the user */
  dismissible?: boolean;
  /** Callback function triggered when the alert is dismissed */
  onDismiss?: () => void;
  /** Additional CSS classes for custom styling */
  className?: string;
}

/**
 * Variant configuration mapping
 * Maps each variant to its corresponding icon and color classes
 */
const variantConfig = {
  warning: {
    icon: WarningCircleIcon,
    className:
      "border-yellow-500/20 bg-yellow-50 text-yellow-900 dark:bg-yellow-950 dark:text-yellow-100",
  },
  info: {
    icon: InfoIcon,
    className:
      "border-blue-500/20 bg-blue-50 text-blue-900 dark:bg-blue-950 dark:text-blue-100",
  },
  success: {
    icon: CheckCircleIcon,
    className:
      "border-green-500/20 bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-100",
  },
  error: {
    icon: XCircleIcon,
    className:
      "border-red-500/20 bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-100",
  },
} as const;

/**
 * A reusable alert component with optional dismiss functionality
 * Supports multiple variants (warning, info, success, error) with theme-aware styling
 *
 * @param props - The component props
 * @returns A dismissible alert component or null if dismissed
 */
const DismissibleAlert = ({
  title,
  description,
  variant = "warning",
  icon: CustomIcon,
  dismissible = true,
  onDismiss,
  className,
}: DismissibleAlertProps) => {
  // Track whether the alert is currently visible
  const [isActive, setIsActive] = useState(true);

  /**
   * Handles the dismiss action
   * Updates internal state and calls the optional onDismiss callback
   */
  const handleDismiss = () => {
    setIsActive(false);
    onDismiss?.();
  };

  // Don't render anything if the alert has been dismissed
  if (!isActive) return null;

  // Determine which icon to use (custom or variant default)
  const IconComponent = CustomIcon ?? variantConfig[variant].icon;
  const variantClassName = variantConfig[variant].className;

  return (
    <Alert className={cn("flex justify-between", variantClassName, className)}>
      <IconComponent className="size-5" />
      <div className="flex flex-1 flex-col gap-1">
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription className="opacity-80">
          {description}
        </AlertDescription>
      </div>
      {dismissible && (
        <button
          className="cursor-pointer transition-opacity hover:opacity-70"
          onClick={handleDismiss}
          aria-label="Dismiss alert"
        >
          <XIcon className="size-5" />
          <span className="sr-only">Close</span>
        </button>
      )}
    </Alert>
  );
};

export default DismissibleAlert;
