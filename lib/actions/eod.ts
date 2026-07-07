import { supabase } from "../supabase/client";

/* ===========================
   EMPLOYEE SIDE
=========================== */

export async function getAssignedTasks() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not logged in");

  const { data: employee, error: empError } = await supabase
    .from("employees")
    .select("id")
    .eq("auth_user_id", user.id)
    .single();

  if (empError) throw empError;

  const { data, error } = await supabase
    .from("tasks")
    .select(`
      id,
      title,
      status
    `)
    .eq("employee_id", employee.id)
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data;
}

export async function getMyReports() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not logged in");

  const { data: employee, error: empError } = await supabase
    .from("employees")
    .select("id")
    .eq("auth_user_id", user.id)
    .single();

  if (empError) throw empError;

  const { data, error } = await supabase
    .from("eod_reports")
    .select(`
      *,
      tasks(
        title
      )
    `)
    .eq("employee_id", employee.id)
    .order("submitted_at", {
      ascending: false,
    });

  if (error) throw error;

  return data;
}

export async function submitEod(
  taskId: string,
  progress: number,
  remarks: string,
  file: File
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not logged in");

  const { data: employee, error: empError } = await supabase
    .from("employees")
    .select("id")
    .eq("auth_user_id", user.id)
    .single();

  if (empError) throw empError;

  const fileName = `${Date.now()}-${file.name}`;

  const { error: uploadError } = await supabase.storage
    .from("eod-files")
    .upload(fileName, file);

  if (uploadError) throw uploadError;

  const { error } = await supabase
    .from("eod_reports")
    .insert([
      {
        employee_id: employee.id,
        task_id: taskId,
        progress,
        remarks,
        file_name: file.name,
        file_url: fileName,
      },
    ]);

  if (error) throw error;
}

/* ===========================
   ADMIN SIDE
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

export async function getAllReports(
  employeeId?: string
) {
  let query = supabase
    .from("eod_reports")
    .select(`
      *,
      employees(
        id,
        full_name
      ),
      tasks(
        title
      )
    `);

  if (
    employeeId &&
    employeeId !== "all"
  ) {
    query = query.eq(
      "employee_id",
      employeeId
    );
  }

  const { data, error } = await query.order(
    "submitted_at",
    {
      ascending: false,
    }
  );

  if (error) throw error;

  return data;
}