import { redirect } from "next/navigation";

/**
 * Root page redirects to dashboard
 * This is the entry point of the application
 */
export default function Page() {
  redirect("/dashboard");
}