"use client";

import { useEffect, useState } from "react";
import SubmitEodDialog from "@/components/eod/submit-eod-dialog";
import { getMyReports } from "@/lib/actions/eod";

export default function EmployeeEodPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadReports() {
    try {
      const data = await getMyReports();
      setReports(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReports();
  }, []);

  return (
    <div className="space-y-8">

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-4xl font-bold text-white">
            EOD Reports
          </h1>

          <p className="text-slate-400 mt-2">
            Submit and track your daily work reports.
          </p>

        </div>

        <SubmitEodDialog refresh={loadReports} />

      </div>

      <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">

        <h2 className="text-xl font-semibold text-white mb-5">
          Previous Reports
        </h2>

        {loading ? (

          <p className="text-slate-400">
            Loading...
          </p>

        ) : reports.length === 0 ? (

          <p className="text-slate-500">
            No reports submitted yet.
          </p>

        ) : (

          <div className="space-y-4">

            {reports.map((report) => (

              <div
                key={report.id}
                className="rounded-lg border border-slate-800 p-5"
              >

                <div className="flex justify-between">

                  <div>

                    <h3 className="text-white font-semibold">
                      {report.tasks?.title}
                    </h3>

                    <p className="text-slate-400 mt-2">
                      {report.remarks}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-green-400 font-semibold">
                      {report.progress}%
                    </p>

                    <p className="text-slate-500 text-sm mt-2">
                      {new Date(report.submitted_at).toLocaleDateString()}
                    </p>

                    <a
                      href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/eod-files/${report.file_url}`}
                      target="_blank"
                      className="text-blue-400 text-sm mt-2 block hover:underline"
                    >
                      View Attachment
                    </a>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}