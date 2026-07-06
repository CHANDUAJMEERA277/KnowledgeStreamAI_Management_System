"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function EmployeeNavbar() {
  const [employee, setEmployee] = useState<any>(null);

  useEffect(() => {
    loadEmployee();
  }, []);

  async function loadEmployee() {
    // Get logged-in user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    // Fetch employee details
    const { data } = await supabase
      .from("employees")
      .select("full_name,email")
      .eq("auth_user_id", user.id)
      .single();

    setEmployee(data);
  }

  return (
    <header className="h-20 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-8">

      <h1 className="text-2xl font-bold text-white">
        Employee Dashboard
      </h1>

      <div className="flex items-center gap-4">

        <div className="text-right">

          <h2 className="text-white font-semibold">
            {employee?.full_name || "Loading..."}
          </h2>

          <p className="text-slate-400 text-sm">
            {employee?.email || ""}
          </p>

        </div>

        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">

          {employee?.full_name
            ? employee.full_name.charAt(0).toUpperCase()
            : "E"}

        </div>

      </div>

    </header>
  );
}