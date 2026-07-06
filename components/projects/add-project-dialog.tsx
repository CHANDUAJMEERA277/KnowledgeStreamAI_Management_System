"use client";

import { useState } from "react";
import { addProject } from "@/lib/actions/projects";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AddProjectDialog() {
  const [name, setName] = useState("");
  const [client, setClient] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Planning");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    if (!name) {
      alert("Project name is required.");
      return;
    }

    try {
      setLoading(true);

      await addProject({
        name,
        client,
        description,
        priority,
        status,
        start_date: startDate,
        end_date: endDate,
      });

      alert("✅ Project created successfully!");

      setName("");
      setClient("");
      setDescription("");
      setPriority("Medium");
      setStatus("Planning");
      setStartDate("");
      setEndDate("");

      window.location.reload();
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to create project.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg cursor-pointer transition">
        + Add Project
      </DialogTrigger>

      <DialogContent className="bg-slate-900 border border-slate-700 text-white max-w-xl">
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">

          <input
            type="text"
            placeholder="Project Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 outline-none focus:border-blue-500"
          />

          <input
            type="text"
            placeholder="Client Name"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 outline-none focus:border-blue-500"
          />

          <textarea
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 outline-none focus:border-blue-500 h-28"
          />

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
              <option>Planning</option>
              <option>In Progress</option>
              <option>Completed</option>
              <option>On Hold</option>
            </select>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="text-sm text-slate-400">
                Start Date
              </label>

              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-800 p-3"
              />
            </div>

            <div>
              <label className="text-sm text-slate-400">
                End Date
              </label>

              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-800 p-3"
              />
            </div>

          </div>

          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 py-3 font-semibold text-white transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Project"}
          </button>

        </div>
      </DialogContent>
    </Dialog>
  );
}