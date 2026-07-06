import { supabase } from "../supabase/client";

export async function getProfile() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not logged in");

  const { data, error } = await supabase
    .from("employees")
    .select(`
      id,
      full_name,
      email,
      department,
      designation,
      profile_photo
    `)
    .eq("auth_user_id", user.id)
    .single();

  if (error) throw error;

  return data;
}

export async function uploadProfilePhoto(file: File) {
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

  const fileName = `${employee.id}-${Date.now()}-${file.name}`;

  const { error: uploadError } = await supabase.storage
    .from("employee-profile")
    .upload(fileName, file, {
      upsert: true,
    });

  if (uploadError) throw uploadError;

  const { error: updateError } = await supabase
    .from("employees")
    .update({
      profile_photo: fileName,
    })
    .eq("id", employee.id);

  if (updateError) throw updateError;

  return fileName;
}