export default function AttendanceCard() {
  return (
    <div className="bg-slate-900 rounded-xl p-6">

      <h2 className="text-xl font-semibold text-white mb-6">
        Attendance
      </h2>

      <button className="w-full bg-green-600 py-3 rounded-lg text-white">
        Check In
      </button>

      <button className="w-full mt-4 bg-red-600 py-3 rounded-lg text-white">
        Check Out
      </button>

    </div>
  );
}