"use client";

import { useEffect, useState } from "react";
import { getEmployeeDashboard } from "@/lib/actions/employee";
import TaskItem from "@/components/employee/task-item";

export default function EmployeeDashboard() {
  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const data = await getEmployeeDashboard();
      setDashboard(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <h1 className="text-2xl text-white">Loading Dashboard...</h1>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <h1 className="text-2xl text-red-500">
          Failed to load dashboard
        </h1>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-white">
          Welcome, {dashboard.employee.full_name} 👋
        </h1>

        <p className="text-slate-400 mt-2">
          Here's your work summary for today.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard
          title="Total Tasks"
          value={dashboard.stats.total}
        />

        <StatCard
          title="Pending"
          value={dashboard.stats.pending}
        />

        <StatCard
          title="In Progress"
          value={dashboard.stats.progress}
        />

        <StatCard
          title="Completed"
          value={dashboard.stats.completed}
        />

      </div>

      <div className="bg-slate-900 rounded-xl p-6">

        <h2 className="text-2xl font-bold text-white mb-6">
          My Assigned Tasks
        </h2>

        {dashboard.tasks.length === 0 ? (

          <div className="text-center text-slate-400 py-12">
            No tasks assigned yet.
          </div>

        ) : (

          <div className="space-y-5">

            {dashboard.tasks.map((task: any) => (

              <TaskItem
                key={task.id}
                task={task}
                refresh={loadDashboard}
              />

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">

      <p className="text-slate-400 text-sm">
        {title}
      </p>

      <h2 className="text-4xl font-bold text-white mt-3">
        {value}
      </h2>

    </div>
  );
}