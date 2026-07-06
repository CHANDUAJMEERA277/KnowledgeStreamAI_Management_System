"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AddEmployeeDialog() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    if (!fullName || !email || !password) {
      alert("Full Name, Email and Password are required.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/admin/create-employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: fullName,
          email,
          password,
          phone,
          department,
          designation,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error);
      }

      alert("✅ Employee account created successfully!");

      setFullName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setDepartment("");
      setDesignation("");

      window.location.reload();
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to create employee.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg cursor-pointer"
      >
        + Add Employee
      </DialogTrigger>

      <DialogContent className="bg-slate-900 border border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle>Add Employee</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 outline-none focus:border-blue-500"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 outline-none focus:border-blue-500"
          />

          <input
            type="password"
            placeholder="Temporary Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 outline-none focus:border-blue-500"
          />

          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 outline-none focus:border-blue-500"
          />

          <input
            type="text"
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 outline-none focus:border-blue-500"
          />

          <input
            type="text"
            placeholder="Designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 outline-none focus:border-blue-500"
          />

          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 py-3 font-semibold text-white transition disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Employee"}
          </button>

        </div>
      </DialogContent>
    </Dialog>
  );
}