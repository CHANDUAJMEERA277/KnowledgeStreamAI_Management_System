import { CalendarClock } from "lucide-react";

export default function EmployeeAttendancePage() {
  return (
    <div className="flex items-center justify-center h-[75vh]">

      <div className="max-w-xl w-full bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center">

        <div className="flex justify-center mb-6">
          <CalendarClock className="w-20 h-20 text-blue-500" />
        </div>

        <h1 className="text-4xl font-bold text-white">
          Attendance
        </h1>

        <p className="text-slate-400 mt-4 text-lg">
          Attendance tracking will be available soon.
        </p>

        <p className="text-slate-500 mt-2">
          Soon you'll be able to mark attendance, view your attendance history,
          and track your working hours.
        </p>

        <div className="mt-8 inline-flex items-center rounded-full border border-blue-500 bg-blue-500/10 px-5 py-2">
          <span className="text-blue-400 font-semibold">
            🚀 Coming Soon
          </span>
        </div>

      </div>

    </div>
  );
}