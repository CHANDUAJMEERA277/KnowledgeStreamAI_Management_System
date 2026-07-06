"use client";

import { useEffect, useState } from "react";

import StatCard from "@/components/dashboard/stat-card";
import { getDashboardStats } from "@/lib/actions/dashboard";

import {
  Users,
  FolderKanban,
  CheckSquare,
  FileText,
} from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    employees: 0,
    projects: 0,
    tasks: 0,
    pendingEod: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <h1 className="text-2xl text-white">
          Loading Dashboard...
        </h1>
      </div>
    );
  }

  return (
    <div>

      <h1 className="text-4xl font-bold text-white">
        Welcome Back 👋
      </h1>

      <p className="text-slate-400 mt-2">
        Here's today's overview.
      </p>

      <div className="grid grid-cols-4 gap-6 mt-10">

        <StatCard
          title="Employees"
          value={stats.employees.toString()}
          icon={Users}
        />

        <StatCard
          title="Projects"
          value={stats.projects.toString()}
          icon={FolderKanban}
        />

        <StatCard
          title="Tasks"
          value={stats.tasks.toString()}
          icon={CheckSquare}
        />

        <StatCard
          title="EOD Reports"
          value={stats.pendingEod.toString()}
          icon={FileText}
        />

      </div>

    </div>
  );
}