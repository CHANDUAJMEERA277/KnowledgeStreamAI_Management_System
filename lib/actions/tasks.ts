import { supabase } from "@/lib/supabase/client";


export async function getTasks(employeeId?: string) {
  let query = supabase
    .from("tasks")
    .select(`
      *,
      employees (
        id,
        full_name
      )
    `);

  if (employeeId && employeeId !== "all") {
    query = query.eq("employee_id", employeeId);
  }

  const { data, error } = await query.order("created_at", {
    ascending: false,
  });

  if (error) throw error;

  return data;
}

/* ===========================
   GET EMPLOYEES
=========================== */

export async function getEmployees() {
  const { data, error } = await supabase
    .from("employees")
    .select(`
      id,
      full_name
    `)
    .order("full_name");

  if (error) throw error;

  return data;
}

/* ===========================
   ADD TASK
=========================== */

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



/* ===========================
   UPDATE TASK STATUS
=========================== */

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

/* ===========================
   UPDATE TASK
=========================== */

export async function updateTask(
  taskId: string,
  task: {
    title: string;
    description: string;
    employee_id: string;
    priority: string;
    status: string;
    deadline: string;
  }
) {
  const { error } = await supabase
    .from("tasks")
    .update(task)
    .eq("id", taskId);

  if (error) throw error;
}

/* ===========================
   DELETE TASK
=========================== */

export async function deleteTask(taskId: string) {
  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", taskId);

  if (error) throw error;
}