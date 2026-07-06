import { supabase } from "@/lib/supabase/client";

export async function getTasks() {
  const { data, error } = await supabase
    .from("tasks")
    .select(`
      *,
      employees (
        full_name
      )
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function addTask(task: {
  title: string;
  description: string;
  employee_id: string;
  priority: string;
  status: string;
  deadline: string;
}) {
  const { error } = await supabase
    .from("tasks")
    .insert([task]);

  if (error) throw error;
}

export async function getEmployees() {
  const { data, error } = await supabase
    .from("employees")
    .select("id, full_name")
    .order("full_name");

  if (error) throw error;

  return data;
}

export async function updateTaskStatus(
  taskId: string,
  status: string
) {
  const { error } = await supabase
    .from("tasks")
    .update({
      status,
    })
    .eq("id", taskId);

  if (error) throw error;
}