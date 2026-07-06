import { supabase } from "@/lib/supabase/client";

export async function getDashboardStats() {
  const [
    employees,
    projects,
    tasks,
    eodReports,
  ] = await Promise.all([
    supabase
      .from("employees")
      .select("*", { count: "exact", head: true }),

    supabase
      .from("projects")
      .select("*", { count: "exact", head: true }),

    supabase
      .from("tasks")
      .select("*", { count: "exact", head: true }),

    supabase
      .from("eod_reports")
      .select("*", { count: "exact", head: true }),
  ]);

  return {
    employees: employees.count || 0,
    projects: projects.count || 0,
    tasks: tasks.count || 0,
    pendingEod: eodReports.count || 0,
  };
}