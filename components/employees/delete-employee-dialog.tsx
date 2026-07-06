"use client";

import { deleteEmployee } from "@/lib/actions/employees";
import { Trash2 } from "lucide-react";

export default function DeleteEmployeeDialog({
  employee,
  refresh,
}: {
  employee: any;
  refresh: () => void;
}) {
  async function handleDelete() {
    const ok = confirm(
      `Delete ${employee.full_name}?`
    );

    if (!ok) return;

    try {
      await deleteEmployee(employee.id);

      alert("Employee deleted!");

      refresh();

    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="text-red-400 hover:text-red-500"
    >
      <Trash2 size={18} />
    </button>
  );
}