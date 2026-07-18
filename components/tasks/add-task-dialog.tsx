"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Plus, Pencil } from "lucide-react";

import {
  addTask,
  updateTask,
  getEmployees,
} from "@/lib/actions/tasks";

interface Employee {
  id: string;
  full_name: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  employee_id: string;
  priority: string;
  status: string;
  deadline: string;
}

interface AddTaskDialogProps {
  mode?: "add" | "edit";
  task?: Task;
}

export default function AddTaskDialog({
  mode = "add",
  task,
}: AddTaskDialogProps) {
  const isEdit = mode === "edit";

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [employees, setEmployees] = useState<Employee[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Pending");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    async function loadEmployees() {
      try {
        const data = await getEmployees();
        setEmployees(data || []);
      } catch (error) {
        console.error(error);
      }
    }

    if (open) {
      loadEmployees();
    }
  }, [open]);

  useEffect(() => {
    if (task && isEdit) {
      setTitle(task.title);
      setDescription(task.description);
      setEmployeeId(task.employee_id);
      setPriority(task.priority);
      setStatus(task.status);
      setDeadline(task.deadline?.split("T")[0] || "");
    }
  }, [task, isEdit]);

  async function handleSubmit() {
    if (
      !title.trim() ||
      !description.trim() ||
      !employeeId ||
      !priority ||
      !status ||
      !deadline
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      if (isEdit && task) {
        await updateTask(task.id, {
          title,
          description,
          employee_id: employeeId,
          priority,
          status,
          deadline,
        });

        alert("Task updated successfully!");
      } else {
        await addTask({
          title,
          description,
          employee_id: employeeId,
          priority,
          status,
          deadline,
        });

        alert("Task assigned successfully!");
      }

      setTitle("");
      setDescription("");
      setEmployeeId("");
      setPriority("Medium");
      setStatus("Pending");
      setDeadline("");

      setOpen(false);

      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {isEdit ? (
        <Button
          variant="outline"
          size="sm"
          type="button"
          onClick={() => setOpen(true)}
        >
          <Pencil className="w-4 h-4 mr-2" />
          Edit
        </Button>
      ) : (
        <Button
          type="button"
          onClick={() => setOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Assign Task
        </Button>
      )}

      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Task" : "Assign New Task"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Task Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
            />
          </div>

          <div>
            <Label>Description</Label>
            <textarea
              className="w-full border rounded-md p-2 min-h-[120px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
            />
          </div>

          <div>
            <Label>Assign Employee</Label>
            <select
              className="w-full border rounded-md p-2 mt-1"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
            >
              <option value="">Select Employee</option>

              {employees.map((employee) => (
                <option
                  key={employee.id}
                  value={employee.id}
                >
                  {employee.full_name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Priority</Label>

              <select
                className="w-full border rounded-md p-2 mt-1"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <Label>Status</Label>

              <select
                className="w-full border rounded-md p-2 mt-1"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div>
            <Label>Deadline</Label>

            <Input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>

            <Button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading
                ? isEdit
                  ? "Updating..."
                  : "Assigning..."
                : isEdit
                ? "Update Task"
                : "Assign Task"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}