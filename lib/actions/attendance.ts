import { supabase } from "@/lib/supabase/client";

export async function getAttendance() {
  const { data, error } = await supabase
    .from("attendance")
    .select(`
      *,
      employees (
        full_name,
        department
      )
    `)
    .order("date", { ascending: false });

  if (error) throw error;

  return data;
}