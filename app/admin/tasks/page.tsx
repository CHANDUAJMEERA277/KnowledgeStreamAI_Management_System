"use client";

import { useEffect, useState } from "react";

import {
  getTasks,
  getEmployees,
  deleteTask,
} from "@/lib/actions/tasks";

import AddTaskDialog from "@/components/tasks/add-task-dialog";

import { Button } from "@/components/ui/button";

import { Pencil, Trash2 } from "lucide-react";

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [selectedEmployee, setSelectedEmployee] =
    useState("all");

  useEffect(() => {
    loadEmployees();
  }, []);

  useEffect(() => {
    loadTasks(selectedEmployee);
  }, [selectedEmployee]);

  async function loadEmployees() {
    try {
      const data = await getEmployees();
      setEmployees(data || []);
    } catch (error) {
      console.error(error);
    }
  }

  async function loadTasks(employeeId = "all") {
    try {
      const data = await getTasks(employeeId);
      setTasks(data || []);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(taskId: string) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      await deleteTask(taskId);

      loadTasks(selectedEmployee);

      alert("Task deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Unable to delete task.");
    }
  }

  function priorityColor(priority: string) {
    switch (priority) {
      case "Critical":
        return "bg-red-600/20 text-red-400";

      case "High":
        return "bg-orange-600/20 text-orange-400";

      case "Medium":
        return "bg-yellow-600/20 text-yellow-400";

      default:
        return "bg-green-600/20 text-green-400";
    }
  }

  function statusColor(status: string) {
    switch (status) {
      case "Completed":
        return "bg-green-600/20 text-green-400";

      case "In Progress":
        return "bg-blue-600/20 text-blue-400";

      default:
        return "bg-orange-600/20 text-orange-400";
    }
  }

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Tasks
          </h1>

          <p className="text-slate-400 mt-2">
            Assign and manage employee tasks
          </p>

        </div>

        <div className="flex items-center gap-4">

          <select
            value={selectedEmployee}
            onChange={(e) =>
              setSelectedEmployee(e.target.value)
            }
            className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white"
          >
            <option value="all">
              All Employees
            </option>

            {employees.map((emp) => (
              <option
                key={emp.id}
                value={emp.id}
              >
                {emp.full_name}
              </option>
            ))}

          </select>

          <AddTaskDialog />

        </div>

      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-800">

            <tr>

              <th className="px-6 py-4 text-left text-slate-300">
                Task
              </th>

              <th className="px-6 py-4 text-left text-slate-300">
                Employee
              </th>

              <th className="px-6 py-4 text-left text-slate-300">
                Priority
              </th>

              <th className="px-6 py-4 text-left text-slate-300">
                Status
              </th>

              <th className="px-6 py-4 text-left text-slate-300">
                Deadline
              </th>

              <th className="px-6 py-4 text-center text-slate-300">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>
                        {tasks.length === 0 ? (

              <tr>

                <td
                  colSpan={6}
                  className="py-12 text-center text-slate-500"
                >
                  No Tasks Found
                </td>

              </tr>

            ) : (

              tasks.map((task) => (

                <tr
                  key={task.id}
                  className="border-t border-slate-800 hover:bg-slate-800/40 transition"
                >

                  <td className="px-6 py-5">

                    <div className="font-semibold text-white">
                      {task.title}
                    </div>

                    <div className="text-sm text-slate-400 mt-1">
                      {task.description}
                    </div>

                  </td>

                  <td className="px-6 py-5 text-slate-300">
                    {task.employees?.full_name}
                  </td>

                  <td className="px-6 py-5">

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${priorityColor(
                        task.priority
                      )}`}
                    >
                      {task.priority}
                    </span>

                  </td>

                  <td className="px-6 py-5">

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${statusColor(
                        task.status
                      )}`}
                    >
                      {task.status}
                    </span>

                  </td>

                  <td className="px-6 py-5 text-slate-300">
                    {new Date(task.deadline).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-5">

                    <div className="flex items-center justify-center gap-2">

                      <AddTaskDialog
                        mode="edit"
                        task={task}
                      />

                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() =>
                          handleDelete(task.id)
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>

                    </div>

                  </td>

                </tr>

              ))

            )}
                      </tbody>

        </table>

      </div>

    </div>
  );
}