"use client";

import { useEffect, useState } from "react";
import {
  getAllReports,
  getEmployees,
} from "@/lib/actions/eod";

export default function AdminEodPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [selectedEmployee, setSelectedEmployee] =
    useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEmployees();
  }, []);

  useEffect(() => {
    loadReports(selectedEmployee);
  }, [selectedEmployee]);

  async function loadEmployees() {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function loadReports(employeeId = "all") {
    try {
      setLoading(true);

      const data = await getAllReports(employeeId);

      setReports(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h2 className="text-white text-2xl">
          Loading EOD Reports...
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-white">
            EOD Reports
          </h1>

          <p className="text-slate-400 mt-2">
            View all employee submissions.
          </p>

        </div>

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

      </div>

      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-800">

            <tr>

              <th className="px-6 py-4 text-left text-slate-300">
                Employee
              </th>

              <th className="px-6 py-4 text-left text-slate-300">
                Task
              </th>

              <th className="px-6 py-4 text-left text-slate-300">
                Progress
              </th>

              <th className="px-6 py-4 text-left text-slate-300">
                Remarks
              </th>

              <th className="px-6 py-4 text-left text-slate-300">
                File
              </th>

              <th className="px-6 py-4 text-left text-slate-300">
                Submitted
              </th>

            </tr>

          </thead>

          <tbody>
            {reports.length === 0 ? (

  <tr>

    <td
      colSpan={6}
      className="text-center py-10 text-slate-400"
    >
      No EOD Reports Found
    </td>

  </tr>

) : (

  reports.map((report) => (

    <tr
      key={report.id}
      className="border-t border-slate-800 hover:bg-slate-800/40 transition"
    >

      <td className="px-6 py-5 text-white">
        {report.employees?.full_name}
      </td>

      <td className="px-6 py-5 text-slate-300">
        {report.tasks?.title}
      </td>

      <td className="px-6 py-5">

        <span className="rounded-full bg-blue-600/20 px-3 py-1 text-blue-400 font-medium">

          {report.progress}%

        </span>

      </td>

      <td className="px-6 py-5 text-slate-300 max-w-sm">

        {report.remarks}

      </td>

      <td className="px-6 py-5 space-x-3">

  <a
    href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/eod-files/${report.file_url}`}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-400 hover:underline"
  >
    View
  </a>

  <button
    className="text-green-400 hover:underline"
    onClick={async () => {

      if (!window.electron) {
        alert("Please open this inside the Desktop App.");
        return;
      }

      const result = await window.electron.saveEod({
        employeeName: report.employees.full_name,
        fileName: report.file_url,
        fileUrl: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/eod-files/${report.file_url}`,
        submittedAt: report.submitted_at,
      });

      console.log(result);
    }}
  >
    Save to PC
  </button>

</td>

      <td className="px-6 py-5 text-slate-400">

        {new Date(
          report.submitted_at
        ).toLocaleDateString()}

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