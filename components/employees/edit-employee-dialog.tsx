"use client";

import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";

import { updateEmployee } from "@/lib/actions/employees";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function EditEmployeeDialog({
  employee,
  refresh,
}: {
  employee: any;
  refresh: () => void;
}) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (employee) {
      setFullName(employee.full_name || "");
      setPhone(employee.phone || "");
      setDepartment(employee.department || "");
      setDesignation(employee.designation || "");
    }
  }, [employee]);

  async function handleUpdate() {
    try {
      setLoading(true);

      await updateEmployee(employee.id, {
        full_name: fullName,
        phone,
        department,
        designation,
      });

      alert("Employee updated successfully!");

      refresh();

    } catch (err: any) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog>

      <DialogTrigger className="text-blue-400 hover:text-blue-500 transition">
        <Pencil size={18} />
      </DialogTrigger>

      <DialogContent className="bg-slate-900 border border-slate-800 text-white max-w-lg">

        <DialogHeader>
          <DialogTitle>Edit Employee</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">

          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3"
          />

          <input
            type="email"
            value={employee.email}
            readOnly
            className="w-full rounded-lg border border-slate-700 bg-slate-700 p-3 text-slate-400 cursor-not-allowed"
          />

          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3"
          />

          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="Department"
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3"
          />

          <input
            type="text"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            placeholder="Designation"
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3"
          />

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 py-3 font-semibold"
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>

        </div>

      </DialogContent>

    </Dialog>
  );
}