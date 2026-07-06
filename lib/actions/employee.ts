import { supabase } from "@/lib/supabase/client";

export async function getEmployeeDashboard() {
  // Logged in user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not found");

  // Employee record
  const { data: employee, error: empError } = await supabase
    .from("employees")
    .select("id,full_name")
    .eq("auth_user_id", user.id)
    .single();

  if (empError) throw empError;

  // Employee tasks
  const { data: tasks, error: taskError } = await supabase
    .from("tasks")
    .select("*")
    .eq("employee_id", employee.id);

  if (taskError) throw taskError;

  const total = tasks.length;
  const pending = tasks.filter(t => t.status === "Pending").length;
  const progress = tasks.filter(t => t.status === "In Progress").length;
  const completed = tasks.filter(t => t.status === "Completed").length;

  return {
    employee,
    tasks,
    stats: {
      total,
      pending,
      progress,
      completed,
    },
  };
}