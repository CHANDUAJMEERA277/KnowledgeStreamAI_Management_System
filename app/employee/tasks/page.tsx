"use client";

import { useEffect, useState } from "react";
import { getEmployeeDashboard } from "@/lib/actions/employee";
import TaskItem from "@/components/employee/task-item";

export default function EmployeeTasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const data = await getEmployeeDashboard();
    setTasks(data.tasks);
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-white">
          My Tasks
        </h1>

        <p className="text-slate-400">
          Manage your assigned tasks.
        </p>
      </div>

      <div className="space-y-5">

        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            refresh={loadTasks}
          />
        ))}

      </div>

    </div>
  );
}