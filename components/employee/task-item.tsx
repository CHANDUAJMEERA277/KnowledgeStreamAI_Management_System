"use client";

import { updateTaskStatus } from "@/lib/actions/tasks";

export default function TaskItem({
  task,
  refresh,
}: {
  task: any;
  refresh: () => void;
}) {
  async function handleChange(status: string) {
    try {
      await updateTaskStatus(task.id, status);
      refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to update task");
    }
  }

  return (
    <div className="border border-slate-800 rounded-xl p-5">

      <div className="flex justify-between">

        <div>

          <h2 className="text-white text-lg font-semibold">
            {task.title}
          </h2>

          <p className="text-slate-400 mt-2">
            {task.description}
          </p>

        </div>

        <div className="text-right">

          <p className="text-yellow-400">
            {task.priority}
          </p>

          <select
            value={task.status}
            onChange={(e) => handleChange(e.target.value)}
            className="mt-3 rounded-lg bg-slate-800 border border-slate-700 p-2 text-white"
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <p className="text-slate-500 text-sm mt-3">
            {task.deadline}
          </p>

        </div>

      </div>

    </div>
  );
}