import { supabase } from "@/lib/supabase/client";

export async function getEmployees() {
  const { data, error } = await supabase
    .from("employees")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function addEmployee(employee: {
  full_name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
}) {
  const { data, error } = await supabase
    .from("employees")
    .insert([employee])
    .select();

  if (error) throw error;

  return data;
}

export async function updateEmployee(
  id: string,
  employee: {
    full_name: string;
    phone: string;
    department: string;
    designation: string;
  }
) {
  const { error } = await supabase
    .from("employees")
    .update(employee)
    .eq("id", id);

  if (error) throw error;
}

export async function deleteEmployee(id: string) {
  const { error } = await supabase
    .from("employees")
    .delete()
    .eq("id", id);

  if (error) throw error;
}