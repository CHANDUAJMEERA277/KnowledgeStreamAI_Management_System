"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function Navbar() {
  const [admin, setAdmin] = useState<any>(null);

  useEffect(() => {
    loadAdmin();
  }, []);

  async function loadAdmin() {
    // Get logged-in user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    // Fetch admin details
    const { data } = await supabase
      .from("employees")
      .select("full_name,email")
      .eq("auth_user_id", user.id)
      .single();

    setAdmin(data);
  }

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-8">

      <h2 className="text-white text-xl font-semibold">
        Dashboard
      </h2>

      <div className="flex items-center gap-4">

        <div className="text-right">

          <p className="text-white font-semibold">
            {admin?.full_name || "Loading..."}
          </p>

          <p className="text-slate-400 text-sm">
            {admin?.email || ""}
          </p>

        </div>

        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">

          {admin?.full_name
            ? admin.full_name.charAt(0).toUpperCase()
            : "A"}

        </div>

      </div>

    </header>
  );
}