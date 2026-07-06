import { supabase } from "@/lib/supabase/client";

export async function getProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function addProject(project: {
  name: string;
  description: string;
  client: string;
  status: string;
  priority: string;
  start_date: string;
  end_date: string;
}) {
  const { error } = await supabase
    .from("projects")
    .insert([project]);

  if (error) throw error;
}