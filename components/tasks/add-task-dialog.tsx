"use client";

import { useEffect, useState } from "react";
import { addTask, getEmployees } from "@/lib/actions/tasks";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AddTaskDialog() {
  const [employees, setEmployees] = useState<any[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Pending");
  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadEmployees();
  }, []);

  async function loadEmployees() {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSave() {
    if (!title || !employeeId) {
      alert("Task Title and Employee are required.");
      return;
    }

    try {
      setLoading(true);

      await addTask({
        title,
        description,
        employee_id: employeeId,
        priority,
        status,
        deadline,
      });

      alert("✅ Task Assigned Successfully!");

      window.location.reload();
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to create task.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog>

      <DialogTrigger className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg cursor-pointer">
        + Assign Task
      </DialogTrigger>

      <DialogContent className="bg-slate-900 text-white max-w-xl">

        <DialogHeader>
          <DialogTitle>Assign New Task</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">

          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3"
          />

          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 h-24"
          />

          <select
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3"
          >
            <option value="">Select Employee</option>

            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.full_name}
              </option>
            ))}

          </select>

          <div className="grid grid-cols-2 gap-4">

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-800 p-3"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-800 p-3"
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>

          </div>

          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3"
          />

          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 py-3 font-semibold"
          >
            {loading ? "Assigning..." : "Assign Task"}
          </button>

        </div>

      </DialogContent>

    </Dialog>
  );
}