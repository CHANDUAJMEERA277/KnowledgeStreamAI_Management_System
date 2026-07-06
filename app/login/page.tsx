"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
  alert(error.message);
  return;
}

const {
  data: { user },
} = await supabase.auth.getUser();

if (!user) {
  alert("User not found");
  return;
}

const { data: employee } = await supabase
  .from("employees")
  .select("role")
  .eq("auth_user_id", user.id)
  .single();

if (!employee) {
  alert("Employee record not found");
  return;
}

if (employee.role === "admin") {
  router.push("/admin/dashboard");
} else {
  router.push("/employee/dashboard");
}
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-black p-4">

      <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900/70 backdrop-blur-xl p-8">

        <h1 className="text-4xl font-bold text-center text-white">
          Knowledge Stream
        </h1>

        <p className="text-center text-slate-400 mb-8">
          Workspace
        </p>

        <form onSubmit={handleLogin} className="space-y-5">

          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-lg bg-slate-800 border border-slate-700 p-3 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full rounded-lg bg-slate-800 border border-slate-700 p-3 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              className="absolute right-4 top-4 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>

    </main>
  );
}