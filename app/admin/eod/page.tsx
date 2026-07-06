"use client";

import { useEffect, useState } from "react";
import { getAllReports } from "@/lib/actions/eod";

export default function AdminEodPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  async function loadReports() {
    try {
      const data = await getAllReports();
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

      <div>

        <h1 className="text-4xl font-bold text-white">
          EOD Reports
        </h1>

        <p className="text-slate-400 mt-2">
          View all employee submissions.
        </p>

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
                  className="border-t border-slate-800 hover:bg-slate-800/40"
                >

                  <td className="px-6 py-5 text-white">
                    {report.employees?.full_name}
                  </td>

                  <td className="px-6 py-5 text-slate-300">
                    {report.tasks?.title}
                  </td>

                  <td className="px-6 py-5">

                    <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full">

                      {report.progress}%

                    </span>

                  </td>

                  <td className="px-6 py-5 text-slate-300 max-w-sm">
                    {report.remarks}
                  </td>

                  <td className="px-6 py-5">

                    <a
                      href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/eod-files/${report.file_url}`}
                      target="_blank"
                      className="text-blue-400 hover:underline"
                    >
                      View File
                    </a>

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