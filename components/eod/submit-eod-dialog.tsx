"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  getAssignedTasks,
  submitEod,
} from "@/lib/actions/eod";

export default function SubmitEodDialog({
  refresh,
}: {
  refresh: () => void;
}) {
  const [tasks, setTasks] = useState<any[]>([]);
  const [taskId, setTaskId] = useState("");
  const [progress, setProgress] = useState("25");
  const [remarks, setRemarks] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      const data = await getAssignedTasks();

      console.log("Assigned Tasks:", data);

      setTasks(data || []);
    } catch (err) {
      console.error("Failed to load tasks:", err);
    }
  }

  async function handleSubmit() {
    if (!taskId) {
      alert("Please select a task.");
      return;
    }

    if (!remarks.trim()) {
      alert("Please enter remarks.");
      return;
    }

    if (!file) {
      alert("Please upload a file.");
      return;
    }

    try {
      setLoading(true);

      await submitEod(
        taskId,
        Number(progress),
        remarks,
        file
      );

      alert("✅ EOD Submitted Successfully");

      setTaskId("");
      setProgress("25");
      setRemarks("");
      setFile(null);

      refresh();

      window.location.reload();
    } catch (err: any) {
      console.error(err);

      alert(err.message || "Failed to submit EOD");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg">
        + Submit EOD
      </DialogTrigger>

      <DialogContent className="bg-slate-900 text-white max-w-xl">

        <DialogHeader>
          <DialogTitle>Submit EOD Report</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 mt-4">

          <select
            value={taskId}
            onChange={(e) => setTaskId(e.target.value)}
            className="w-full rounded-lg bg-slate-800 border border-slate-700 p-3"
          >
            <option value="">Select Task</option>

            {tasks.map((task) => (
              <option key={task.id} value={task.id}>
                {task.title}
              </option>
            ))}
          </select>

          <select
            value={progress}
            onChange={(e) => setProgress(e.target.value)}
            className="w-full rounded-lg bg-slate-800 border border-slate-700 p-3"
          >
            <option value="25">25%</option>
            <option value="50">50%</option>
            <option value="75">75%</option>
            <option value="100">100%</option>
          </select>

          <textarea
            rows={5}
            placeholder="Today's work summary..."
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="w-full rounded-lg bg-slate-800 border border-slate-700 p-3"
          />

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => {
              if (e.target.files?.length) {
                setFile(e.target.files[0]);
              }
            }}
            className="w-full rounded-lg bg-slate-800 border border-slate-700 p-3"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg py-3 font-semibold disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit EOD"}
          </button>

        </div>

      </DialogContent>
    </Dialog>
  );
}